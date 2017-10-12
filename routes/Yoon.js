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


/* GET users listing. */
router.get('/', function (req, res, next) {
    res.render('Yoon', { title: 'Yoon' });
});

router.post('/write', function (req, res, next) {

    var create_id = req.body.create_id;
    var author = req.body.author;
    var datas = [create_id, author];

    pool.getConnection(function (err, connection) {

        var sqlForInsertBoard = "insert into board(id, name) values(?,?)";
        connection.query(sqlForInsertBoard, datas, function (err, rows) {
            if (err) console.error("err : " + err);
            console.log("rows : " + JSON.stringify(rows));

            res.redirect('/Yoon');
            connection.release();

        });
    });
});

module.exports = router; 