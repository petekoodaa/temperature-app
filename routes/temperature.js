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

router.use(function queryFmiMax (req, res, next) {
  const sql = "SELECT MAX(temperature) FROM temperature WHERE time >= $1 AND location = 'Kirkkonummi';"
  db.query(sql, [startTime], (err, result) => {
    if (err) {
      console.log(err.stack);
    } else {
      req.kirkkonummiMax = result.rows[0].max;
      next();
    }
  })
})

router.use(function queryFmiMin (req, res, next) {
  const sql = "SELECT MIN(temperature) FROM temperature WHERE time >= $1 AND location = 'Kirkkonummi';"
  db.query(sql, [startTime], (err, result) => {
    if (err) {
      console.log(err.stack);
    } else {
      req.kirkkonummiMin = result.rows[0].min;
      next();
    }
  })
})


router.use(function queryFmiMean (req, res, next) {
  const sql = "SELECT AVG(temperature) FROM temperature WHERE time >= $1 AND location = 'Kirkkonummi';"
  db.query(sql, [startTime], (err, result) => {
    if (err) {
      console.log(err.stack);
    } else {
      req.kirkkonummiMean = Number(result.rows[0].avg).toFixed(2);
      next()
    }
  })
})

router.use(function queryWarehouseData (req, res, next) {
  sql = "SELECT (time) AS x, (temperature) AS y FROM temperature WHERE time >= $1 AND location = 'Varasto';"
  db.query(sql, [startTime], (err, result) => {
    if (err) {
      console.log(err.stack);
    } else {
      req.warehouseDataset = result.rows;
      next();
    }
  })
})

router.use(function queryWarehouseMax (req, res, next) {
  sql = "SELECT MAX(temperature) FROM temperature WHERE time >= $1 AND location = 'Varasto';"
  db.query(sql, [startTime], (err, result) => {
    if (err) {
      console.log(err.stack);
    } else {
      req.warehouseMax = result.rows[0].max;
      next();
    }
  })
})

router.use(function queryWarehouseMin (req, res, next) {
  sql = "SELECT MIN(temperature) FROM temperature WHERE time >= $1 AND location = 'Varasto';"
  db.query(sql, [startTime], (err, result) => {
    if (err) {
      console.log(err.stack);
    } else {
      req.warehouseMin = result.rows[0].min;
      next();
    }
  })
})

router.use(function queryWarehouseMean (req, res, next) {
  sql = "SELECT AVG(temperature) FROM temperature WHERE time >= $1 AND location = 'Varasto';"
  db.query(sql, [startTime], (err, result) => {
    if (err) {
      console.log(err.stack);
    } else {
      req.warehouseMean = Number(result.rows[0].avg).toFixed(2);
      next();
    }
  })
})

router.use(function queryFreezerData (req, res, next) {
  sql = "SELECT (time) AS x, (temperature) AS y FROM temperature WHERE time >= $1 AND location = 'Pakastin_varasto';"
  db.query(sql, [startTime], (err, result) => {
    if (err) {
      console.log(err.stack);
    } else {
      req.freezerDataset = result.rows;
      next();
    }
  })
})

router.use(function queryFreezerMax (req, res, next) {
  sql = "SELECT MAX(temperature) FROM temperature WHERE time >= $1 AND location = 'Pakastin_varasto';"
  db.query(sql, [startTime], (err, result) => {
    if (err) {
      console.log(err.stack);
    } else {
      req.freezerMax = result.rows[0].max;
      next();
    }
  })
})

router.use(function queryFreezerMin (req, res, next) {
  sql = "SELECT MIN(temperature) FROM temperature WHERE time >= $1 AND location = 'Pakastin_varasto';"
  db.query(sql, [startTime], (err, result) => {
    if (err) {
      console.log(err.stack);
    } else {
      req.freezerMin = result.rows[0].min;
      next();
    }
  })
})

router.use(function queryFreezerMean (req, res, next) {
  sql = "SELECT AVG(temperature) FROM temperature WHERE time >= $1 AND location = 'Pakastin_varasto';"
  db.query(sql, [startTime], (err, result) => {
    if (err) {
      console.log(err.stack);
    } else {
      req.freezerMean = Number(result.rows[0].avg).toFixed(2);
      next();
    }
  })
})


router.get('/', function (req, res) {
  res.render('temperature_chart', {
    title: 'Temperature chart',
    fmiDataset1: req.fmiDataset1,
    warehouseDataset: req.warehouseDataset,
    warehouseMax: req.warehouseMax,
    warehouseMin: req.warehouseMin,
    warehouseMean: req.warehouseMean,
    freezerDataset: req.freezerDataset,
    freezerMax: req.freezerMax,
    freezerMin: req.freezerMin,
    freezerMean: req.freezerMean,
    kirkkonummiMax: req.kirkkonummiMax,
    kirkkonummiMin: req.kirkkonummiMin,
    kirkkonummiMean: req.kirkkonummiMean,
  });
})

module.exports = router;
