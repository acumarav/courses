create table logs(
  id serial PRIMARY KEY,
  subject VARCHAR(50),
  user_id bigint,
  entry text not null,
  data jsonb,
  created_at TIMESTAMPTZ DEFAULT  now()
);