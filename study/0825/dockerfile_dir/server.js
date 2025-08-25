const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello, Docker + Node.js!');
});

app.listen(port, () => {
  console.log(`íº€ Server running at http://localhost:${port}`);
});
