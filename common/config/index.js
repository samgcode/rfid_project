process.env["NODE_CONFIG_DIR"] = '../common/config/';

const config = require('config');

module.exports = config.get('config');