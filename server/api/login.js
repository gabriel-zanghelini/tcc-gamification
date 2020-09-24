import bcrypt from "bcrypt";

import { createToken, authorize } from "../utils/auth";
import { ENV, TOKEN_NAME } from "../utils/constants";

import { getUserByEmail, createUser } from "./user";

export default function register(app) {
  app.post("/signup", async (req, res, next) => {
    try {
      const authData = req.body;
      const registeredUser = await getUserByEmail(authData.email);

      if (!registeredUser) {
        let { id } = await createUser(authData);

        let userInfo = {
          id: id,
          name: authData.name,
          email: authData.email,
          reputationPoints: 0,
        };

        return res
          .cookie(TOKEN_NAME, createToken(userInfo), {
            httpOnly: true,
            sameSite: true,
            secure: ENV !== "DEV",
          })
          .status(200)
          .send(userInfo);
      } else {
        return res.status(401).send("Email Already In Use");
      }
    } catch (err) {
      if (err.response) {
        return res.status(err.response.status).send(err.response.data);
      }

      return res.status(500).send(err);
    }
  });

  app.post("/login", async (req, res) => {
    try {
      const authData = req.body;
      const registeredUser = await getUserByEmail(authData.email);

      if (registeredUser) {
        bcrypt
          .compare(authData.password, registeredUser.password)
          .then((result) => {
            if (result) {
              let userInfo = {
                id: registeredUser.id,
                name: registeredUser.name,
                email: registeredUser.email,
                reputationPoints: registeredUser.reputation_points,
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
      } else {
        return res.status(401).send("Email Not Found");
      }
    } catch (err) {
      throw err;
    }
  });

  app.get("/login/token", authorize, async (req, res) => {
    res.status(200).send(req.user);
  });
}
