CREATE TABLE public.temoignages(
  id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name varchar(30) NOT NULL,
  note smallint NOT NULL,
  message varchar(250) NOT NULL,
  approved boolean NOT NULL DEFAULT FALSE,
  approved_by uuid,
  created_at timestamp NOT NULL DEFAULT now()
);

ALTER TABLE temoignages
  ADD CONSTRAINT temoignages_id UNIQUE (id);

CREATE TABLE public.employees(
  id uuid PRIMARY KEY NOT NULL DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  password text NOT NULL DEFAULT md5(random()::text),
  role smallint NOT NULL DEFAULT 2,
  -- 1 admin, 2 employee
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  last_password timestamp with time zone
);

ALTER TABLE employees
  ADD CONSTRAINT employees_id UNIQUE (id);

