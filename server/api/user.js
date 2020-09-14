import axios from "axios";

import { permit } from "../utils/auth";

import { pool } from "../../db/connection";

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
      console.log(email);

      pool.connect().then((client) => {
        return client
          .query("select count(email) from tb_user where email = $1", [email]) // your query string here
          .then((result) => {
            client.release();
            console.log(result.rows[0]); // your callback here
            let emailInUse = result.rows[0].count !== "0";

            return res.json({ emailInUse: emailInUse, email: email });
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
