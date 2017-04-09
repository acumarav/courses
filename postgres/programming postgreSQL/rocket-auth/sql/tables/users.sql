create table users(

	id serial primary key,
	email varchar(255) unique not null
);
