
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