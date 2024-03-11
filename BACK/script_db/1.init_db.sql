-- Dropping existing
DROP DATABASE IF EXISTS infinity_quiz;
DROP ROLE IF EXISTS admin_infinity_quiz;
DROP ROLE IF EXISTS api_infinity_quiz;

-- Creating roles for database usage
-- admin_infinity_quiz owns the database
-- api_infinity_quiz is the account used by our API to access the database
CREATE ROLE admin_infinity_quiz WITH LOGIN PASSWORD '{{ADMIN_PGPASSWORD}}';
CREATE ROLE api_infinity_quiz WITH LOGIN PASSWORD '{{API_PGPASSWORD}}';

-- Creating the database
CREATE DATABASE infinity_quiz OWNER admin_infinity_quiz;
