/*import jwt from "jsonwebtoken";
import { getUserByEmail } from "../api/user";

import { TOKEN_KEY, TOKEN_NAME } from "./constants";*/

var jwt = require("jsonwebtoken");
var user = require("../api/user");
var constants = require("./constants");

var getUserByEmail = user.getUserByEmail;

var TOKEN_KEY = constants.TOKEN_KEY;
var TOKEN_NAME = constants.TOKEN_NAME;

function createToken(data) {
  return jwt.sign(data, TOKEN_KEY, { expiresIn: "1d" });
}

function verifyToken(token) {
  try {
    return { success: true, data: jwt.verify(token, TOKEN_KEY) };
  } catch (err) {
    return { success: false };
  }
}

async function validate(req, res, next) {
  const token = req.cookies[TOKEN_NAME];
  const { success, data } = verifyToken(token);

  if (success) {
    req.user = await getUserByEmail(data.email);
  } else {
    res.clearCookie(TOKEN_NAME);
  }
  next();
}

function authorize(req, res, next) {
  if (!req.user) return res.sendStatus(401);
  next();
}

module.exports = { createToken, verifyToken, validate, authorize };
