-- Table creation
BEGIN;

-- Define domain for nickname
CREATE DOMAIN domain_nickname AS TEXT
CHECK (
   VALUE ~ '^[a-zA-Z0-9]{3,18}$' -- letters and digits / between 3 and 18 characters
);

-- Check for valid email
CREATE DOMAIN domain_mail AS TEXT
CHECK(
   VALUE ~ '^([-!#-''*+/-9=?A-Z^-~]+(\.[-!#-''*+/-9=?A-Z^-~]+)*|"([]!#-[^-~ \t]|(\\[\t -~]))+")@([0-9A-Za-z]([0-9A-Za-z-]{0,61}[0-9A-Za-z])?(\.[0-9A-Za-z]([0-9A-Za-z-]{0,61}[0-9A-Za-z])?)*|\[((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|IPv6:((((0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}):){6}|::((0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}):){5}|[0-9A-Fa-f]{0,4}::((0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}):){4}|(((0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}):)?(0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}))?::((0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}):){3}|(((0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}):){0,2}(0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}))?::((0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}):){2}|(((0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}):){0,3}(0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}))?::(0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}):|(((0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}):){0,4}(0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}))?::)((0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}):(0|[1-9A-Fa-f][0-9A-Fa-f]{0,3})|(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3})|(((0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}):){0,5}(0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}))?::(0|[1-9A-Fa-f][0-9A-Fa-f]{0,3})|(((0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}):){0,6}(0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}))?::)|(?!IPv6:)[0-9A-Za-z-]*[0-9A-Za-z]:[!-Z^-~]+)])$' 
);


CREATE TYPE public.enum_role AS ENUM
    ('member', 'admin');

CREATE TABLE IF NOT EXISTS public.user
(
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    email domain_mail UNIQUE NOT NULL,
    password TEXT NOT NULL,
    nickname domain_nickname UNIQUE NOT NULL,
    profile_picture TEXT NOT NULL DEFAULT 'profil_picture1.png',
    prompt INT NOT NULL DEFAULT 5, 
    role enum_role NOT NULL DEFAULT 'member',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS public.quiz
(
    id integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    theme TEXT NOT NULL,
    difficulty TEXT NOT NULL,
    rate INT NOT NULL DEFAULT 0,
    author_id INT REFERENCES public.user(id) ON DELETE CASCADE NOT NULL DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS public.score
(
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    score INT NOT NULL,
    user_id INT REFERENCES public.user(id) ON DELETE CASCADE NOT NULL,
    quiz_id INT REFERENCES public.quiz(id) ON DELETE CASCADE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT unique_user_quiz_combination UNIQUE (user_id, quiz_id)
);

CREATE TABLE IF NOT EXISTS public.question
(
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    label TEXT NOT NULL,
    good_answer TEXT NOT NULL,
    answer_1 TEXT NOT NULL,
    answer_2 TEXT NOT NULL,
    answer_3 TEXT NOT NULL,
    quiz_id INT REFERENCES public.quiz(id) ON DELETE CASCADE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS public.banword
(
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    label TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS public.statistic
(
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    prompt_tokens INT,
    response_tokens INT,
    total_tokens INT,
    prompt_price DECIMAL(12, 6),
    response_price DECIMAL(12, 6),
    total_price DECIMAL(12, 6),
    user_id INT REFERENCES public.user(id) ON DELETE CASCADE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_question_quiz_id ON public.question (quiz_id);

COMMIT;