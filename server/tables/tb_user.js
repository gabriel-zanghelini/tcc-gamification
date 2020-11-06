const { pool } = require("../../db/connection");

const create_tb_user = async () => {
  await pool.connect().then((client) => {
    return client
      .query(
				`
				-- Table: public.tb_user

				-- DROP TABLE public.tb_user;

				CREATE TABLE public.tb_user
				(
						id serial NOT NULL,
						name text NOT NULL,
						email text NOT NULL,
						password text NOT NULL,
						reputation_points integer NOT NULL,
						CONSTRAINT "tb-user_pkey" PRIMARY KEY (id)
				)

				TABLESPACE pg_default;

				ALTER TABLE public.tb_user
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

create_tb_user();
