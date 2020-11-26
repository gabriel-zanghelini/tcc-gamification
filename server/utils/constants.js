// import os from "os";
/*import path from "path";

import cryptoRandomString from "crypto-random-string";*/
var path = require("path");
var cryptoRandomString = require("crypto-random-string");

const ENV = process.env.NODE_ENV || "development";

const PORT = process.env.PORT || 5000;

const TOKEN_KEY = cryptoRandomString({ length: 124, type: "base64" });
const TOKEN_NAME = "access-token";

const STATIC_PATH = path.join(
  __dirname,
  "../..",
  ENV === "development" ? "build" : "build"
);

module.exports = { ENV, PORT, TOKEN_KEY, TOKEN_NAME, STATIC_PATH };
