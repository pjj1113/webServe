const nodeemailer = require('nodemailer')
const transporter = nodeemailer.createTransport({
  // host: 'smtp.qq.com', // QQ邮箱的SMTP地址
  // host: "smtp.163.com",						// 网易邮箱的SMTP地址
  host: "smtpdm.aliyun.com",// 阿里云的邮件地址
  port: 25, // 每个邮箱的端口号可能是一样的，一般都使用465，但有些公司使用的就不是465
  secureConnection: false, // 是否使用 SSL
  auth: {
    user: 'postmaster@plowpub.com', // 你自己的邮箱的邮箱地址
    pass: 'Qq123456', // 授权码（不是邮箱密码）
  },
})

module.exports.send = (mailOptions) => {
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      return console.log(error)
    }
  })
}
