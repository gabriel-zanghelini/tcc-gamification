import { pool } from "../../db/connection";

export const createTask = async (task, projectId) => {
  let taskResult = null;

  await pool
    .connect()
    .then(async (client) => {
      await client
        .query(
          "insert into tb_task (description, status, difficulty, points_rewarded, project_id) values ($1, $2, $3, $4, $5) returning *",
          [
            task.description,
            task.status,
            task.difficulty,
            task.points_rewarded,
            projectId,
          ]
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

const updateTask = async (task) => {
  await pool
    .connect()
    .then(async (client) => {
      await client
        .query(
          "update tb_task set description=$1, status=$2, difficulty=$3, points_rewarded=$4 where id=$5",
          [
            task.description,
            task.status,
            task.difficulty,
            task.points_rewarded,
            task.id,
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
