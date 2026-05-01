const http = require("http");
const crypto = require("crypto");
const fs = require("fs");
const fsp = require("fs/promises");
const path = require("path");
const {
  createEmptyStore,
  normalizeStore,
  readStore,
  writeStore
} = require("./admin-store");

const rootDir = __dirname;
const envFilePath = path.join(rootDir, ".env");

const loadEnvFile = () => {
  if (!fs.existsSync(envFilePath)) {
    return;
  }

  const rawEnv = fs.readFileSync(envFilePath, "utf8");
  rawEnv.split(/\r?\n/).forEach((line) => {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) {
      return;
    }

    const separatorIndex = trimmed.indexOf("=");
    if (separatorIndex === -1) {
      return;
    }

    const key = trimmed.slice(0, separatorIndex).trim();
    let value = trimmed.slice(separatorIndex + 1).trim();
    if (!key || Object.prototype.hasOwnProperty.call(process.env, key)) {
      return;
    }

    if (
      (value.startsWith("\"") && value.endsWith("\""))
      || (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }

    process.env[key] = value;
  });
};

loadEnvFile();

const port = Number.parseInt(process.env.PORT || "3000", 10);
const host = process.env.HOST || "127.0.0.1";
const adminUsername = (process.env.ADMIN_USERNAME || "admin").trim() || "admin";
const adminPassword = (process.env.ADMIN_PASSWORD || "").trim();
const adminPhone = (process.env.ADMIN_PHONE || "").trim();
const adminSessionCookieName = "it_center_admin_session";
const adminSessionTtlHours = Math.max(1, Number.parseInt(process.env.ADMIN_SESSION_TTL_HOURS || "12", 10) || 12);
const adminSessionTtlMs = adminSessionTtlHours * 60 * 60 * 1000;
const adminSessionSecret = (process.env.ADMIN_SESSION_SECRET || adminPassword || adminUsername || "local-admin-secret").trim();
const maxJsonBodyBytes = 1024 * 1024;
const mimeTypes = {
  ".css": "text/css; charset=utf-8",
  ".gif": "image/gif",
  ".html": "text/html; charset=utf-8",
  ".ico": "image/x-icon",
  ".jpeg": "image/jpeg",
  ".jpg": "image/jpeg",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".txt": "text/plain; charset=utf-8",
  ".webp": "image/webp"
};
const removableSeedStudentNames = new Set([
  "ogabek mahmudov",
  "zxasxas xasxasx",
  "laziz norbutayev",
  "azizbek karimov",
  "madina ergasheva",
  "jahongir toraev",
  "sevinch qodirova",
  "maftuna jorayeva",
  "behruz qodirov",
  "umida rasulova",
  "diyorbek xasanov",
  "nilufar sattorova",
  "shaxzod mamatov"
]);
const removableSeedStudentPhones = new Set([
  "972233755",
  "123432322",
  "556458446",
  "901234567",
  "931112233",
  "997654321",
  "901987654",
  "945551122",
  "998221144",
  "909761245",
  "934005577",
  "974449988",
  "998880011"
]);

const sendText = (response, statusCode, message) => {
  response.writeHead(statusCode, {
    "Content-Type": "text/plain; charset=utf-8",
    "Cache-Control": "no-store"
  });
  response.end(message);
};

const sendJson = (response, statusCode, payload) => {
  response.writeHead(statusCode, {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store"
  });
  response.end(JSON.stringify(payload));
};

const timingSafeCompare = (left, right) => {
  const leftBuffer = Buffer.from(String(left), "utf8");
  const rightBuffer = Buffer.from(String(right), "utf8");
  if (leftBuffer.length !== rightBuffer.length) {
    return false;
  }

  return crypto.timingSafeEqual(leftBuffer, rightBuffer);
};

const normalizePhoneNumber = (value) => {
  const digitsOnly = typeof value === "string" ? value.replace(/\D/g, "") : "";
  if (digitsOnly.length === 9) {
    return `998${digitsOnly}`;
  }

  if (digitsOnly.length === 12 && digitsOnly.startsWith("998")) {
    return digitsOnly;
  }

  return "";
};

const normalizeSubjectTitle = (value) => String(value || "")
  .trim()
  .toLowerCase()
  .normalize("NFKD")
  .replace(/['"`‘’]+/g, "")
  .replace(/[^\p{L}\p{N}]+/gu, " ")
  .replace(/\s+/g, " ")
  .trim();

const normalizeStudentPhone = (value) => String(value || "").replace(/\D/g, "").slice(-9);

const shouldRemoveSeedStudent = (item) => {
  const normalizedName = normalizeSubjectTitle(item?.name || item?.student || "");
  const normalizedPhone = normalizeStudentPhone(item?.phone);

  return removableSeedStudentNames.has(normalizedName)
    || (normalizedPhone && removableSeedStudentPhones.has(normalizedPhone));
};

const isAdminProtectionEnabled = () => Boolean(adminPassword);

const requireAdminSession = (request) => {
  if (!isAdminProtectionEnabled()) {
    return {
      username: adminUsername
    };
  }

  const session = getAdminSessionFromRequest(request);
  if (!session) {
    const error = new Error("Unauthorized");
    error.statusCode = 401;
    throw error;
  }

  return session;
};

const parseCookies = (cookieHeader) => {
  const cookies = {};
  if (typeof cookieHeader !== "string" || !cookieHeader.trim()) {
    return cookies;
  }

  cookieHeader.split(";").forEach((part) => {
    const separatorIndex = part.indexOf("=");
    if (separatorIndex === -1) {
      return;
    }

    const key = part.slice(0, separatorIndex).trim();
    const rawValue = part.slice(separatorIndex + 1).trim();
    if (!key) {
      return;
    }

    try {
      cookies[key] = decodeURIComponent(rawValue);
    } catch {
      cookies[key] = rawValue;
    }
  });

  return cookies;
};

const serializeCookie = (name, value, maxAgeSeconds) => {
  const parts = [
    `${name}=${encodeURIComponent(value)}`,
    "Path=/",
    "HttpOnly",
    "SameSite=Lax"
  ];

  if (Number.isFinite(maxAgeSeconds)) {
    parts.push(`Max-Age=${Math.max(0, Math.floor(maxAgeSeconds))}`);
  }

  return parts.join("; ");
};

const encodeBase64Url = (value) => Buffer.from(String(value), "utf8").toString("base64url");

const decodeBase64Url = (value) => Buffer.from(String(value), "base64url").toString("utf8");

const createSessionSignature = (payload) => crypto
  .createHmac("sha256", adminSessionSecret)
  .update(payload)
  .digest("base64url");

const createAdminSession = (username) => {
  const payload = JSON.stringify({
    username,
    expiresAt: Date.now() + adminSessionTtlMs
  });
  const encodedPayload = encodeBase64Url(payload);
  const signature = createSessionSignature(encodedPayload);
  return `${encodedPayload}.${signature}`;
};

const getAdminSessionFromRequest = (request) => {
  if (!isAdminProtectionEnabled()) {
    return {
      username: adminUsername,
      token: "",
      expiresAt: Date.now() + adminSessionTtlMs
    };
  }

  const cookies = parseCookies(request.headers.cookie);
  const token = cookies[adminSessionCookieName];
  if (!token) {
    return null;
  }

  const [encodedPayload = "", signature = ""] = String(token).split(".");
  if (!encodedPayload || !signature) {
    return null;
  }

  const expectedSignature = createSessionSignature(encodedPayload);
  if (!timingSafeCompare(signature, expectedSignature)) {
    return null;
  }

  try {
    const session = JSON.parse(decodeBase64Url(encodedPayload));
    if (!session?.username || !Number.isFinite(session?.expiresAt) || session.expiresAt <= Date.now()) {
      return null;
    }

    return {
      username: session.username,
      expiresAt: session.expiresAt,
      token
    };
  } catch {
    return null;
  }
};

const clearAdminSession = () => {
  return;
};

const getStorageDateParts = (sourceDate = new Date()) => {
  const safeDate = sourceDate instanceof Date && !Number.isNaN(sourceDate.getTime())
    ? sourceDate
    : new Date();

  return {
    date: `${safeDate.getFullYear()}-${String(safeDate.getMonth() + 1).padStart(2, "0")}-${String(safeDate.getDate()).padStart(2, "0")}`,
    time: `${String(safeDate.getHours()).padStart(2, "0")}:${String(safeDate.getMinutes()).padStart(2, "0")}`
  };
};

const parseAmountValue = (value) => {
  if (Number.isFinite(value)) {
    return value;
  }

  const digits = String(value || "").replace(/\D/g, "");
  return digits ? Number.parseInt(digits, 10) : 0;
};

const createStudentDeleteKey = (item) => {
  const applicationId = String(item?.applicationId || "").trim();
  if (applicationId) {
    return `application:${applicationId}`;
  }

  const studentId = String(item?.id || "").trim();
  if (studentId) {
    return `id:${studentId}`;
  }

  const normalizedName = normalizeSubjectTitle(item?.name || item?.student || "");
  const normalizedPhone = normalizeStudentPhone(item?.phone);
  const subjectIndex = Number.isInteger(item?.subjectIndex) ? item.subjectIndex : Number(item?.subjectIndex);
  const amount = Number(item?.amount) || 0;
  const status = String(item?.status || "").trim().toLowerCase();

  return `fallback:${normalizedName}|${normalizedPhone}|${subjectIndex}|${amount}|${status}`;
};

const buildStudentEntryFromApplication = (application) => {
  const acceptedAt = application?.acceptedAt ? new Date(application.acceptedAt) : new Date();
  const dateParts = getStorageDateParts(acceptedAt);

  return {
    id: `student-${String(application?.id || "").trim() || Date.now()}`,
    applicationId: String(application?.id || "").trim(),
    name: String(application?.name || "").trim(),
    phone: normalizeStudentPhone(application?.phone),
    subjectIndex: Number.isInteger(application?.subjectIndex) ? application.subjectIndex : null,
    subjectSlug: String(application?.courseSlug || application?.subjectSlug || "").trim(),
    subjectLabel: String(application?.courseTitle || application?.subjectLabel || "").trim(),
    courseTitle: String(application?.courseTitle || "").trim(),
    courseSlug: String(application?.courseSlug || "").trim(),
    amount: parseAmountValue(application?.amount),
    planTitle: String(application?.planTitle || "").trim(),
    status: "pending",
    date: dateParts.date,
    time: dateParts.time,
    acceptedAt: acceptedAt.toISOString()
  };
};

const reconcileStore = (value) => {
  const store = normalizeStore(value);

  store.applications = store.applications.filter((item) => !shouldRemoveSeedStudent(item));
  store.students = store.students.filter((item) => !shouldRemoveSeedStudent(item));

  store.applications.forEach((application) => {
    if (application?.status !== "accepted" || !application?.id) {
      return;
    }

    const alreadyExists = store.students.some((student) => String(student?.applicationId || "").trim() === String(application.id).trim());
    if (!alreadyExists) {
      store.students.unshift(buildStudentEntryFromApplication(application));
    }
  });

  return store;
};

const readAdminStore = async () => reconcileStore(await readStore());

const writeAdminStore = async (value) => writeStore(reconcileStore(value));

const createApplicationEntry = (payload) => ({
  id: `app-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
  source: String(payload?.source || "bank-course").trim() || "bank-course",
  name: String(payload?.name || "").trim(),
  phone: normalizeStudentPhone(payload?.phone),
  courseTitle: String(payload?.courseTitle || "").trim(),
  courseSlug: String(payload?.courseSlug || "").trim(),
  planTitle: String(payload?.planTitle || "").trim(),
  studyMode: String(payload?.studyMode || "offline").trim() || "offline",
  studyModeLabel: String(payload?.studyModeLabel || "").trim(),
  startDate: String(payload?.startDate || "").trim(),
  amount: parseAmountValue(payload?.amount),
  submittedAt: new Date().toISOString(),
  status: "new"
});

const matchCourseValue = (item, courseSlug, courseTitle) => {
  const normalizedSlug = String(courseSlug || "").trim().toLowerCase();
  const normalizedTitle = normalizeSubjectTitle(courseTitle);

  if (normalizedSlug) {
    const itemSlug = String(item?.courseSlug || item?.subjectSlug || "").trim().toLowerCase();
    if (itemSlug && itemSlug === normalizedSlug) {
      return true;
    }
  }

  if (!normalizedTitle) {
    return false;
  }

  const candidates = [
    item?.courseTitle,
    item?.subjectLabel,
    item?.subjectLabels?.uz,
    item?.subjectLabels?.en,
    item?.subjectLabels?.ru
  ];

  return candidates.some((value) => normalizeSubjectTitle(value) === normalizedTitle);
};

const readJsonBody = (request) => new Promise((resolve, reject) => {
  if (request && Object.prototype.hasOwnProperty.call(request, "body") && request.body && typeof request.body === "object") {
    resolve(request.body);
    return;
  }

  let rawBody = "";

  request.setEncoding("utf8");
  request.on("data", (chunk) => {
    rawBody += chunk;

    if (Buffer.byteLength(rawBody, "utf8") > maxJsonBodyBytes) {
      const error = new Error("Payload too large");
      error.statusCode = 413;
      request.destroy(error);
    }
  });

  request.on("end", () => {
    if (!rawBody.trim()) {
      resolve({});
      return;
    }

    try {
      resolve(JSON.parse(rawBody));
    } catch {
      const error = new Error("JSON body noto'g'ri formatda yuborildi.");
      error.statusCode = 400;
      reject(error);
    }
  });

  request.on("error", (error) => {
    if (error?.statusCode) {
      reject(error);
      return;
    }

    const normalizedError = new Error("So'rov body sini o'qib bo'lmadi.");
    normalizedError.statusCode = 400;
    reject(normalizedError);
  });
});

const handleAdminSessionStatus = (request, response) => {
  const session = getAdminSessionFromRequest(request);
  sendJson(response, 200, {
    enabled: isAdminProtectionEnabled(),
    authenticated: Boolean(session),
    username: session?.username || "",
    usernameHint: adminUsername
  });
};

const handleAdminLogin = async (request, response) => {
  try {
    if (!isAdminProtectionEnabled()) {
      sendJson(response, 200, {
        enabled: false,
        authenticated: true,
        username: adminUsername,
        usernameHint: adminUsername
      });
      return;
    }

    const body = await readJsonBody(request);
    const username = typeof body?.username === "string" ? body.username.trim() : "";
    const phone = normalizePhoneNumber(body?.phone);
    const password = typeof body?.password === "string" ? body.password : "";

    if (!username || !phone || !password) {
      sendJson(response, 400, {
        error: "Login, telefon raqam va parolni kiriting."
      });
      return;
    }

    const normalizedAdminPhone = normalizePhoneNumber(adminPhone);

    const isValidAdminLogin = (
      timingSafeCompare(username, adminUsername)
      && timingSafeCompare(password, adminPassword)
      && (!normalizedAdminPhone || timingSafeCompare(phone, normalizedAdminPhone))
    );

    if (!isValidAdminLogin) {
      sendJson(response, 401, {
        error: "Login, telefon raqam yoki parol noto'g'ri."
      });
      return;
    }

    const sessionToken = createAdminSession(adminUsername);
    response.setHeader("Set-Cookie", serializeCookie(adminSessionCookieName, sessionToken, adminSessionTtlMs / 1000));

    sendJson(response, 200, {
      enabled: true,
      authenticated: true,
      username: adminUsername,
      usernameHint: adminUsername
    });
  } catch (error) {
    sendJson(response, error?.statusCode || 500, {
      error: error?.message || "Tizimga kirishda xato yuz berdi."
    });
  }
};

const handleAdminLogout = (request, response) => {
  const session = getAdminSessionFromRequest(request);
  clearAdminSession(session?.token);
  response.setHeader("Set-Cookie", serializeCookie(adminSessionCookieName, "", 0));
  sendJson(response, 200, {
    authenticated: false
  });
};

const handleAdminData = async (request, response) => {
  try {
    requireAdminSession(request);

    if (request.method === "GET") {
      const store = await readAdminStore();
      sendJson(response, 200, store);
      return;
    }

    if (request.method === "PUT") {
      const body = await readJsonBody(request);
      const nextStore = await writeAdminStore(body);
      sendJson(response, 200, nextStore);
      return;
    }

    sendText(response, 405, "Method not allowed");
  } catch (error) {
    sendJson(response, error?.statusCode || 500, {
      error: error?.message || "Ma'lumotlarni yuklashda xato yuz berdi."
    });
  }
};

const handleApplicationSubmit = async (request, response) => {
  try {
    const body = await readJsonBody(request);
    const entry = createApplicationEntry(body);

    if (!entry.name || !entry.phone || !entry.courseTitle || !entry.planTitle || !entry.amount) {
      sendJson(response, 400, {
        error: "Ariza uchun kerakli ma'lumotlar to'liq yuborilmadi."
      });
      return;
    }

    const store = await readAdminStore();
    store.applications.unshift(entry);
    await writeAdminStore(store);

    sendJson(response, 201, {
      application: entry
    });
  } catch (error) {
    sendJson(response, error?.statusCode || 500, {
      error: error?.message || "Arizani saqlashda xato yuz berdi."
    });
  }
};

const handleCourseStudents = async (request, response) => {
  try {
    const parsedUrl = new URL(request.url, `http://${request.headers.host || `${host}:${port}`}`);
    const courseSlug = parsedUrl.searchParams.get("courseSlug") || "";
    const courseTitle = parsedUrl.searchParams.get("courseTitle") || parsedUrl.searchParams.get("course") || "";
    const store = await readAdminStore();

    const students = store.students
      .filter((item) => matchCourseValue(item, courseSlug, courseTitle))
      .map((item) => ({
        id: String(item?.id || item?.applicationId || ""),
        student: String(item?.name || "").trim(),
        amount: `${parseAmountValue(item?.amount).toLocaleString("ru-RU")} so'm`,
        status: item?.status === "paid" ? "paid" : "unpaid",
        date: String(item?.date || "").trim(),
        time: String(item?.time || "").trim(),
        group: String(item?.planTitle || "Qabul qilingan o'quvchi").trim()
      }))
      .filter((item) => item.id && item.student);

    sendJson(response, 200, {
      students
    });
  } catch (error) {
    sendJson(response, error?.statusCode || 500, {
      error: error?.message || "O'quvchilar ro'yxatini yuklashda xato yuz berdi."
    });
  }
};

const handleCourseTeacher = async (request, response) => {
  try {
    const parsedUrl = new URL(request.url, `http://${request.headers.host || `${host}:${port}`}`);
    const courseSlug = parsedUrl.searchParams.get("courseSlug") || "";
    const courseTitle = parsedUrl.searchParams.get("courseTitle") || parsedUrl.searchParams.get("course") || "";
    const store = await readAdminStore();

    const teacher = store.teachers
      .filter((item) => matchCourseValue(item, courseSlug, courseTitle))
      .sort((left, right) => new Date(right.createdAt || 0).getTime() - new Date(left.createdAt || 0).getTime())[0];

    sendJson(response, 200, {
      teacher: teacher || null
    });
  } catch (error) {
    sendJson(response, error?.statusCode || 500, {
      error: error?.message || "Ustoz ma'lumotini yuklashda xato yuz berdi."
    });
  }
};

const resolveFilePath = (pathname) => {
  const normalizedPathname = pathname === "/" ? "/index.html" : pathname;
  const decodedPath = decodeURIComponent(normalizedPathname);
  const absolutePath = path.resolve(rootDir, `.${decodedPath}`);
  if (!absolutePath.startsWith(rootDir)) {
    return null;
  }

  return absolutePath;
};

const serveStaticFile = async (request, response, pathname) => {
  const absolutePath = resolveFilePath(pathname);
  if (!absolutePath) {
    sendText(response, 403, "Forbidden");
    return;
  }

  try {
    const stats = await fsp.stat(absolutePath);
    const filePath = stats.isDirectory() ? path.join(absolutePath, "index.html") : absolutePath;
    const finalStats = stats.isDirectory() ? await fsp.stat(filePath) : stats;
    if (!finalStats.isFile()) {
      throw new Error("Not a file");
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = mimeTypes[ext] || "application/octet-stream";
    const fileBuffer = await fsp.readFile(filePath);

    response.writeHead(200, {
      "Content-Type": contentType,
      "Cache-Control": ext === ".html" ? "no-store" : "public, max-age=300"
    });

    if (request.method === "HEAD") {
      response.end();
      return;
    }

    response.end(fileBuffer);
  } catch {
    sendText(response, 404, "Not found");
  }
};

const handleRequest = async (request, response) => {
  if (!request.url) {
    sendText(response, 400, "Bad request");
    return;
  }

  const parsedUrl = new URL(request.url, `http://${request.headers.host || `${host}:${port}`}`);
  const pathname = parsedUrl.pathname;

  response.setHeader("X-Content-Type-Options", "nosniff");

  if (request.method === "GET" && pathname === "/api/admin/session") {
    handleAdminSessionStatus(request, response);
    return;
  }

  if (request.method === "POST" && pathname === "/api/admin/login") {
    await handleAdminLogin(request, response);
    return;
  }

  if (request.method === "POST" && pathname === "/api/admin/logout") {
    handleAdminLogout(request, response);
    return;
  }

  if ((request.method === "GET" || request.method === "PUT") && pathname === "/api/admin/data") {
    await handleAdminData(request, response);
    return;
  }

  if (request.method === "POST" && pathname === "/api/applications") {
    await handleApplicationSubmit(request, response);
    return;
  }

  if (request.method === "GET" && pathname === "/api/courses/students") {
    await handleCourseStudents(request, response);
    return;
  }

  if (request.method === "GET" && pathname === "/api/courses/teacher") {
    await handleCourseTeacher(request, response);
    return;
  }

  if (request.method !== "GET" && request.method !== "HEAD") {
    sendText(response, 405, "Method not allowed");
    return;
  }

  await serveStaticFile(request, response, pathname);
};

if (require.main === module) {
  const server = http.createServer(handleRequest);
  server.listen(port, host, () => {
    console.log(`IT CENTER server running at http://${host}:${port}`);
  });
}

module.exports = handleRequest;
module.exports.handleRequest = handleRequest;
module.exports.handleAdminSessionStatus = handleAdminSessionStatus;
module.exports.handleAdminLogin = handleAdminLogin;
module.exports.handleAdminLogout = handleAdminLogout;
module.exports.handleAdminData = handleAdminData;
module.exports.handleApplicationSubmit = handleApplicationSubmit;
module.exports.handleCourseStudents = handleCourseStudents;
module.exports.handleCourseTeacher = handleCourseTeacher;
