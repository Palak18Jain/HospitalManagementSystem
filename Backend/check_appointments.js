import db from "./config/db.js";
import fs from "fs";

async function run() {
  try {
    const [rows] = await db.execute("SELECT * FROM appointments;");
    fs.writeFileSync("appointments_dump.json", JSON.stringify(rows, null, 2));
    console.log("Dumped to appointments_dump.json");
  } catch (e) {
    console.log(e.message);
  }
  process.exit(0);
}

run();
