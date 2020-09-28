import { Router } from "express";

import registerProject from "./project";
import registerLogin from "./login";
import registerUser from "./user";

const router = Router();

registerProject(router);
registerLogin(router);
registerUser(router);

export default router;
