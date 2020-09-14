import { Pool } from "pg";

const pool = new Pool({
  user: "postgres",
  password: "126923",
  host: "DESKTOP-2H6RFHP",
  port: 5432,
  database: "tcc-gamification",
});

// async function connect() {
//   try {
//     await pool.connect();
//     return pool;
//   } catch (e) {
//     console.error(`Failed to connect ${e}`);
//   }
// }

export { pool };
