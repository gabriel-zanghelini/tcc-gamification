import { pool } from "../../db/connection";

const addPontuation = async ({ points, userId, projectId }) => {
  await pool
    .connect()
    .then(async (client) => {
      await client
        .query(
          "update tb_pontuation set pontuation=pontuation+$1 where user_id=$2 and project_id=$3",
          [points, userId, projectId]
        )
        .then((result) => {
          client.release();
        })
        .catch((err) => {
          client.release();
          throw err;
        });
    })
    .catch((err) => {
      console.log(err.stack);
      throw err;
    });
};

const removePontuation = async (points, userId, projectId) => {
  await pool
    .connect()
    .then(async (client) => {
      await client
        .query(
          "update tb_pontuation set pontuation=pontuation-$1 where user_id=$2 and project_id=$3",
          [points, userId, projectId]
        )
        .then((result) => {
          client.release();
        })
        .catch((err) => {
          client.release();
          throw err;
        });
    })
    .catch((err) => {
      console.log(err.stack);
      throw err;
    });
};

export default function register(app) {
  app.put("/pontuation/add", async (req, res) => {
    try {
      const data = req.body;
      await addPontuation(data);

      return res.sendStatus(200);
    } catch (err) {
      if (err.response) {
        return res.status(err.response.status).send(err.response.data);
      }

      return res.sendStatus(500);
    }
  });

  app.put("/pontuation/rmv", async (req, res) => {
    try {
      const data = req.body;
      await removePontuation(data);

      return res.sendStatus(200);
    } catch (err) {
      if (err.response) {
        return res.status(err.response.status).send(err.response.data);
      }

      return res.sendStatus(500);
    }
  });
}
