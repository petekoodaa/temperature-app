var express = require('express');
var moment = require('moment');
var router = express.Router();

const db = require('../db');

const startTime = moment().add(-7, 'd').format('YYYY-MM-DDTHH:mm:ss');

router.use(function queryFmiData (req, res, next) {
  const sql = "SELECT (time) AS x, (temperature) AS y FROM temperature WHERE time >= $1 AND location = 'Kirkkonummi';"
  db.query(sql, [startTime], (err, result) => {
    if (err) {
      console.log(err.stack);
    } else {
      req.fmiDataset1 = result.rows;
      next();
    }
  })
})

router.use(function queryWarehouseData (req, res, next) {
  const sql = "SELECT (time) AS x, (temperature) AS y FROM temperature WHERE time >= $1 AND location = 'Varasto';"
  db.query(sql, [startTime], (err, result) => {
    if (err) {
      console.log(err.stack);
    } else {
      req.warehouseDataset = result.rows;
      next();
    }
  })
})

router.use(function queryWarehouseFreezerData (req, res, next) {
  const sql = "SELECT (time) AS x, (temperature) AS y FROM temperature WHERE time >= $1 AND location = 'Pakastin_varasto';"
  db.query(sql, [startTime], (err, result) => {
    if (err) {
      console.log(err.stack);
    } else {
      req.warehouseFreezerDataset = result.rows;
      next();
    }
  })
})


router.get('/', function (req, res) {
  res.render('temperature_chart', { title: 'Temperature chart', fmiLocation1: 'Kirkkonummi',
    fmiDataset1: req.fmiDataset1, warehouseDataset: req.warehouseDataset,
    warehouseFreezerDataset: req.warehouseFreezerDataset });
})

module.exports = router;
