const { pool } = require("../../db/connection");

const create_tb_task = async () => {
  await pool.connect().then((client) => {
    return client
      .query(
				`
				-- Table: public.tb_task

				-- DROP TABLE public.tb_task;

				CREATE TABLE public.tb_task
				(
						id serial NOT NULL,
						description text NOT NULL,
						status text NOT NULL,
						difficulty integer NOT NULL,
						deadline date NOT NULL,
						points_rewarded integer NOT NULL,
						project_id integer NOT NULL,
						CONSTRAINT tb_task_project_fkey FOREIGN KEY (project_id)
								REFERENCES public.tb_project (id) MATCH SIMPLE
								ON UPDATE NO ACTION
								ON DELETE NO ACTION
								NOT VALID,
						CONSTRAINT "tb_task_pkey" PRIMARY KEY (id)
				)

				TABLESPACE pg_default;

				ALTER TABLE public.tb_task
						OWNER to postgres;
        `
      )
      .then((result) => {
        client.release();
      })
      .catch((err) => {
        client.release();
        console.log(err);
      });
  });
};

create_tb_task();
