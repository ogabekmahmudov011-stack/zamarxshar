const { handleCourseTeacher } = require("../../server");

module.exports = async (request, response) => {
  await handleCourseTeacher(request, response);
};
