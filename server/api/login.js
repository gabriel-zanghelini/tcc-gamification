import axios from "axios";
import { titleCase } from "voca";
import { pool } from "../../db/connection";

import { createToken, authorize } from "../utils/auth";
import { TOKEN_NAME } from "../utils/constants";

const fetcher = axios.create({
  baseURL: "/api",
});

export default function register(app) {
  app.post("/signup", async (req, res, next) => {
    try {
      const user = req.body;
      console.log("BODY:", user);
      pool.connect().then(async (client) => {
        try {
          const result = await client.query(
            "insert into tb_user (name, email, password, reputation_points) values ($1, $2, $3, $4)",
            [user.name, user.email, user.password, user.reputationPoints]
          );
          client.release();
          console.table(result.rows);
          return res.status(200).send(result.rows);
        } catch (err) {
          client.release();
          console.log(err.stack);
          throw err;
        }
      });
    } catch (err) {
      if (err.response) {
        return res.status(err.response.status).send(err.response.data);
      }

      return res.status(500).send(err);
    }
  });

  app.post("/login/credentials", async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    if (!username) {
      return res.status(401).send("Incorrect Username");
    }

    if (!password) {
      return res.status(401).send("Incorrect Password");
    }

    const b64 = Buffer.from(username + ":" + password).toString("base64");

    try {
      const { data } = await fetcher.get("", {
        params: { validate: b64 },
      });

      if (typeof data === "string") {
        return res.status(401).send("Incorrect Username");
      }

      if (!data["user_validated"]) {
        return res.status(401).send("Incorrect Password");
      }

      // Add extra information from database here
      const [company, division] = data.company.split(" ", 2);

      const info = {
        fullName: data.complete_name,
        picture: data.url_user_picture,
        login: data.login,
        phone: data.telephone_number,
        country: data.country,
        city: titleCase(data.city),
        company,
        division,
        department: data.department,
        section: data.section,
        manager: data.manager,
        permissions: [],
      };

      return res
        .cookie(TOKEN_NAME, createToken(info), {
          httpOnly: true,
          sameSite: true,
        })
        .status(200)
        .send(info);
    } catch (err) {
      return res.status(500).send(err);
    }
  });

  app.get("/login/token", authorize, async (req, res) => {
    res.status(200).send(req.user);
  });
}
