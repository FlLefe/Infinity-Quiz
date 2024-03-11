BEGIN;

CREATE OR REPLACE FUNCTION get_all_statistics() RETURNS SETOF "statistic" AS $$
    SELECT * FROM "statistic";
$$ LANGUAGE sql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION get_statistic_by_user_id(int) RETURNS "statistic" AS $$
	SELECT * FROM "statistic" WHERE user_id=$1;
$$ LANGUAGE sql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION insert_stat(s json) RETURNS void AS $$
    INSERT INTO "statistic" (user_id, prompt_tokens, response_tokens, total_tokens,
    prompt_price, response_price, total_price)
    SELECT
        (s->>'user_id')::INT,
        (s->>'promptTokens')::INT,
        (s->>'responseTokens')::INT,
        (s->>'totalTokens')::INT,
        (s->>'promptPrice')::DECIMAL(12, 6),
        (s->>'responsePrice')::DECIMAL(12, 6),
        (s->>'totalPrice')::DECIMAL(12, 6)
$$ LANGUAGE sql SECURITY DEFINER;

COMMIT;