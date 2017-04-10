create table users(

	id serial primary key,
	email varchar(255) unique not null,
  created_at TIMESTAMPTZ DEFAULT now() not null,
  status VARCHAR(10) DEFAULT 'active'
);
