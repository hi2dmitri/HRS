CREATE TABLE public.tokens (
    _id integer NOT NULL,
    token character varying(30) NOT NULL,
    first_name character varying(20) NOT NULL,
    last_name character varying(20) NOT NULL,
    reg_status character varying(1) NOT NULL,
    email character varying(20),
    "position" character varying(20) NOT NULL
);

CREATE SEQUENCE public."Tokens__id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER SEQUENCE public."Tokens__id_seq" OWNED BY public.tokens._id;

CREATE TABLE public.addresses (
    id integer NOT NULL,
    person_id integer NOT NULL,
    street character varying(40) NOT NULL,
    city character varying(20) NOT NULL,
    state character varying(20) NOT NULL,
    zip character varying(10) NOT NULL
);

CREATE SEQUENCE public.address_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER SEQUENCE public.address_id_seq OWNED BY public.addresses.id;

CREATE TABLE public.auth_table (
    _id integer NOT NULL,
    email character varying(30) NOT NULL,
    password character varying NOT NULL,
    first_name character varying(30) NOT NULL,
    last_name character varying(30) NOT NULL
);

CREATE SEQUENCE public.authorization__id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER SEQUENCE public.authorization__id_seq OWNED BY public.auth_table._id;

CREATE TABLE public.candidates (
    id integer NOT NULL,
    first_name character varying NOT NULL,
    last_name character varying NOT NULL,
    email character varying NOT NULL,
    phone character varying NOT NULL,
    experience character varying NOT NULL,
    notes character varying,
    education character varying NOT NULL,
    "position" character varying,
    status character varying
);

CREATE SEQUENCE public.candidates_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER SEQUENCE public.candidates_id_seq OWNED BY public.candidates.id;

CREATE TABLE public.employees (
    id integer NOT NULL,
    first_name character varying(20) NOT NULL,
    last_name character varying(20) NOT NULL,
    email character varying(50) NOT NULL,
    dob character varying(30) NOT NULL,
    gender character varying(10) NOT NULL,
    marstatus character varying(10) NOT NULL,
    dependants integer NOT NULL,
    department character varying(30) NOT NULL,
    "position" character varying(30) NOT NULL,
    dateofhire character varying(14) NOT NULL,
    type character varying(20) NOT NULL,
    current character varying(5) NOT NULL,
    termindate character varying(13),
    terminreason character varying(150)
);

CREATE SEQUENCE public.employees_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER SEQUENCE public.employees_id_seq OWNED BY public.employees.id;

CREATE TABLE public.interviews (
    id integer NOT NULL,
    candidate_id integer NOT NULL,
    date character varying NOT NULL,
    "time" character varying NOT NULL,
    "position" character varying NOT NULL
);

CREATE SEQUENCE public.interviews_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER SEQUENCE public.interviews_id_seq OWNED BY public.interviews.id;

CREATE TABLE public.jobs (
    id integer NOT NULL,
    title character varying NOT NULL,
    department character varying NOT NULL,
    open_since character varying NOT NULL,
    notes character varying,
    num_of_app integer NOT NULL
);

CREATE SEQUENCE public.jobs_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER SEQUENCE public.jobs_id_seq OWNED BY public.jobs.id;

ALTER TABLE ONLY public.addresses ALTER COLUMN id SET DEFAULT nextval('public.address_id_seq'::regclass);

ALTER TABLE ONLY public.auth_table ALTER COLUMN _id SET DEFAULT nextval('public.authorization__id_seq'::regclass);

ALTER TABLE ONLY public.candidates ALTER COLUMN id SET DEFAULT nextval('public.candidates_id_seq'::regclass);

ALTER TABLE ONLY public.employees ALTER COLUMN id SET DEFAULT nextval('public.employees_id_seq'::regclass);

ALTER TABLE ONLY public.interviews ALTER COLUMN id SET DEFAULT nextval('public.interviews_id_seq'::regclass);

ALTER TABLE ONLY public.jobs ALTER COLUMN id SET DEFAULT nextval('public.jobs_id_seq'::regclass);

ALTER TABLE ONLY public.tokens ALTER COLUMN _id SET DEFAULT nextval('public."Tokens__id_seq"'::regclass);

ALTER TABLE ONLY public.tokens
    ADD CONSTRAINT "Tokens_pkey" PRIMARY KEY (_id);

ALTER TABLE ONLY public.addresses
    ADD CONSTRAINT addresses_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public.auth_table
    ADD CONSTRAINT authorization_pkey PRIMARY KEY (_id);

ALTER TABLE ONLY public.candidates
    ADD CONSTRAINT candidates_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public.employees
    ADD CONSTRAINT employees_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public.interviews
    ADD CONSTRAINT interviews_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public.jobs
    ADD CONSTRAINT jobs_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public.addresses
    ADD CONSTRAINT adresses_fk01 FOREIGN KEY (person_id) REFERENCES public.employees(id) NOT VALID;

ALTER TABLE ONLY public.interviews
    ADD CONSTRAINT interviews_candidate_id_fkey FOREIGN KEY (candidate_id) REFERENCES public.candidates(id) NOT VALID;
