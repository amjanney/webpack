const express = require('express');

const app = express();

app.get('/api/info', (req, res) => {
  res.json({
    name: 'janney',
  });
});

app.listen(3000);
