const Database = require('better-sqlite3');
const path = require('path');

// Connect to the database in the current directory
const dbPath = path.join(__dirname, 'sqlite.db');
console.log(`🔌 Connecting to database at: ${dbPath}`);
const db = new Database(dbPath);

console.log('🛠️  Running database fix...');

try {
  // 1. Create the table if it doesn't exist (Base Schema)
  db.exec(`
    CREATE TABLE IF NOT EXISTS notes (
      id TEXT PRIMARY KEY,
      title TEXT,
      content TEXT,
      created_at INTEGER,
      updated_at INTEGER
    )
  `);
  console.log('✅ Checked "notes" table existence.');

  // 2. Check and Add 'emoji' column
  try {
    db.prepare("SELECT emoji FROM notes LIMIT 1").get();
    console.log('ℹ️  Column "emoji" already exists.');
  } catch (err) {
    if (err.message.includes('no such column')) {
      db.prepare("ALTER TABLE notes ADD COLUMN emoji TEXT").run();
      console.log('✅ Added column "emoji".');
    }
  }

  // 3. Check and Add 'banner_url' column
  try {
    db.prepare("SELECT banner_url FROM notes LIMIT 1").get();
    console.log('ℹ️  Column "banner_url" already exists.');
  } catch (err) {
    if (err.message.includes('no such column')) {
      db.prepare("ALTER TABLE notes ADD COLUMN banner_url TEXT").run();
      console.log('✅ Added column "banner_url".');
    }
  }

  console.log('🎉 Database fixed successfully!');

} catch (error) {
  console.error('❌ Critical Error:', error.message);
}
