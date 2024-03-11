BEGIN;

CREATE OR REPLACE FUNCTION get_all_quiz() RETURNS SETOF "quiz" AS $$
    SELECT * FROM "quiz";
$$ LANGUAGE sql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION get_quiz_with_data(p_quiz_id INT)
RETURNS TABLE (
    quiz_id INT,
    theme TEXT,
    difficulty TEXT,
    rate INT,
    author_nickname TEXT,
    author_profile_picture TEXT,
    questions JSON
) AS $$
BEGIN
    RETURN QUERY 
    SELECT
        quiz.id AS quiz_id,
        quiz.theme,
        quiz.difficulty,
        quiz.rate,
        u.nickname::text AS author_nickname,
        u.profile_picture AS author_profile_picture,
        json_agg(
            json_build_object(
                'label', q.label,
                'answers', json_build_object(
                    'good_answer', q.good_answer,
                    'answer_1', q.answer_1,
                    'answer_2', q.answer_2,
                    'answer_3', q.answer_3
                )
            )
        ) AS questions
    FROM 
        "quiz" 
    JOIN 
        "user" AS u ON quiz.author_id = u.id
    JOIN 
        "question" AS q ON quiz.id = q.quiz_id
    WHERE
        quiz.id = p_quiz_id
    GROUP BY
        quiz.id,
        u.nickname,
        u.profile_picture;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION get_quiz_with_data_by_user(p_quiz_id INT, userId INT)
RETURNS TABLE (
    quiz_id INT,
    theme TEXT,
    difficulty TEXT,
    rate INT,
    author_nickname TEXT,
    author_profile_picture TEXT,
    score INT,
    questions JSON
) AS $$
BEGIN
    RETURN QUERY 
    SELECT
        quiz.id AS quiz_id,
        quiz.theme,
        quiz.difficulty,
        quiz.rate,
        u.nickname::text AS author_nickname,
        u.profile_picture AS author_profile_picture,
        s.score AS score,
        json_agg(
            json_build_object(
                'label', q.label,
                'answers', json_build_object(
                    'good_answer', q.good_answer,
                    'answer_1', q.answer_1,
                    'answer_2', q.answer_2,
                    'answer_3', q.answer_3
                )
            )
        ) AS questions
    FROM 
        "quiz" 
    JOIN 
        "user" AS u ON quiz.author_id = u.id
    JOIN 
        "question" AS q ON quiz.id = q.quiz_id
    LEFT JOIN
        "score" AS s ON quiz.id = s.quiz_id AND s.user_id = userId
    WHERE
        quiz.id = p_quiz_id
    GROUP BY
        quiz.id,
        u.nickname,
        u.profile_picture,
        s.score;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;


CREATE OR REPLACE FUNCTION get_top_5_quiz_with_data()
RETURNS TABLE (
    quiz_id INT,
    theme TEXT,
    difficulty TEXT,
    rate INT,
    author_nickname TEXT,
    author_profile_picture TEXT
) AS $$
BEGIN
    RETURN QUERY 
    SELECT
        quiz.id AS quiz_id,
        quiz.theme,
        quiz.difficulty,
        quiz.rate,
        u.nickname::text AS author_nickname,
        u.profile_picture AS author_profile_picture
    FROM 
        "quiz" 
    JOIN 
        "user" AS u ON quiz.author_id = u.id
    ORDER BY rate DESC, theme ASC, difficulty ASC
    LIMIT 5;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;


CREATE OR REPLACE FUNCTION get_one_of_top_5_quiz_with_data(top_number INT)
RETURNS TABLE (
    quiz_id INT,
    theme TEXT,
    difficulty TEXT,
    rate INT,
    author_nickname TEXT,
    author_profile_picture TEXT,
    questions JSON
) AS $$
BEGIN
    RETURN QUERY 
    SELECT
        quiz.id AS quiz_id,
        quiz.theme,
        quiz.difficulty,
        quiz.rate,
        u.nickname::text AS author_nickname,
        u.profile_picture AS author_profile_picture,
        json_agg(
            json_build_object(
                'label', q.label,
                'answers', json_build_object(
                    'good_answer', q.good_answer,
                    'answer_1', q.answer_1,
                    'answer_2', q.answer_2,
                    'answer_3', q.answer_3
                )
            )
        ) AS questions
    FROM 
        "quiz" 
    JOIN 
        "user" AS u ON quiz.author_id = u.id
    JOIN 
        "question" AS q ON quiz.id = q.quiz_id
    GROUP BY
        quiz.id,
        quiz.theme,
        quiz.difficulty,
        quiz.rate,
        u.nickname,
        u.profile_picture    
    ORDER BY rate DESC, theme ASC, difficulty ASC
    LIMIT 1 OFFSET top_number - 1;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;


CREATE OR REPLACE FUNCTION get_all_quiz_with_data_and_scores(INT)
RETURNS TABLE (
    quiz_id INT,
    theme TEXT,
    difficulty TEXT,
    rate INT,
    author_nickname TEXT,
    author_profile_picture TEXT,
    score INT
) AS $$
BEGIN
    RETURN QUERY 
    SELECT
        q.id AS quiz_id,
        q.theme,
        q.difficulty,
        q.rate,
        u.nickname::text AS author_nickname,
        u.profile_picture AS author_profile_picture,
        s.score AS score
    FROM 
        "quiz" AS q
    JOIN 
        "user" AS u ON q.author_id = u.id
    LEFT JOIN
        "score" AS s ON q.id = s.quiz_id AND s.user_id = $1
    ORDER BY rate DESC;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION update_quiz_admin(q json) RETURNS void AS $$
	UPDATE "quiz" SET
        "theme" = q->>'theme',
		"difficulty" = q->>'difficulty',
		"rate" = (q->>'rate')::int,
		"author_id" = (q->>'author_id')::int
	WHERE "id" = (q->>'id')::int
$$ LANGUAGE sql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION get_quiz(int) RETURNS "quiz" AS $$
	SELECT * FROM "quiz" WHERE id=$1;
$$ LANGUAGE sql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION delete_quiz_admin(int) RETURNS void AS $$
	DELETE FROM "quiz" 
	WHERE "id"=$1
$$ LANGUAGE sql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION insert_quiz(q json) RETURNS SETOF "quiz" AS $$
	INSERT INTO "quiz" (theme, difficulty, rate, author_id) 
    VALUES (
		q->>'theme',
		q->>'difficulty',
		(q->>'rate')::int,
        (q->>'author_id')::int)
	RETURNING *;
$$ LANGUAGE sql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION insert_questions(questions json[]) RETURNS void AS $$
DECLARE
    question_record json;
BEGIN
    -- Loop through each element of the JSON array
    FOREACH question_record IN ARRAY questions
    LOOP
        -- Insert each question into the 'question' table.
        INSERT INTO "question" (label, good_answer, answer_1, answer_2, answer_3, quiz_id) 
        VALUES (
            question_record->>'label',
            question_record->>'good_answer',
            question_record->>'answer_1',
            question_record->>'answer_2',
            question_record->>'answer_3',
            (question_record->>'quiz_id')::int
            );
    END LOOP;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION update_rate(operator text, q_id int) 
RETURNS void
AS $$
BEGIN
    UPDATE "quiz" SET
        "rate" = CASE WHEN operator = '+' THEN "rate" + 1
                      WHEN operator = '-' THEN "rate" - 1
                      ELSE "rate" END
    WHERE "id" = q_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;


COMMIT;