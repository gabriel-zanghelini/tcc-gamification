const { pool } = require("../../db/connection");

const create_tb_project = async () => {
  await pool.connect().then((client) => {
    return client
      .query(
        `
        -- Table: public.tb_project

        -- DROP TABLE public.tb_project;
        
        CREATE TABLE public.tb_project
        (
            id serial NOT NULL,
            title text,
            description text NOT NULL,
            leader_id integer NOT NULL,
            team_id integer NOT NULL,
            status text,
            deadline date,
            CONSTRAINT tb_project_pkey PRIMARY KEY (id),
            CONSTRAINT tb_project_leader_fkey FOREIGN KEY (leader_id)
                REFERENCES public.tb_user (id) MATCH SIMPLE
                ON UPDATE NO ACTION
                ON DELETE NO ACTION
                NOT VALID
        )
        
        TABLESPACE pg_default;
        
        ALTER TABLE public.tb_project
            OWNER to postgres;
        -- Index: fki_tb_project_leader_fkey
        
        -- DROP INDEX public.fki_tb_project_leader_fkey;
        
        CREATE INDEX fki_tb_project_leader_fkey
            ON public.tb_project USING btree
            (leader_id ASC NULLS LAST)
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

create_tb_project();
