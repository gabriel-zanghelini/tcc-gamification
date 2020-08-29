import { Router } from "express";

import registerLogin from "./login";
import registerObjects from "./objects";

const router = Router();

registerLogin(router);
registerObjects(router);

export default router;
