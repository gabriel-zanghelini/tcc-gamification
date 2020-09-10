import { Router } from "express";

import registerLogin from "./login";
import registerObjects from "./objects";
import registerUser from "./user";

const router = Router();

registerLogin(router);
registerObjects(router);
registerUser(router);

export default router;
