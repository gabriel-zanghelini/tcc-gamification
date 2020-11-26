/*import { pool } from "../../db/connection";
import { createTask } from "./task";*/

var connection = require("../../db/connection");
var task = require("./task");

var pool = connection.pool;
var createTask = task.createTask;

const createProject = async (project) => {
  let projectResult = null;

  await pool
    .connect()
    .then(async (client) => {
      await client
        .query(
          "insert into tb_project (title, description, leader_id, team_id, status, deadline) values ($1, $2, $3, $4, $5, $6) returning *",
          [
            project.title,
            project.description,
            project.leader_id,
            0,
            project.status,
            project.deadline,
          ]
        )
        .then((result) => {
          client.release();
          projectResult = result.rows[0];
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

  return projectResult;
};

const updateProject = async (project) => {
  await pool
    .connect()
    .then(async (client) => {
      await client
        .query(
          "update tb_project set title=$1, description=$2, leader_id=$3, team_id=$4, status=$5, deadline=$6 where id=$7",
          [
            project.title,
            project.description,
            project.leader_id,
            project.team_id,
            project.status,
            project.deadline,
            project.id,
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

const deleteProject = async (id) => {
  await pool
    .connect()
    .then(async (client) => {
      await client
        .query("delete from tb_project where id=$1", [id])
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

const completeProject = async (id) => {
  await pool
    .connect()
    .then(async (client) => {
      await client
        .query("update tb_project set status=$1 where id=$2", ["completed", id])
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

function register(app) {
  app.get("/project", async (req, res) => {
    try {
      pool.connect().then((client) => {
        return client
          .query(
            `select 
              tb_project.id,
              title,
              description,
              deadline,
              status,
              leader_id,
              tb_user.name as leader_name
            from tb_project 
            inner join tb_user 
            on tb_user.id = tb_project.leader_id`
          )
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
      if (err) {
        return res.status(500).send(err);
      }

      return res.sendStatus(500);
    }
  });

  app.get("/project/:id", async (req, res) => {
    try {
      const projectId = req.params.id;

      pool.connect().then((client) => {
        return client
          .query("select * from tb_project where id=$1", [projectId])
          .then((result) => {
            client.release();
            // console.table(result.rows);

            return res.status(200).send(result.rows[0]);
          })
          .catch((err) => {
            client.release();
            console.log(err.stack);
            throw err;
          });
      });
    } catch (err) {
      if (err) {
        return res.status(500).send(err);
      }

      return res.sendStatus(500);
    }
  });

  app.get("/project/:id/task/:status/", async (req, res) => {
    try {
      const projectId = req.params.id;
      const status = req.params.status;

      pool.connect().then((client) => {
        return client
          .query("select * from tb_task where status=$1 and project_id=$2", [
            status,
            projectId,
          ])
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
      if (err) {
        return res.status(500).send(err);
      }

      return res.sendStatus(500);
    }
  });

  app.get("/project/:id/task", async (req, res) => {
    try {
      const id = req.params.id;

      pool.connect().then((client) => {
        return client
          .query("select * from tb_task where project_id=$1", [id])
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
      if (err) {
        return res.status(500).send(err);
      }

      return res.sendStatus(500);
    }
  });

  app.post("/project/:id/task", async (req, res) => {
    try {
      const projectId = req.params.id;
      const task = req.body;
      let { taskId } = await createTask(task, projectId);

      let taskInfo = {
        id: taskId,
        description: task.description,
        status: task.status,
        difficulty: task.difficulty,
        points_rewarded: task.points_rewarded,
        project_id: projectId,
      };

      return res.status(200).send(taskInfo);
    } catch (err) {
      if (err) {
        return res.status(500).send(err);
      }

      return res.sendStatus(500);
    }
  });

  app.post("/project", async (req, res) => {
    try {
      const project = req.body;
      console.log("/project", project);
      let { id } = await createProject(project);

      let projectInfo = {
        id: id,
        title: project.title,
        description: project.description,
        team_id: project.team_id, //TODO: get team by ID
        leader_id: project.leader_id, //TODO: get leader
        status: project.status, //TODO: get leader
        deadline: project.deadline,
      };

      return res.status(200).send(projectInfo);
    } catch (err) {
      if (err) {
        return res.status(500).send(err);
      }

      return res.sendStatus(500);
    }
  });

  app.put("/project", async (req, res) => {
    try {
      const project = req.body;
      await updateProject(project);

      return res.sendStatus(200);
    } catch (err) {
      if (err) {
        return res.status(500).send(err);
      }

      return res.sendStatus(500);
    }
  });

  app.put("/project/:id/complete", async (req, res) => {
    try {
      const id = req.params.id;
      await completeProject(id);

      return res.sendStatus(200);
    } catch (err) {
      if (err) {
        return res.status(500).send(err);
      }

      return res.sendStatus(500);
    }
  });

  app.delete("/project/:id", async (req, res) => {
    try {
      const id = req.params.id;
      await deleteProject(id);

      return res.sendStatus(200);
    } catch (err) {
      if (err) {
        return res.status(500).send(err);
      }

      return res.sendStatus(500);
    }
  });
}

module.exports = {
  register: register,
};
