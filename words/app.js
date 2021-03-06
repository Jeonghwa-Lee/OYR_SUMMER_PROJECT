//db 연결하는 파일
const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const data = fs.readFileSync('./database.json');
const conf = JSON.parse(data);
const mysql = require('mysql');

const connection = mysql.createConnection({
    host: conf.host,
    user: conf.user,
    password: conf.password,
    port: conf.port,
    database: conf.database,
});
connection.connect();

app.get('/api/words', (req, res) => {
    connection.query('SELECT * FROM words', (err, rows, fields) => {
        if (err) throw err;
        else {
            res.send(rows);
        }
    });
});

module.exports = app;
