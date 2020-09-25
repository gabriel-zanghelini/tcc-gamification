import { pool } from "../../db/connection";

export default function register(app) {
  app.get("/projects", async (req, res) => {
		try {
      pool.connect().then((client) => {
        return client
          .query("select * from tb_project")
          .then((result) => {
            client.release();
            console.table(result.rows);

            return res.status(200).send(result.rows);
          })
          .catch((err) => {
            client.release();
            console.log(err.stack);
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
}