const express = require('express');
const app = express();
const PORT = process.env.PORT || 5001;
const koalaRouter = require('./routes/koala.router');

app.use(express.json());
app.use(express.static('server/public'));

// ROUTES
app.use('/koalas', koalaRouter);

let koalaList = require('./modules/koalaList');

app.get('/koalas', (req, res) => {
  res.send(koalaList);
})

app.post('/koalas', (req, res) => {
  let newKoala = req.body;
  koalaList.push(newKoala);
  res.sendStatus(201);
})

// Start listening for requests on a specific port
app.listen(PORT, () => {
  console.log('listening on port', PORT);
});
