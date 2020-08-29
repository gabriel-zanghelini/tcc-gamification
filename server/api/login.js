import axios from "axios";
import { titleCase } from "voca";

import { createToken, authorize } from "../utils/auth";
import { TOKEN_NAME } from "../utils/constants";

const fetcher = axios.create({
  baseURL: "http://10.0.36.217:5009/"
});

export default function register(app) {
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
        params: { validate: b64 }
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
        permissions: []
      };

      return res
        .cookie(TOKEN_NAME, createToken(info), {
          httpOnly: true,
          sameSite: true
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
