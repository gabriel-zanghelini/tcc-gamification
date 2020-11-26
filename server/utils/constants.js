// import os from "os";
import path from "path";

import cryptoRandomString from "crypto-random-string";

export const ENV = process.env.NODE_ENV || "development";

export const PORT = process.env.PORT || 5000;
// export const HOST = "0.0.0.0";

// const interfaces = os.networkInterfaces();

// let CURRENT_IP = HOST;
// if (CURRENT_IP === "0.0.0.0" || CURRENT_IP === "127.0.0.1") {
//   for (const [iface] of Object.values(interfaces)) {
//     if (iface.family === "IPv4" && !iface.internal) {
//       CURRENT_IP = iface.address;
//       break;
//     }
//   }
// }

// export const IP = CURRENT_IP;

export const TOKEN_KEY = cryptoRandomString({ length: 124, type: "base64" });
export const TOKEN_NAME = "access-token";

export const STATIC_PATH = path.join(
  __dirname,
  "../..",
  ENV === "development" ? "build" : "build"
);
