const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database.db');

db.serialize(() => {
  db.run(''+
    'CREATE TABLE IF NOT EXISTS matutino ('+
    '  id INTEGER PRIMARY KEY AUTOINCREMENT, '+
    '  sala TEXT'+
    ')'
  );
});

const incluir = (sala) => new Promise((resolve, reject) => 
  db.run('INSERT INTO matutino (sala) VALUES (?)', 
         [sala], 
         (err) => err ? reject(err) : resolve()
  )
);

const ler = () => new Promise((resolve, reject) =>
  db.get('SELECT * FROM matutino WHERE id = ?', 
         [id],
         (err, row) => err ? reject(err) : resolve(row)
  )
);

const alterar = (id, sala) => new Promise((resolve, reject) =>
  db.run('UPDATE matutino SET sala = ? WHERE id = ?',
         [sala, 
          id],
         (err) => err ? reject(err) : resolve()
  )
);

const excluir = (id) => new Promise((resolve, reject) =>
  db.run('DELETE FROM matutino WHERE id = ?',
    [id],
    (err) => err ? reject(err) : resolve()
  )
);

module.exports = {
  incluir, excluir
}
