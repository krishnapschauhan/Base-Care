--Report Table

-- Table: public.reports

-- DROP TABLE IF EXISTS public.reports;

CREATE TABLE IF NOT EXISTS public.reports
(
    id integer NOT NULL DEFAULT nextval('reports_id_seq'::regclass),
    user_id integer NOT NULL,
    description text COLLATE pg_catalog."default" NOT NULL,
    location text COLLATE pg_catalog."default" NOT NULL,
    category text COLLATE pg_catalog."default" DEFAULT 'General'::text,
    urgency text COLLATE pg_catalog."default" DEFAULT 'Medium'::text,
    status text COLLATE pg_catalog."default" DEFAULT 'Pending'::text,
    landmark text COLLATE pg_catalog."default",
    assigned_to integer,
    created_at timestamp without time zone DEFAULT now(),
    updated_at timestamp without time zone DEFAULT now(),
    CONSTRAINT reports_pkey PRIMARY KEY (id),
    CONSTRAINT reports_assigned_to_fkey FOREIGN KEY (assigned_to)
        REFERENCES public.users (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE SET NULL,
    CONSTRAINT reports_user_id_fkey FOREIGN KEY (user_id)
        REFERENCES public.users (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.reports
    OWNER to postgres;

--User Query

-- Table: public.users

-- DROP TABLE IF EXISTS public.users;

CREATE TABLE IF NOT EXISTS public.users
(
    id integer NOT NULL DEFAULT nextval('users_id_seq'::regclass),
    name character varying(100) COLLATE pg_catalog."default",
    email character varying(100) COLLATE pg_catalog."default" NOT NULL,
    password text COLLATE pg_catalog."default" NOT NULL,
    role character varying(20) COLLATE pg_catalog."default" NOT NULL DEFAULT 'user'::character varying,
    availability boolean DEFAULT true,
    CONSTRAINT users_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.users
    OWNER to postgres;

--Seed data

INSERT INTO public.users (name, email, password, role, availability) VALUES
-- Admin
('Admin User', 'admin@example.com', '$2a$12$bK.U3TGy8L5rAq.bqK61a.RXH485gUrhGEBxhDab3B6mViva2KD86', 'admin', true),

-- Worker
('Worker One', 'worker@example.com', '$2a$12$CndWp0VBdz/mPBLpY0pu6OX8QnOBg.K7Oi1pxEXtqn220grnrHQ96', 'worker', true),

-- Regular User
('Regular User', 'user@example.com', '$2a$12$Q14TAs88L2Z6emncvVJnpecDitIorWugSPU5RHP2YirashRsgqZg6', 'user', true);