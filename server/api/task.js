import { pool } from "../../db/connection";

const createTask = async (task) => {
  let taskResult = null;

  await pool
    .connect()
    .then(async (client) => {
      await client
        .query(
          "insert into tb_task (description, status, difficulty, points_rewarded) values ($1, $2, $3, $4) returning *",
          [task.description, task.status, task.difficulty, task.points_rewarded]
        )
        .then((result) => {
          client.release();
          taskResult = result.rows[0];
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

  return taskResult;
};

//TODO: refatorar pra task
const updateTask = async (task) => {
  await pool
    .connect()
    .then(async (client) => {
      await client
        .query(
          "update tb_task set description=$1, leader_id=$2, team_id=$3 where id=$4",
          [task.description, task.leader_id, task.team_id, task.id]
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

const deleteTask = async (id) => {
  await pool
    .connect()
    .then(async (client) => {
      await client
        .query("delete from tb_task where id=$1", [id])
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
  app.get("/task", async (req, res) => {
    try {
      pool.connect().then((client) => {
        return client
          .query("select * from tb_task")
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

  app.post("/task", async (req, res) => {
    try {
      const task = req.body;
      let { id } = await createTask(task);

      let taskInfo = {
        id: id,
        description: task.description,
        team_id: task.team_id, //TODO: get team by ID
        leader_id: task.leader_id, //TODO: get leader
      };

      return res.status(200).send(taskInfo);
    } catch (err) {
      throw err;
    }
  });

  app.put("/task", async (req, res) => {
    try {
      const task = req.body;
      await updateTask(task);

      return res.sendStatus(200);
    } catch (err) {
      throw err;
    }
  });

  app.delete("/task/:id", async (req, res) => {
    try {
      const id = req.params.id;
      await deleteTask(id);

      return res.sendStatus(200);
    } catch (err) {
      throw err;
    }
  });
}
