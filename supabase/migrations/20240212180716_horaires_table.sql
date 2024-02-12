CREATE TABLE public.horaires(
  id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  day varchar(10) NOT NULL,
  hours text NOT NULL
);

