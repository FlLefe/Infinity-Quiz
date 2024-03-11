BEGIN;

CREATE OR REPLACE FUNCTION get_user_all_scores(int) RETURNS SETOF "score" AS $$
    SELECT * FROM "score"
    WHERE "user_id" = $1
$$ LANGUAGE sql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION get_user_score(us json) RETURNS "score" AS $$
    SELECT * FROM "score"
    WHERE user_id = (us->>'user_id')::int 
    AND quiz_id = (us->>'quiz_id')::int
$$ LANGUAGE sql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION insert_score(s json) RETURNS void AS $$
    INSERT INTO "score" (user_id, quiz_id, score)
    VALUES (
        (s->>'user_id')::int,
        (s->>'quiz_id')::int,
        (s->>'score')::int
    )
$$ LANGUAGE sql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION update_score(s json) RETURNS void AS $$
	UPDATE "score" SET
        "score" = (s->>'score')::int
	WHERE "id" = (s->>'id')::int
$$ LANGUAGE sql SECURITY DEFINER;


COMMIT;