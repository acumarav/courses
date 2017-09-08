DROP SCHEMA IF EXISTS transcode CASCADE;
--drop SCHEMA IF EXISTS springbatch CASCADE;

CREATE SCHEMA transcode;
--CREATE SCHEMA if NOT EXISTS springbatch;

SET search_path = transcode;

CREATE TABLE assets (
  id   SERIAL PRIMARY KEY,
  path VARCHAR(500) NOT NULL
);

--INSERT INTO assets (path) VALUES ('Schema initialized');
--select * from assets;