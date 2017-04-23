create type user_summary as (
  id BIGINT,
  email VARCHAR(255),
  status VARCHAR(50),
  can_login BOOLEAN,
  is_admin BOOLEAN,
  display_name VARCHAR(255),
  user_key VARCHAR(18),
  email_validation_token VARCHAR(36),
  user_for INTERVAL,
  profile jsonb,
  logs jsonb,
  notes jsonb
);