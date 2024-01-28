CREATE TABLE public.voitures(
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  price real NOT NULL,
  year smallint NOT NULL,
  kilometrage integer NOT NULL,
  image text NOT NULL,
  description text,
  equipment text[],
  options text[],
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  created_by uuid NOT NULL,
  CONSTRAINT voitures_pkey PRIMARY KEY (id),
  CONSTRAINT voitures_id_key UNIQUE (id),
  CONSTRAINT voitures_created_by_fkey FOREIGN KEY (created_by) REFERENCES employees(id) ON UPDATE CASCADE
);

CREATE TABLE public.contacts(
  id bigint GENERATED BY DEFAULT AS IDENTITY NOT NULL,
  first_name text NOT NULL,
  last_name text NOT NULL,
  email text NOT NULL,
  telephone text NOT NULL,
  message text NOT NULL,
  voiture_id uuid,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  responded boolean NOT NULL DEFAULT FALSE,
  responded_by uuid,
  CONSTRAINT contacts_pkey PRIMARY KEY (id),
  CONSTRAINT contacts_id_key UNIQUE (id),
  CONSTRAINT contacts_voiture_id_fkey FOREIGN KEY (voiture_id) REFERENCES voitures(id) ON UPDATE CASCADE ON DELETE SET NULL,
  CONSTRAINT contacts_responded_by_fkey FOREIGN KEY (responded_by) REFERENCES employees(id) ON UPDATE CASCADE
);

ALTER TABLE temoignages
  ADD CONSTRAINT temoignages_responded_by_fkey FOREIGN KEY (approved_by) REFERENCES employees(id) ON UPDATE CASCADE;

-- Trigger for generating a random password
-- CREATE OR REPLACE FUNCTION public.password_gen()
--  RETURNS trigger
--  LANGUAGE plpgsql
-- AS $function$
-- BEGIN
--   NEW.password = md5(random()::text);
--   RETURN NEW;
-- END;
-- $function$;
-- CREATE TRIGGER password_generation BEFORE INSERT ON public.employees FOR EACH ROW EXECUTE FUNCTION password_gen();
-- Trigger
