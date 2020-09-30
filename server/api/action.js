import { pool } from "../../db/connection";

const createAction = async (action) => {
  let actionResult = null;

  await pool
    .connect()
    .then(async (client) => {
      await client
        .query(
          "insert into tb_action (description, points_awarded, points_required) values ($1, $2, $3) returning *",
          [action.description, action.points_awarded, action.points_required]
        )
        .then((result) => {
          client.release();
          actionResult = result.rows[0];
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

  return actionResult;
};

const updateAction = async (action) => {
  await pool
    .connect()
    .then(async (client) => {
      await client
        .query(
          "update tb_action set description=$1, points_awarded=$2, points_required=$3 where id=$3",
          [
            action.description,
            action.points_awarded,
            action.points_required,
            action.id,
          ]
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

const deleteAction = async (id) => {
  await pool
    .connect()
    .then(async (client) => {
      await client
        .query("delete from tb_action where id=$1", [id])
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
  app.get("/action", async (req, res) => {
    try {
      pool.connect().then((client) => {
        return client
          .query("select * from tb_action")
          .then((result) => {
            client.release();
            // console.table(result.rows);

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

  app.post("/action", async (req, res) => {
    try {
      const action = req.body;
      let { id } = await createAction(action);

      let actionInfo = {
        id: id,
        description: action.description,
        status: action.status, 
        difficulty: action.difficulty, 
        points_rewarded: action.points_rewarded
      };

      return res.status(200).send(actionInfo);
    } catch (err) {
      throw err;
    }
  });

  app.put("/action", async (req, res) => {
    try {
      const action = req.body;
      await updateAction(action);

      return res.sendStatus(200);
    } catch (err) {
      throw err;
    }
  });

  app.delete("/action/:id", async (req, res) => {
    try {
      const id = req.params.id;
      await deleteAction(id);

      return res.sendStatus(200);
    } catch (err) {
      throw err;
    }
  });
}
