import bcrypt from "bcrypt";

import { createToken, authorize } from "../utils/auth";
import { ENV, TOKEN_NAME } from "../utils/constants";

import { getUserByEmail, createUser } from "./user";

export default function register(app) {
  app.post("/signup", async (req, res, next) => {
    try {
      const authData = req.body;
      createUser(authData);

      const user = await getUserByEmail(authData.email);
      //TODO: Não deixar cadastrar se email já tiver sido usado

      return res.sendStatus(200);
    } catch (err) {
      if (err.response) {
        return res.status(err.response.status).send(err.response.data);
      }

      return res.status(500).send(err); //Email Already In Use
    }
  });

  app.post("/login", async (req, res) => {
    try {
      const authData = req.body;
      const user = await getUserByEmail(authData.email);

      bcrypt.compare(authData.password, user.password).then((result) => {
        if (result) {
          let userInfo = {
            id: user.id,
            name: user.name,
            email: user.email,
            reputationPoints: user.reputation_points,
          };

          return res
            .cookie(TOKEN_NAME, createToken(userInfo), {
              httpOnly: true,
              sameSite: true,
              secure: ENV !== "DEV",
              // signed: true,
            })
            .status(200)
            .send(userInfo);
        } else {
          return res.status(401).send("Incorrect Password");
        }
      });
    } catch (err) {
      throw err;
    }
  });

  app.get("/login/token", authorize, async (req, res) => {
    res.status(200).send(req.user);
  });
}
