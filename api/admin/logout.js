const { handleAdminLogout } = require("../../server");

module.exports = (request, response) => {
  handleAdminLogout(request, response);
};
