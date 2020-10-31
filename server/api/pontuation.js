import { pool } from "../../db/connection";

const getUserPontuationByProject = async ({ userId, projectId }) => {
  let userPontuation = null;
  await pool.connect().then((client) => {
    return client
      .query(
        "select * from tb_pontuation where user_id = $1 and project_id = $2",
        [userId, projectId]
      )
      .then((result) => {
        client.release();
        userPontuation = result.rows[0];
      })
      .catch((err) => {
        client.release();
        console.log(err.stack);
        throw err;
      });
  });

  return userPontuation;
};

const getPontuationByProject = async (projectId) => {
  let pontuation = null;
  await pool.connect().then((client) => {
    return client
      .query("select * from tb_pontuation where project_id = $1", [projectId])
      .then((result) => {
        client.release();
        pontuation = result.rows;
      })
      .catch((err) => {
        client.release();
        console.log(err.stack);
        throw err;
      });
  });

  return pontuation;
};

const createPontuationRegister = async ({ userId, projectId }) => {
  let pontuationResult = null;

  await pool
    .connect()
    .then(async (client) => {
      await client
        .query(
          "insert into tb_pontuation (user_id, project_id, pontuation) values ($1, $2, $3) returning *",
          [userId, projectId, 0]
        )
        .then((result) => {
          client.release();
          pontuationResult = result.rows[0];
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

  return pontuationResult;
};

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
      let pontuation = await getUserPontuationByProject(data);

      if (!pontuation) {
        await createPontuationRegister(data);
      }

      await addPontuation(data);

      return res.sendStatus(200);
    } catch (err) {
      console.log(err);
      if (err.response) {
        return res.status(err.response.status).send(err.response.data);
      }

      return res.status(500).send(err);
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

  app.get("/pontuation/user/:id", async (req, res) => {
    try {
      let projectId = req.params.id;
      let pontuation = await getPontuationByProject(projectId);

      return res.status(200).send(pontuation); 
    } catch (err) {
      if (err.response) {
        return res.status(err.response.status).send(err.response.data);
      }

      return res.sendStatus(500);
    }
  });
}
