BEGIN;

CREATE TYPE user_without_password AS (
    id INT,
    email domain_mail,
    nickname domain_nickname,
    profile_picture TEXT,
    role enum_role,
	prompt INT
);

CREATE OR REPLACE FUNCTION get_user_without_password(user_id INT) 
RETURNS "user_without_password" AS $$
-- Declare a variable type of user_profile
DECLARE
    "user_record" "user_without_password";
BEGIN
    SELECT id, email, nickname, profile_picture, role, prompt
	-- Store the request result INTO user_record
    INTO "user_record"
    FROM "user"
    WHERE id = user_id;

    RETURN "user_record";
END;
$$ 
LANGUAGE plpgsql SECURITY DEFINER;


CREATE OR REPLACE FUNCTION get_all_nicknames() 
RETURNS TABLE (nickname domain_nickname) AS $$
BEGIN
    RETURN QUERY
    SELECT "user".nickname FROM "user";
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;



CREATE OR REPLACE FUNCTION get_user_by_nickname(TEXT) RETURNS "user" AS $$
	SELECT * FROM "user" WHERE nickname=$1;
$$ LANGUAGE sql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION get_user_by_email(TEXT) RETURNS "user" AS $$
    SELECT * FROM "user" WHERE email=$1;
$$ LANGUAGE sql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION get_user(int) RETURNS "user" AS $$
	SELECT * FROM "user" WHERE id=$1;
$$ LANGUAGE sql SECURITY DEFINER;


CREATE OR REPLACE FUNCTION get_all_users() 
RETURNS SETOF "user_without_password" 
AS $$
BEGIN
    RETURN QUERY 
    SELECT id, email, nickname, profile_picture, role, prompt
    FROM "user";
END;
$$ 
LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION update_user(u json) RETURNS void AS $$
	UPDATE "user" SET
		"password" = u->>'password',
		"nickname" = u->>'nickname',
		"profile_picture" = u->>'profile_picture'
	WHERE "id" = (u->>'id')::int
$$ LANGUAGE sql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION update_user_admin(u json) RETURNS void AS $$
	UPDATE "user" SET
        "email" = u->>'email',
		"password" = u->>'password',
		"nickname" = u->>'nickname',
		"profile_picture" = u->>'profile_picture',
		"role" = (u->>'role')::enum_role
	WHERE "id" = (u->>'id')::int
$$ LANGUAGE sql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION insert_user(u json) RETURNS void AS $$
	INSERT INTO "user" (email, password, nickname) 
    VALUES (
		u->>'email',
		u->>'password',
		u->>'nickname')
$$ LANGUAGE sql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION delete_user(int) RETURNS void AS $$
	DELETE FROM "user" 
	WHERE "id"=$1
$$ LANGUAGE sql SECURITY DEFINER;


CREATE OR REPLACE FUNCTION decount_user_prompt(u_id int) 
RETURNS void
AS $$
    UPDATE "user" 
	SET "prompt" = "prompt" - 1
    WHERE "id" = u_id;
$$ LANGUAGE sql SECURITY DEFINER;

COMMIT;