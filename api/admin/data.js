const { handleAdminData } = require("../../server");

module.exports = async (request, response) => {
  await handleAdminData(request, response);
};
