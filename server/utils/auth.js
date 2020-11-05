import jwt from "jsonwebtoken";
import { getUserByEmail } from "../api/user";

import { TOKEN_KEY, TOKEN_NAME } from "./constants";

export function createToken(data) {
  return jwt.sign(data, TOKEN_KEY, { expiresIn: "1d" });
}

export function verifyToken(token) {
  try {
    return { success: true, data: jwt.verify(token, TOKEN_KEY) };
  } catch (err) {
    return { success: false };
  }
}

export async function validate(req, res, next) {
  const token = req.cookies[TOKEN_NAME];
  const { success, data } = verifyToken(token);
  console.log("validate jwt", success);
  if (success) {
    req.user = await getUserByEmail(data.email);
  } else {
    res.clearCookie(TOKEN_NAME);
  }
  next();
}

export function authorize(req, res, next) {
  if (!req.user) return res.sendStatus(401);
  next();
}
