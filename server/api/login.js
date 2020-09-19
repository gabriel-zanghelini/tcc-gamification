import axios from "axios";
import { titleCase } from "voca";
import { pool } from "../../db/connection";
import bcrypt from "bcrypt";

import { createToken, authorize } from "../utils/auth";
import { ENV, TOKEN_NAME } from "../utils/constants";

import { getUserByEmail, createUser } from "./user";

export default function register(app) {
  app.post("/signup", async (req, res, next) => {
    try {
      const user = req.body;
      createUser(user);

      return res.sendStatus(200);
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

  // app.post("/login/credentials", async (req, res) => {
  //   const email = req.body.email;
  //   const password = req.body.password;

  //   if (!email) {
  //     return res.status(401).send("Incorrect Email");
  //   }

  //   if (!password) {
  //     return res.status(401).send("Incorrect Password");
  //   }

  //   try {
  //     const { data } = await fetcher.get("", {
  //       params: { validate: b64 },
  //     });

  //     if (typeof data === "string") {
  //       return res.status(401).send("Incorrect Username");
  //     }

  //     if (!data["user_validated"]) {
  //       return res.status(401).send("Incorrect Password");
  //     }

  //     // Add extra information from database here
  //     const [company, division] = data.company.split(" ", 2);

  //     const info = {
  //       fullName: data.complete_name,
  //       picture: data.url_user_picture,
  //       login: data.login,
  //       phone: data.telephone_number,
  //       country: data.country,
  //       city: titleCase(data.city),
  //       company,
  //       division,
  //       department: data.department,
  //       section: data.section,
  //       manager: data.manager,
  //       permissions: [],
  //     };

  //     return res
  //       .cookie(TOKEN_NAME, createToken(info), {
  //         httpOnly: true,
  //         sameSite: true,
  //       })
  //       .status(200)
  //       .send(info);
  //   } catch (err) {
  //     return res.status(500).send(err);
  //   }
  // });

  app.get("/login/token", authorize, async (req, res) => {
    res.status(200).send(req.user);
  });
}
