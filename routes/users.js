var express = require('express');
var router = express.Router();
var utils = require('../utils');

var db = require('./db') //引入数据库封装模块
/* GET users listing. */
router.post('/add', function (req, res, next) {
  //查询users表
  // console.log(userName,password , Email)
  console.log(req)
  let id = new Date().valueOf().toString()+parseInt(Math.random()*10000);
  let create_date= utils.parseTime(new Date(), '{y}-{m}-{d} {h}:{i}:{s}');
  let userName = '',password= '', Email='';
  req.body.userName ? userName = req.body.userName : '';
  req.body.password ? password = req.body.password : '';
  req.body.Email ? Email = req.body.Email : '';
  var sql = `INSERT INTO user (\`user_id\`, \`user_name\`, \`user_password\`, \`create_date\`,  \`Email\`) VALUES ('${ id }','${ userName }','${ password }','${ create_date }','${ Email }')`
  var sqlArr = []
  var callBack = (err, data) => {
    if (err) {
      console.log('连接错误', err)
    } else {
      res.send({
        code: 200,
        message:'添加成功'
      })
    }
  }
  db.sqlConnect(sql, sqlArr, callBack)
})

router.post('/update', function (req, res, next) {
  //查询users表
  var id = req.body.id;
  var password = req.body.password;
  var sql = `UPDATE user SET \`user_password\`='${ password }' WHERE \`user_id\`='${ id }';`
  //查询users表
  console.log(req.body)
  var sqlArr = []
  var callBack = (err, data) => {
    console.log(data)
    if (err) {
      console.log('连接错误', err)
    } else {
      res.send({
        code: 200,
        message:'修改密码成功'
      })
    }
  }
  db.sqlConnect(sql, sqlArr, callBack)
})

router.post('/login', function (req, res, next) {
  let userName = '',password= '';
  req.body.userName ? userName = req.body.userName : '';
  req.body.password ? password = req.body.password : '';
  var sqlArr = []
  db.sqlConnect(`SELECT * FROM user WHERE user_name='${ userName }';`, sqlArr,  (err, data) => {
    console.log(data)
    if(data.length) {
      if(data[0].user_password == password) {
        res.send({
          code: 200,
          message:'登陆成功'
        })
      } else {
        res.send({
          code: 400,
          message:'密码错误'
        })
      }
    } else {
      res.send({
        code: 400,
        message:'用户名不存在'
      })
    }
  })
})

module.exports = router;
