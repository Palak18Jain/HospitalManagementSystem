import db from "./config/db.js";

async function run() {
  try {
    await db.execute("ALTER TABLE doctors ADD COLUMN slots_booked JSON DEFAULT ('{}');");
    console.log("✅ Added 'slots_booked' column to doctors table");
  } catch (e) {
    console.log("⚠️ Failed to add slots_booked (it might already exist): " + e.message);
  }
  
  try {
    await db.execute(`
      CREATE TABLE IF NOT EXISTS appointments (
          id INT AUTO_INCREMENT PRIMARY KEY,
          user_id INT NOT NULL,
          doctor_id INT NOT NULL,
          slot_date VARCHAR(50) NOT NULL,
          slot_time VARCHAR(50) NOT NULL,
          amount DECIMAL(10,2) NOT NULL,
          date DATETIME NOT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log("✅ Created 'appointments' table");
  } catch (e) {
    console.log("⚠️ Failed to create appointments table: " + e.message);
  }
  process.exit(0);
}

run();
