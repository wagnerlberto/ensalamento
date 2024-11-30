const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database.db');

db.serialize(() => {
  db.run(''+
    'CREATE TABLE IF NOT EXISTS matutino ('+
    '  id INTEGER PRIMARY KEY AUTOINCREMENT, '+
    '  sala TEXT'+
    ')');
});

const save = (sala) => new Promise((resolve, reject) => 
  db.run('INSERT INTO matutino (sala) VALUES (?)', 
         [sala], 
         (err) => err ? reject(err) : resolve()
        )
);

module.exports = {
  save
}
