BEGIN;

CREATE OR REPLACE FUNCTION update_timestamp()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_user_updated_at
BEFORE UPDATE ON "user"
FOR EACH ROW
EXECUTE FUNCTION update_timestamp();

CREATE TRIGGER update_quiz_updated_at
BEFORE UPDATE ON "quiz"
FOR EACH ROW
EXECUTE FUNCTION update_timestamp();

CREATE TRIGGER update_score_updated_at
BEFORE UPDATE ON "score"
FOR EACH ROW
EXECUTE FUNCTION update_timestamp();

CREATE TRIGGER update_question_updated_at
BEFORE UPDATE ON "question"
FOR EACH ROW
EXECUTE FUNCTION update_timestamp();

CREATE TRIGGER update_banword_updated_at
BEFORE UPDATE ON "banword"
FOR EACH ROW
EXECUTE FUNCTION update_timestamp();

CREATE TRIGGER update_statistic_updated_at
BEFORE UPDATE ON "statistic"
FOR EACH ROW
EXECUTE FUNCTION update_timestamp();

COMMIT;