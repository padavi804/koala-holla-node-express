const express = require('express');
// const koalaRouter = express.Router();
const router = express.Router();
// let koalaList = require('../modules/koalaList');
// DB CONNECTION
const pg = require('pg');

const pool = new pg.Pool({
    database: 'koalas',
    host: 'localhost',
    port: 5432
});

// GET
router.get('/', (req, res) => {
    let queryText = 'SELECT * FROM "koalas";';
    // send it to the database
    pool.query(queryText)
        .then((dbResult) => {
            // console.log('dbResult:', dbResult);
           
            let koalas = dbResult.rows;

            // send the client a response, based on the results.
            res.send(koalas);
        })
        .catch((dbError) => {
            // unpack the bad results
            console.log('dbError:', dbError);
            // send the client a response, based on the results.
            res.sendStatus(500);
        })
})

// OLD GET REQUEST
// koalaRouter.get('/', (req,res) => {
// console.log('GET request made for /koalas');
// res.send(koalaList);
// })

// POST
router.post('/', (req, res) => {
    let newKoala = req.body;
    let name = newKoala.name;
    let age = newKoala.age;
    let color = newKoala.color;
    let transfer = newKoala.transfer;
    let notes = newKoala.notes;

    let queryText = `INSERT INTO "koalas" ("name", "age", "color","transfer", "notes") 
VALUES ($1, $2, $3, $4, $5);`
pool.query(queryText, [name, age, color, transfer, notes])
        .then(dbResult => {
            // unpack the results
            console.log('dbResult.rows', dbResult.rows);
            // send the client a response, based on the results.
            res.sendStatus(201);
        })
        .catch(dbError => {
            // unpack the results
            console.log('dbError:', dbError);
            // send the client a response, based on the results.
            res.sendStatus(500);
        })
});

// // OLD POST REQUEST
// koalaRouter.post('/', (req, res) => {
//     console.log('POST /koalas received a request');
//     res.sendStatus(201);
// });

// PUT
router.put('/:id', (req, res) => {
    console.log(req.params);
    console.log(req.body);
    let idToupdate = req.params.id;
    let transfer = req.body.transfer;

    let queryText;
    if(transfer === true) {
        transfer = false;
        queryText = 'UPDATE "koalas" SET transfer=false WHERE id=$1;';
    }else if(transfer === false) {
        queryText = 'UPDATE "koalas" SET transfer=true WHERE id=$1;';
        transfer = true;
        res.sendStatus(400);
    }

    console.log('transfer after if:', transfer);

    pool.query(queryText, [idToupdate])
    .then(dbResult => {
        console.log(dbResult);
        res.sendStatus(200);
        
    })
    .catch(dbError => {
        console.log(dbError);
        res.sendStatus(500);
    })

});

//make this get rid of the button in client.js

// DELETE

module.exports = router;