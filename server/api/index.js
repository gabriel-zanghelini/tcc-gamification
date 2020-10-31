import { Router } from "express";

import registerProject from "./project";
import registerLogin from "./login";
import registerUser from "./user";
import registerTask from "./task";
import registerPontuation from "./pontuation";

const router = Router();

registerPontuation(router);
registerProject(router);
registerLogin(router);
registerUser(router);
registerTask(router);

export default router;
