CREATE TABLE public.temoignages(
  id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name varchar(30) NOT NULL,
  rating smallint NOT NULL,
  message varchar(250) NOT NULL,
  approved boolean NOT NULL DEFAULT FALSE,
  approved_by uuid,
  created_at timestamp NOT NULL DEFAULT now()
);

ALTER TABLE temoignages
  ADD CONSTRAINT temoignages_id UNIQUE (id);

CREATE TABLE public.profiles(
  id uuid NOT NULL REFERENCES auth.users ON DELETE CASCADE,
  name text NOT NULL,
  role_type smallint NOT NULL DEFAULT 2,
  -- 1 admin, 2 employee
  PRIMARY KEY (id)
);

-- inserts a row into public.profiles
CREATE FUNCTION public.handle_new_user()
  RETURNS TRIGGER
  LANGUAGE plpgsql
  SECURITY DEFINER
  SET search_path = public
  AS $$
DECLARE
  is_admin boolean;
BEGIN
  SELECT
    count(*) = 1
    -- 1 because the user is inserted in the profiles tables after the insertion in auth table
    -- so the first user will be admin
  FROM
    auth.users INTO is_admin;
  IF is_admin THEN
    INSERT INTO public.profiles(id, name, role_type)
      VALUES (NEW.id, NEW.raw_user_meta_data ->> 'name', 1);
  ELSE
    INSERT INTO public.profiles(id, name, role_type)
      VALUES (NEW.id, NEW.raw_user_meta_data ->> 'name', 2);
  END IF;
  RETURN new;
END;
$$;

-- -- trigger the function every time a user is created
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE PROCEDURE public.handle_new_user();

