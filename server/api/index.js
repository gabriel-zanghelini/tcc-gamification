import { Router } from "express";

import registerLogin from "./login";
import registerUser from "./user";

const router = Router();

registerLogin(router);
registerUser(router);

export default router;
