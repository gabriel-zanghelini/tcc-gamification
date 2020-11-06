const { Pool } = require("pg");
require("dotenv/config");

console.log("ENV", process.env.NODE_ENV, process.env.DATABASE_URL);
console.log("HEROKU", process.env.DATABASE_URL);
console.log(
  "PG_DATA:",
  process.env.USER,
  process.env.PASSWORD,
  process.env.HOST,
  process.env.PORT,
  process.env.DATABASE
);

const pool =
  process.env.NODE_ENV === "development"
    ? new Pool({
        user: process.env.USER,
        password: process.env.PASSWORD,
        host: process.env.HOST,
        port: process.env.PORT,
        database: process.env.DATABASE,
      })
    : new Pool({
        user: process.env.USER,
        password: process.env.PASSWORD,
        host: process.env.HOST,
        port: process.env.PORT,
        database: process.env.DATABASE,
        connectionString: process.env.DATABASE_URL,
      });

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
