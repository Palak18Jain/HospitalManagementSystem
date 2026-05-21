import db from "./config/db.js";

async function run() {
  try {
    const [rows] = await db.execute("SELECT id, docData FROM appointments ORDER BY id DESC LIMIT 1;");
    console.log("Found:", rows.length);
    if(rows.length > 0) {
      console.log("docData type:", typeof rows[0].docData);
      console.log("docData value:", rows[0].docData);
    }
  } catch (e) {
    console.log("Error:", e);
  }
  process.exit(0);
}

run();
