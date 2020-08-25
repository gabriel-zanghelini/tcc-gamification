import path from "path";

import cookieParser from "cookie-parser";
import Express from "express";

import api from "./api";
import { validate } from "./utils/auth";
import { PORT, HOST, IP, STATIC_PATH } from "./utils/constants";

const app = Express();

app.use(Express.json());
app.use(cookieParser());

app.use("/api", validate, api);

app.use(Express.static(STATIC_PATH));
app.get("*", (req, res) => res.sendFile(path.join(STATIC_PATH, "index.html")));

console.log(`Starting the development server...
`);
app.listen(PORT, HOST, () =>
  console.log(`Compiled successfully!

  You can now access your backend through http.

    Local:            http://localhost:${PORT}/
    On Your Network:  http://${IP}:${PORT}/

  `)
);
