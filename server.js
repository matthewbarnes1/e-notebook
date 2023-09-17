const express = require('express');

const app = express();
const PORT = 3001;
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/pages/index.html');
});

app.get ('/notes', (req, res) => {
  res.sendFile(__dirname + '/public/pages/notes.html');
});


app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
  );


