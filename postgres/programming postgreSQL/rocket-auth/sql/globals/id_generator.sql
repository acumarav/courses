--timestamp (41) | shardid (13) | userid (10)
set search_path = membership;
create SEQUENCE  id_sequence;

CREATE OR REPLACE FUNCTION id_generator(OUT new_id bigint) AS $$
DECLARE
  our_epoch bigint := 1273687200000;
  seq_id bigint;
  now_ms bigint;
  shard_id int := 1;
BEGIN
  SELECT nextval('id_sequence') % (1024) INTO seq_id;
  SELECT FLOOR(EXTRACT(EPOCH FROM now()) * 1000) INTO now_ms;
  new_id := (now_ms - our_epoch) << 23;
  new_id := new_id | (shard_id <<10);
  new_id := new_id | (seq_id);
END;
$$ LANGUAGE PLPGSQL;



