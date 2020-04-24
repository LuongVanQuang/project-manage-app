var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
    res.status(200).send({
        success: 'true',
        message: 'todos retrieved successfully',
        todos: 'db'
    })
});

module.exports = router;