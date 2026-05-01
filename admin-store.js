const fs = require("fs");
const fsp = require("fs/promises");
const path = require("path");

const dataDir = path.join(__dirname, "data");
const localStorePath = path.join(dataDir, "admin-store.json");
const blobStorePath = "data/admin-store.json";

const createEmptyStore = () => ({
  applications: [],
  students: [],
  teachers: []
});

const cloneStore = (value) => JSON.parse(JSON.stringify(value));

const sanitizeArray = (value) => (
  Array.isArray(value)
    ? value.filter((item) => item && typeof item === "object")
    : []
);

const normalizeStore = (value) => {
  const nextValue = value && typeof value === "object" ? value : {};

  return {
    applications: sanitizeArray(nextValue.applications),
    students: sanitizeArray(nextValue.students),
    teachers: sanitizeArray(nextValue.teachers)
  };
};

const isVercelRuntime = () => Boolean(process.env.VERCEL);
const isBlobConfigured = () => Boolean((process.env.BLOB_READ_WRITE_TOKEN || "").trim());

let blobSdkPromise = null;

const getBlobSdk = async () => {
  if (!isBlobConfigured()) {
    return null;
  }

  if (!blobSdkPromise) {
    blobSdkPromise = import("@vercel/blob");
  }

  return blobSdkPromise;
};

const ensureLocalStoreFile = async () => {
  await fsp.mkdir(dataDir, { recursive: true });

  if (!fs.existsSync(localStorePath)) {
    await fsp.writeFile(localStorePath, JSON.stringify(createEmptyStore(), null, 2), "utf8");
  }
};

const readLocalStore = async () => {
  await ensureLocalStoreFile();
  const rawValue = await fsp.readFile(localStorePath, "utf8");

  try {
    return normalizeStore(JSON.parse(rawValue));
  } catch {
    return createEmptyStore();
  }
};

const writeLocalStore = async (value) => {
  await ensureLocalStoreFile();
  const normalized = normalizeStore(value);
  await fsp.writeFile(localStorePath, JSON.stringify(normalized, null, 2), "utf8");
  return normalized;
};

const readBlobStore = async () => {
  const blobSdk = await getBlobSdk();
  if (!blobSdk) {
    return createEmptyStore();
  }

  const result = await blobSdk.get(blobStorePath, {
    access: "private"
  });

  if (!result || result.statusCode !== 200 || !result.stream) {
    return createEmptyStore();
  }

  const rawValue = await new Response(result.stream).text();

  try {
    return normalizeStore(JSON.parse(rawValue));
  } catch {
    return createEmptyStore();
  }
};

const writeBlobStore = async (value) => {
  const blobSdk = await getBlobSdk();
  if (!blobSdk) {
    throw new Error("Blob storage is not configured.");
  }

  const normalized = normalizeStore(value);
  await blobSdk.put(
    blobStorePath,
    JSON.stringify(normalized, null, 2),
    {
      access: "private",
      allowOverwrite: true,
      contentType: "application/json",
      cacheControlMaxAge: 60
    }
  );

  return normalized;
};

const readStore = async () => {
  if (isBlobConfigured()) {
    return readBlobStore();
  }

  return readLocalStore();
};

const writeStore = async (value) => {
  if (isBlobConfigured()) {
    return writeBlobStore(value);
  }

  if (isVercelRuntime()) {
    throw new Error("Persistent storage is not configured for this deployment.");
  }

  return writeLocalStore(value);
};

module.exports = {
  blobStorePath,
  cloneStore,
  createEmptyStore,
  normalizeStore,
  readStore,
  writeStore
};
