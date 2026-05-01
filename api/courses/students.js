const { handleCourseStudents } = require("../../server");

module.exports = async (request, response) => {
  await handleCourseStudents(request, response);
};
