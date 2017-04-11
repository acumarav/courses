create table users(
	id BIGINT primary key not null DEFAULT  id_generator(),
	email varchar(255) unique not null,
  first VARCHAR(25),
  last VARCHAR(25),
  search tsvector,
  created_at TIMESTAMPTZ DEFAULT now() not null,
  status VARCHAR(10) DEFAULT 'active'
);

INSERT into users(email, first,last)
    VALUES ('test@test.com','Test','User');