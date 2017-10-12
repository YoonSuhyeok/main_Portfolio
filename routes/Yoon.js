var express = require('express');
var router = express.Router();
var fs = require('fs');
var mysql = require('mysql');

var pool = mysql.createPool({
    host: 'localhost',
    user: 'guestmember',
    database: 'mysql',
    password: '1234'
});

/* GET home page. */
router.get('/', function (req, res, next) {

    pool.getConnection(function (err, connection) {
        // Use the connection
        connection.query('SELECT * FROM board', function (err, rows) {
            if (err) console.error("err : " + err);
            console.log("rows : " + JSON.stringify(rows));

            res.render('Yoon', { title: 'Yoon', rows: rows });
            connection.release();

            // Don't use the connection here, it has been returned to the pool.
        });
    });
});

router.get('/write_place', function (req, res, next) {
    res.render('write_place', { title: 'Yoon' });
});

router.post('/write', function (req, res, next) {

    var title_yoon = req.body.title_yoon;
    var author = req.body.author;
    var datas = [title_yoon, author];

    pool.getConnection(function (err, connection) {

        var sqlForInsertBoard = "insert into board(title, name) values(?,?)";
        connection.query(sqlForInsertBoard, datas, function (err, rows) {
            if (err) { console.error("err : " + err); }
            console.log("rows : " + JSON.stringify(rows));


            res.redirect('/Yoon');
            connection.release();
        });
    });
});

module.exports = router;
