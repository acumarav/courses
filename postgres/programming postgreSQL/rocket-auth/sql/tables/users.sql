create table users(
	id BIGINT primary key not null default  id_generator(),
  user_key VARCHAR(18) DEFAULT  random_string(18) not null,
	email varchar(255) unique not null,
  first VARCHAR(25),
  last VARCHAR(25),
  hashed_password VARCHAR(255),
  search tsvector,
  created_at TIMESTAMPTZ DEFAULT now() not null,
  status VARCHAR(10) DEFAULT 'active',
  last_login TIMESTAMPTZ,
  login_count int DEFAULT  0 not null
);

INSERT into users(email, first,last)
    VALUES ('test@test.com','Test','User');