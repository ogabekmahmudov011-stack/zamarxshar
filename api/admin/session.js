const { handleAdminSessionStatus } = require("../../server");

module.exports = (request, response) => {
  handleAdminSessionStatus(request, response);
};
