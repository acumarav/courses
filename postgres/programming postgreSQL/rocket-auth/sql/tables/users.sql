create table users(
	id BIGINT primary key not null DEFAULT  id_generator(),
	email varchar(255) unique not null,
  created_at TIMESTAMPTZ DEFAULT now() not null,
  status VARCHAR(10) DEFAULT 'active'
);
