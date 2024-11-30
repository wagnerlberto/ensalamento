const express = require('express');
const { incluir, excluir } = require('./db');
const app = express();

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.get('/matutino/:id', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.post('/matutino', async (req, res) => {
  const { sala } = req.body;

  if(!sala) {
    res.status(400).send('Sala não informada');
    return;
  }

  await incluir(sala);
  res.send({ sala });
});

app.delete('/matutino', async (req, res) => {
  const { id } = req.body;

  if(!id) {
    res.status(400).send('ID não informado');
    return;
  }

  await excluir(id);
  res.send({ id });
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// curl --request POST \
//   --url http://localhost:3000/matutino \
//   --header 'Content-Type: application/x-www-form-urlencoded' \
//   --data sala=102
