const { connect, connection } = require("mongoose");

// Connect to ThoughtBridge database.
connect("mongodb://127.0.0.1:27017/thoughtBridgeDB");

module.exports = connection;
