var express = require('express');
var router = express.Router();
var utils = require('../utils');
const sendEmail = require('../utils/sendEmail.js');

var fs = require('fs');
var multer  = require('multer');
var path = require('path');


var db = require('./db') //引入数据库封装模块
/* GET users listing. */
router.post('/add', function (req, res, next) {
  //查询users表
  // console.log(userName,password , Email)
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
      let email = {
        title: 'You are welcome to use PlowPub! Activate your account now',
        body:`
        Please verify your email address to activate your account.
        Dear ${userName}:
        Thank you for registering a Plow Publishing account!  To activate your account, please click the button below to verify your email address.  
        Yes, this is my email address 
        Sincerely
        Plow Publishing
        Copyright  2021 PlowPub. all rights reserved. 
          `
        }
      let emailCotent = {
          from: 'postmaster@plowpub.com', // 发件人地址
          to: Email, // 收件人地址，多个收件人可以使用逗号分隔
          subject: email.title, // 邮件标题
          html: email.body // 邮件内容
        };
        sendEmail.send(emailCotent)
      res.send({
        code: 200,
        message:'添加成功'
      })
    }
  }
  db.sqlConnect(sql, sqlArr, callBack)
  // db.sqlConnect(`SELECT * FROM user WHERE user_name='${ userName }';`, sqlArr,  (err, data) => {
  //   if(data[0].user_name == userName) {
  //     res.send({
  //       code: 400,
  //       message:'该用户名已被注册'
  //     })
  //   } else {
     
  //   }
  // })
  
 
})

router.post('/update', function (req, res, next) {
  //查询users表
  var id = req.body.id;
  var password = req.body.password;
  var sql = `UPDATE user SET \`user_password\`='${ password }' WHERE \`user_id\`='${ id }';`
  //查询users表
  var sqlArr = []
  var callBack = (err, data) => {
    // console.log(data)
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
var upload = multer({dest: 'upload_tmp/'});

router.post('/upload', upload.any(), function(req, res, next) {
    console.log(req.files[0]);  // 上传的文件信息

    var des_file = "./upload/" + req.files[0].originalname;
    fs.readFile( req.files[0].path, function (err, data) {
        fs.writeFile(des_file, data, function (err) {
            if( err ){
                console.log( err );
            }else{
                response = {
                    message:'File uploaded successfully',
                    filename:req.files[0].originalname
                };
                console.log( response );
                res.end( JSON.stringify( response ) );
            }
        });
    });
});


// 上传文件发送邮件
router.post('/fend/email', function (req, res, next) {
  console.log(req.body)
  let email = {
    title: '',
    body:`
      <p>Select Journal or Author Services:</p>
      <p>Manuscript:${req.body.url_01}</p>
      <p>Supplementary:${req.body.url_02}</p>
      `
    }
  let emailCotent = {
      from: 'postmaster@plowpub.com', // 发件人地址
      to: '15705547960@163.com', // 收件人地址，多个收件人可以使用逗号分隔
      subject: email.title, // 邮件标题
      html: email.body // 邮件内容
    };
    sendEmail.send(emailCotent)
  res.send({
    code: 200,
    message:'发送成功'
  })
})
module.exports = router;
