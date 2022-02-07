DROP TABLE IF EXISTS public.tokens;
CREATE TABLE public.tokens (
    _id serial NOT NULL,
    token character varying(30) NOT NULL,
    first_name character varying(30) NOT NULL,
    last_name character varying(30) NOT NULL,
    reg_status character varying(1) NOT NULL,
    email character varying(30),
    "position" character varying(30) NOT NULL,
    CONSTRAINT "tokens_pk" PRIMARY KEY ("_id")
)  WITH (
  OIDS=FALSE
);

DROP TABLE IF EXISTS public.auth_table;
CREATE TABLE public.auth_table (
    _id serial NOT NULL,
    email character varying(30) NOT NULL,
    password character varying NOT NULL,
    first_name character varying(30) NOT NULL,
    last_name character varying(30) NOT NULL,
    CONSTRAINT "auth_table_pk" PRIMARY KEY ("_id")
) WITH (
  OIDS=FALSE
);
