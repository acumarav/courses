
ALTER TABLE logins
    ADD CONSTRAINT logins_users
  FOREIGN KEY  (user_id) REFERENCES  users(id) ON DELETE CASCADE;