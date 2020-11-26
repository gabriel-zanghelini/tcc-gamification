/*import { Router } from "express";

import registerProject from "./project";
import registerLogin from "./login";
import registerUser from "./user";
import registerTask from "./task";
import registerPontuation from "./pontuation";*/

var express = require("express");

var registerProject = require("./project");
var registerLogin = require("./login");
var registerUser = require("./user");
var registerTask = require("./task");
var registerPontuation = require("./pontuation");

const router = express.Router();

registerPontuation.register(router);
registerProject.register(router);
registerLogin.register(router);
registerUser.register(router);
registerTask.register(router);

/*export default router;*/
module.exports = router;
