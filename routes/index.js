var express = require('express')
var utils = require('../utils');
var router = express.Router()

var db = require('./db') //引入数据库封装模块

/* GET home page. */
// router.get('/*', function(req, res, next) {
//   res.sendfile(`${__dirname}/index.html`)
// });

module.exports = router
