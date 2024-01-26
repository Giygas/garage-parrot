
create table
temoignages (
  id bigint primary key generated always as identity,
  name varchar(30) not null,
  note smallint not null,
  message varchar(250) not null,
  approved boolean not null default false,
  createdAt timestamp not null default now()
);
