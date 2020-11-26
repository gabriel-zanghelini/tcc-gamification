/*import path from "path";

import cookieParser from "cookie-parser";
import cors from "cors";
import Express from "express";

import api from "./api";
import { validate } from "./utils/auth";
import { PORT, STATIC_PATH } from "./utils/constants";*/

var path = require("path");

var cookieParser = require("cookie-parser");
var cors = require("cors");
var express = require("express");

var api = require("./api");
var auth = require("./utils/auth");
var constants = require("./utils/constants");
 
var validate = auth.validate;
var PORT = constants.PORT;
var STATIC_PATH = constants.STATIC_PATH;

const app = express();

console.log("SERVER INFO", PORT, STATIC_PATH);

app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.use("/api", validate, api);

app.use(express.static(STATIC_PATH));
app.get("*", (req, res) => res.sendFile(path.join(STATIC_PATH, "index.html")));

console.log("SERVER INFO", PORT, STATIC_PATH);
app.listen(PORT, () =>
  console.log(`Compiled successfully!
  
  You can now access your backend through http.

  PORT: ${process.env.PORT || PORT}

  `)
);
