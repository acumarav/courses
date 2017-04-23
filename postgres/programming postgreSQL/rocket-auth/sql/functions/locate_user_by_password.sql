CREATE OR REPLACE FUNCTION locate_user_by_password(em VARCHAR, pass VARCHAR)
  RETURNS BIGINT
AS $$
SET search_path = membership;
SELECT user_id
FROM logins
WHERE provider = 'local' AND provider_key = em
      AND provider_token = crypt(pass, provider_token);
$$ LANGUAGE SQL;