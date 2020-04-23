var express = require('express');
var router = express.Router();
var knex = require('../migrations/knex.js')
/* GET home page. */
router.get('/', function (req, res, next) {
  knex('users').insert({
    name: 'Slaughterhouse Five1',
  }).then(function () {
    res.render('index', {
      title: 'Test database successfully'
    });
  });
});

module.exports = router;