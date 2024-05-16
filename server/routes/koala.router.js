const express = require('express');
const koalaRouter = express.Router();
let koalaList = require('../modules/koalaList');
// DB CONNECTION


// GET
koalaRouter.get('/', (req,res) => {
console.log('GET request made for /koalas');
res.send(koalaList);
})

// POST
koalaRouter.post('/', (req, res) => {
    console.log('POST /koalas received a request');
    res.sendStatus(201);
});

// PUT


// DELETE

module.exports = koalaRouter;