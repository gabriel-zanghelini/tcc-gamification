import jwt from "jsonwebtoken";

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

export function validate(req, res, next) {
  const token = req.cookies[TOKEN_NAME];
  const { success, data } = verifyToken(token);
  console.log('validate jwt', success);
  if (success) req.user = data;
  else res.clearCookie(TOKEN_NAME);
  next();
}

export function authorize(req, res, next) {
  if (!req.user) return res.sendStatus(401);
  next();
}

export function permit(permissions) {
  if (typeof permissions === "string") permissions = [permissions];

  const guard = (req, res, next) => {
    if (!req.user.permissions.some((perm) => permissions.includes(perm)))
      return res.sendStatus(401);
    next();
  };

  return [authorize, guard];
}
