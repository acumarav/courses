DROP VIEW
IF EXISTS membership.pending_users;

DROP TABLE IF Exists membership.users_roles;
DROP TABLE IF Exists membership.roles;

DROP TABLE
IF EXISTS membership.users;

DROP SCHEMA
IF EXISTS membership;

CREATE SCHEMA membership;

CREATE OR REPLACE FUNCTION random_string(len int) returns VARCHAR(18) AS 
$$ 
SELECT SUBSTRING(md5(random() :: TEXT), 0, len) as result; 
$$ LANGUAGE SQL;

CREATE
OR REPLACE FUNCTION the_time () RETURNS timestamptz AS $$ SELECT
	now() AS RESULT ; $$ LANGUAGE SQL;

CREATE TABLE membership.users (
	ID serial PRIMARY KEY NOT NULL,
	user_key VARCHAR (18) DEFAULT random_string(18),
	email VARCHAR (255) UNIQUE NOT NULL,
	FIRST VARCHAR (50),
	LAST VARCHAR (50),
	created_at TIMESTAMPtz NOT NULL DEFAULT now(),
	status VARCHAR (10) NOT NULL DEFAULT 'pending',
search_field tsvector not null
);

create table membership.roles(
id serial primary key not null,
name varchar(50) not null
);

create table membership.users_roles(
user_id int not null REFERENCES membership.users(id) on delete cascade,
role_id int not null REFERENCES membership.roles(id) on delete CASCADE,
PRIMARY key (user_id, role_id)
);

CREATE trigger users_search_update_refresh
before insert or update on membership.users
for each row execute PROCEDURE
tsvector_update_trigger(search_field,'pg_catalog.english', email, first,last);

INSERT INTO membership.users (email, FIRST, LAST)
VALUES
	(
		'test@test.com',
		'Alex',
		'Tsu'
	);

insert into membership.roles(name) values('Administrator');

insert into membership.users_roles(user_id, role_id)
values(1,1);

CREATE VIEW membership.pending_users AS SELECT
	*
FROM
	membership.users
WHERE
	status = 'pending';

SELECT	* FROM membership.pending_users;

select * from membership.users_roles;

--delete from membership.roles;