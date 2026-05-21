  import db from "./config/db.js";

async function run() {
  try {
    const [rows] = await db.execute("SELECT * FROM appointments;");
    console.log(rows);
  } catch (e) {
    console.log(e.message);
  }
  process.exit(0);
}

run();
