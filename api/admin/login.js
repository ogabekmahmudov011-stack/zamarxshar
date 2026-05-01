const { handleAdminLogin } = require("../../server");

module.exports = async (request, response) => {
  await handleAdminLogin(request, response);
};
