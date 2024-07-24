'use strict';

const express = require('express');
const crypto = require('crypto');
const udRoute = express.Router();
const connection = require('../db');

udRoute.put('/api/:uid', function (req, res, next){
    connection.execute("UPDATE api_tbl SET title=?, author=?, published_year=?, genre=?, available=?, WHERE id=?; ",
        [req.body.title, req.body.author, req.body.published_year, req.body.genre, req.body.available, req.params.uid]
    ).then(() => {
        console.log('OK');
    }).catch((err) => {
        console.log(err);
    });
    res.status(200).send('Update Succesfully.'); 
});

udRoute.delete('/api/:uid', function (req, res, next){
    connection.execute("DELETE FROM api_tbl SET title=?, author=?, published_year=?, genre=?, available=?, WHERE id=?; ",
        [req.params.uid]
    ).then(() => {
        console.log('OK');
    }).catch((err) => {
        console.log(err);
    });
    res.end(); 
});

udRoute.post('/api/:uid', function (req, res, next){
    let mypass =
    crypto.createHash('md5').update(req.body.genre).digest("hex");
    connection.execute(`INSERT INTO api_tbl (title,author,published_year,genre,available)
        VALUES (?,?,?,?,?); `,
        [req.body.title, req.body.author, req.body.published_year, req.body.genre, req.body.available, 'NOW()']
    ).then(() => {
        console.log('OK');
    }).catch((err) => {
        console.log(err);
    });
    res.end(); 
});

udRoute.post('/api/:uid', function (req, res, next){
    let mypass =
    crypto.createHash('md5').update(req.body.genre).digest("hex");
    connection.execute('SELECT * FROM api_tbl WHERE title=? AND author=?;',
        [req.body.title, req.body.author]
    ).then((result) => {
        var data = result[0];
        if (data.length === 0){
            res.sendStatus(200);
        }else{
            res.sendStatus(400);
        }
    }).catch((err) => {
        console.log(err);
        res.sendStatus(404);
    });
});



module.exports = udRoute;