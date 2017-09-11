--DROP SCHEMA IF EXISTS transcode CASCADE;
--drop SCHEMA IF EXISTS springbatch CASCADE;

--CREATE SCHEMA IF NOT EXISTS transcode;
--CREATE SCHEMA IF NOT EXISTS batch;

--SET search_path = transcode;

CREATE TABLE IF NOT EXISTS assets (
  id   SERIAL PRIMARY KEY,
  path VARCHAR(500) NOT NULL
);

--INSERT INTO assets (path) VALUES ('Schema initialized');
--select * from assets;