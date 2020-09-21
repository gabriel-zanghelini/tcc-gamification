import axios from "axios";

import bcrypt from "bcrypt";
import { permit } from "../utils/auth";
import { pool } from "../../db/connection";

export const getUserByEmail = async (email) => {
  let user = null;
  await pool.connect().then((client) => {
    return client
      .query(
        "select id, name, email, password, reputation_points from tb_user where email = $1",
        [email]
      )
      .then((result) => {
        client.release();
        user = result.rows[0];
      })
      .catch((err) => {
        client.release();
        console.log(err.stack);
        throw err;
      });
  });

  return user;
};

export const createUser = async (user) => {
  await bcrypt.hash(user.password, 10).then((hash) => {
    pool.connect().then(async (client) => {
      try {
        await client.query(
          "insert into tb_user (name, email, password, reputation_points) values ($1, $2, $3, $4)",
          [user.name, user.email, hash, 0]
        );
        client.release();
      } catch (err) {
        client.release();
        // console.log(err.stack);
        throw err;
      }
    });
  });

  return 1;
};

export default function register(app) {
  app.get("/user", async (req, res) => {
    try {
      pool.connect().then((client) => {
        return client
          .query("select id, name from tb_user") // your query string here
          .then((result) => {
            client.release();
            console.table(result.rows); // your callback here

            return res.status(200).send(result.rows);
          })
          .catch((err) => {
            client.release();
            console.log(err.stack); // your callback here
            throw err;
          });
      });
    } catch (err) {
      if (err.response) {
        return res.status(err.response.status).send(err.response.data);
      }

      return res.sendStatus(500);
    }
  });

  app.get("/user/email/:email", async (req, res) => {
    try {
      const email = req.params.email;
      let user = await getUserByEmail(email);

      return res.json({ user: user });
    } catch (err) {
      if (err.response) {
        return res.status(err.response.status).send(err.response.data);
      }

      return res.sendStatus(500);
    }
  });

  // Examplessss:
  // app.get("/user/:id", async (req, res) => {
  //   const id = req.params.id;

  //   try {
  //     const { status, data, headers } = await pool.query("select id, name from tb_user");
  //     return res.status(status).set(headers).send(data);
  //   } catch (err) {
  //     if (err.response) {
  //       return res.status(err.response.status).send(err.response.data);
  //     }

  //     return res.sendStatus(500);
  //   }
  // });

  // app.post("/objects", async (req, res) => {
  //   const body = req.body;

  //   try {
  //     const { status, data, headers } = await fetcher.post("", body);
  //     return res.status(status).set(headers).send(data);
  //   } catch (err) {
  //     if (err.response) {
  //       return res.status(err.response.status).send(err.response.data);
  //     }

  //     return res.sendStatus(500);
  //   }
  // });

  // app.delete("/objects/:id", permit("WRITE"), async (req, res) => {
  //   const id = req.params.id;

  //   try {
  //     const { status, data, headers } = await fetcher.delete(id);
  //     return res.status(status).set(headers).send(data);
  //   } catch (err) {
  //     if (err.response) {
  //       return res.status(err.response.status).send(err.response.data);
  //     }

  //     return res.sendStatus(500);
  //   }
  // });
}
