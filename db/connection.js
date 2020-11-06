const { Pool } = require("pg");
require("dotenv/config");

console.log(
  process.env.PG_USER,
  process.env.PG_PASSWORD,
  process.env.PG_HOST,
  process.env.PG_PORT,
  process.env.PG_DATABASE
);

const pool =
  process.env.NODE_ENV === "development"
    ? new Pool({
        user: process.env.PG_USER,
        password: process.env.PG_PASSWORD,
        host: process.env.PG_HOST,
        port: process.env.PG_PORT,
        database: process.env.PG_DATABASE,
      })
    : new Pool({ connectionString: process.env.DATABASE_URL });

// postgres://gafjlouxgkynoz:f4ed7bdb3fdc1c035d1a6398227fd187b99314f58a7745d18e095b809e5ae9f5@ec2-100-25-100-81.compute-1.amazonaws.com:5432/d6jro4q0k1cg7h

// async function connect() {
//   try {
//     await pool.connect();
//     return pool;
//   } catch (e) {
//     console.error(`Failed to connect ${e}`);
//   }
// }

module.exports = { pool };
