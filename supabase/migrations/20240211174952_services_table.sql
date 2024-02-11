CREATE TABLE public.services(
  id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  title text NOT NULL,
  description text NOT NULL
);

