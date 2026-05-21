import db from "./config/db.js";

async function run() {
  try {
    const [rows] = await db.execute("SHOW COLUMNS FROM users;");
    console.log("Columns:", JSON.stringify(rows, null, 2));
  } catch (e) {
    console.log("Error:", e.message);
  }
  process.exit(0);
}

run();
