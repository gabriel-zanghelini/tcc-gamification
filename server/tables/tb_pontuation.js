const { pool } = require("../../db/connection");

const create_tb_pontuation = async () => {
  await pool.connect().then((client) => {
    return client
      .query(
        `
        -- Table: public.tb_pontuation

				-- DROP TABLE public.tb_pontuation;

				CREATE TABLE public.tb_pontuation
				(
						id serial NOT NULL,
						user_id integer NOT NULL,
						project_id integer NOT NULL,
						pontuation integer,
						CONSTRAINT tb_pontuation_pkey PRIMARY KEY (id),
						CONSTRAINT tb_pontuation_project_fkey FOREIGN KEY (project_id)
								REFERENCES public.tb_project (id) MATCH SIMPLE
								ON UPDATE NO ACTION
								ON DELETE NO ACTION
								NOT VALID,
						CONSTRAINT tb_pontuation_user_fkey FOREIGN KEY (user_id)
								REFERENCES public.tb_user (id) MATCH SIMPLE
								ON UPDATE NO ACTION
								ON DELETE NO ACTION
								NOT VALID
				)

				TABLESPACE pg_default;

				ALTER TABLE public.tb_pontuation
						OWNER to postgres;
				-- Index: fki_tb_pontuation_project_fkey

				-- DROP INDEX public.fki_tb_pontuation_project_fkey;

				CREATE INDEX fki_tb_pontuation_project_fkey
						ON public.tb_pontuation USING btree
						(project_id ASC NULLS LAST)
						TABLESPACE pg_default;
				-- Index: fki_tb_pontuation_user_fkey

				-- DROP INDEX public.fki_tb_pontuation_user_fkey;

				CREATE INDEX fki_tb_pontuation_user_fkey
						ON public.tb_pontuation USING btree
						(user_id ASC NULLS LAST)
						TABLESPACE pg_default;
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

create_tb_pontuation();
