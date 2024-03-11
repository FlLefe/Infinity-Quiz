import pkg from 'pg';
import { config } from 'dotenv';

config();

const { Pool } = pkg;
const {
  PGPORT, PGHOST, PGDATABASE, PGUSER, PGPASSWORD, ENDPOINT_ID,
} = process.env;

const connectionString = `postgresql://${PGUSER}:${PGPASSWORD}@${PGHOST}:${PGPORT}/${PGDATABASE}?sslmode=require&options=project=${ENDPOINT_ID}`;

const pool = new Pool({
  connectionString,
});

export default pool;
