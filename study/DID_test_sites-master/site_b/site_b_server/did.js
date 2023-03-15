const { DID } = require('kong-did');
require('dotenv').config();

const config = {
  clientId: process.env.DID_CLIENT_ID,
  redirectURI: process.env.DID_REDIRECT_URI,
};

const did = new DID(config);

module.exports = did;
