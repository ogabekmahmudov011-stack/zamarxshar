const { handleApplicationSubmit } = require("../server");

module.exports = async (request, response) => {
  await handleApplicationSubmit(request, response);
};
