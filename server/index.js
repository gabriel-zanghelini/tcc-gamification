import path from "path";

import cookieParser from "cookie-parser";
import cors from "cors";
import Express from "express";

import api from "./api";
import { validate } from "./utils/auth";
import { PORT, STATIC_PATH } from "./utils/constants";

const app = Express();

app.use(Express.json());
app.use(cookieParser());
app.use(cors());

app.use("/api", validate, api);

app.use(Express.static(STATIC_PATH));
app.get("*", (req, res) => res.sendFile(path.join(STATIC_PATH, "index.html")));

console.log("SERVER INFO", PORT, STATIC_PATH);
app.listen(PORT, () =>
  console.log(`Compiled successfully!
  
  You can now access your backend through http.

  HOST: ${process.env.HOST}
  PORT: ${process.env.PORT}

  `)
);
