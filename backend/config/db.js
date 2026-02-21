import { neon } from "@neondatabase/serverless";
import dotenv from "dotenv"; // We're going to be accessing some environment variables

dotenv.config();
const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD } = process.env;

// Creates a connection with database using environment variables
// sql will be used as a tagged template literal, which will allow us to write
// SQL queries safely
export const sql = neon(
  `postgresql://${PGUSER}:${PGPASSWORD}@${PGHOST}/${PGDATABASE}?sslmode=require&channel_binding=require`
);
