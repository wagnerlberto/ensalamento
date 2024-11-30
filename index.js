const express = require('express');
const { save } = require('./db');
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

  await save(sala);
  res.send({ sala });
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// curl --request POST \
//   --url http://localhost:3000/matutino \
//   --header 'Content-Type: application/x-www-form-urlencoded' \
//   --data sala=102
  