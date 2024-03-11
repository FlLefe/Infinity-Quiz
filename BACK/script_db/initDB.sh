source ../.env

# # Execution of the database initialization script
# export PGUSER=$POSTGRES_PGUSER
# export PGPASSWORD=$POSTGRES_PGPASSWORD
# export PGPORT=$PGPORT

# cat 1.init_db.sql | sed "s|{{ADMIN_PGPASSWORD}}|$ADMIN_PGPASSWORD|g" | sed "s|{{API_PGPASSWORD}}|$API_PGPASSWORD|g" | psql -f -

# # Taking the identity of admin_infinity_quiz to execute the script (it will thus be OWNER of the tables)
# export PGUSER=$ADMIN_PGUSER
# export PGPASSWORD=$ADMIN_PGPASSWORD
# export PGDATABASE=$PGDATABASE

# # Execution of the table creation script
# psql -f 2.create_tables.sql 

# # Execution of the data seeding script
# psql -f 3.seed_db.sql

# # Execution of the functions script
# psql -f ./4.functions/banword.sql
# psql -f ./4.functions/quiz.sql
# psql -f ./4.functions/score.sql
# psql -f ./4.functions/user.sql
# psql -f ./4.functions/statistic.sql
# psql -f ./4.functions/globales.sql

node ./seedBanwords.js
