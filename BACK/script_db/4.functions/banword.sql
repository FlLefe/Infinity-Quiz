BEGIN;

CREATE TYPE banword_without_id AS (
    "label" TEXT
);

CREATE OR REPLACE FUNCTION get_all_banwords() RETURNS SETOF "banword" AS $$
    SELECT * FROM "banword";
$$ LANGUAGE sql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION get_all_banwords_without_id() RETURNS SETOF "banword_without_id" AS $$
    SELECT "label" FROM "banword";
$$ LANGUAGE sql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION get_banword(int) RETURNS "banword" AS $$
	SELECT * FROM "banword" WHERE id=$1;
$$ LANGUAGE sql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION update_banword(b json) RETURNS void AS $$
	UPDATE "banword" SET
		"label"=b->>'label'
	WHERE "id"=(b->>'id')::int

$$ LANGUAGE sql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION insert_banword(b json) RETURNS void AS $$
	INSERT INTO "banword" (label) 
    VALUES (b->>'label')
$$ LANGUAGE sql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION delete_banword(int) RETURNS void AS $$
	DELETE FROM "banword" 
	WHERE "id"=$1
$$ LANGUAGE sql SECURITY DEFINER;

COMMIT;