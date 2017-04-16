create table logins(
  id BIGINT PRIMARY KEY DEFAULT id_generator(),
  user_id BIGINT not null,
  provider VARCHAR(50) not null DEFAULT 'local',
  provider_key VARCHAR(255),
  provider_token VARCHAR(255) not null
);