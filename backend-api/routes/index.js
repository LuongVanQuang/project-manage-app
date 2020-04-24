var express = require('express');
var router = express.Router();
var knex = require('../knexModule.js')
/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {
      title: 'Test database successfully'
    });
});

module.exports = router;