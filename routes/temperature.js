var express = require('express');
var moment = require('moment');
var router = express.Router();

const db = require('../db');

router.use(function queryData (req, res, next) {
  const startTime = moment().add(-7, 'd').format('YYYY-MM-DDTHH:mm:ss');
  const sql = "SELECT (time) AS x, (temperature) AS y FROM temperature WHERE time >= $1";
  db.query(sql, [startTime], (err, result) => {
    if (err) {
      console.log(err.stack);
    } else {
      req.dataset = result.rows;
      next();
    }
  })
})

router.get('/', function (req, res) {
  res.render('temperature_chart', { title: 'Temperature chart', place: 'Kirkkonummi',
    dataset: req.dataset });
})

module.exports = router;
