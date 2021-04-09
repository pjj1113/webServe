function con_code() {
  var verify = document.getElementById('check_img')
  verify.src = 'include/yzm.php?' + Math.random()
}

function con_code2() {
  var verify = document.getElementById('check_img2')
  verify.src = 'include/yzm.php?' + Math.random()
}

function changeselect1(locationid) {
  document.form1.ty.length = 0
  document.form1.ty.options[0] = new Option('-请选择-', '')
  for (i = 0; i < subcat.length; i++) {
    if (subcat[i][0] == locationid) {
      document.form1.ty.options[document.form1.ty.length] = new Option(subcat[i][1], subcat[i][2])
    }
  }
}

function checkData(formlist) {
  var RecordsCount = 0
  for (var i = 0; i < document.formlist.elements.length; i++) {
    var e = document.formlist.elements[i]
    if (e.name != 'all' && e.checked) RecordsCount++
  }

  if (!RecordsCount) {
    alert('你还没选择记录！')
    return false
  } else {
    if (confirm('即将操作所有选择的记录， 是否继续 ？')) {
      return true
    } else {
      return false
    }
  }
}
function CheckAll(formlist) {
  var val = document.formlist.all.checked
  for (var i = 0; i < document.formlist.elements.length; i++) {
    var e = document.formlist.elements[i]
    if (e.name != 'all') e.checked = val
  }
}

//去空格
function checkspace(checkstr) {
  var str = ''
  for (i = 0; i < checkstr.length; i++) {
    str = str + ' '
  }
  return str == checkstr
}
function check_orders(formlist) {
  if (checkspace(formlist.realname.value)) {
    alert('请输入联系人！')
    formlist.realname.focus()
    return false
  }

  if (checkspace(formlist.phone.value)) {
    alert('请输入手机号码！')
    formlist.phone.focus()
    return false
  }

  if (checkspace(formlist.email.value)) {
    alert('请输入电子邮件！')
    formlist.email.focus()
    return false
  }
  if (formlist.email.value.indexOf('@') == '-1' || formlist.email.value.indexOf('.') == '-1') {
    alert('请输入邮箱！')
    formlist.email.focus()
    return false
  }
  if (checkspace(formlist.message.value)) {
    alert('请输入描述！')
    formlist.message.focus()
    return false
  }
}

function check_pay(formlist) {
  if (checkspace(formlist.remark.value)) {
    alert('请填写汇款人，汇款银行，汇款金额，汇款时间，汇入的账号等信息。')
    formlist.remark.focus()
    return false
  }
}

function check_tel(formlist) {
  if (checkspace(formlist)) {
    alert('请输入手机号码')
    formlist.tel.focus()
    return false
  }

  var telcode = new RegExp(/^1[3,4,5,8]\d{9}$/)

  if (!formlist.match(telcode)) {
    alert('请输入正确的手机号!')
    return false
  }
}

function check_comment(formlist) {
  if (checkspace(formlist.message.value)) {
    alert('请输入内容！')
    formlist.message.focus()
    return false
  }
  if (checkspace(formlist.yzm.value)) {
    alert('请输入验证码！')
    formlist.yzm.focus()
    return false
  }
}

function check_search(formlist) {
  if (checkspace(formlist.key.value) || formlist.key.value == '服务直通车') {
    alert('请输入搜索关键字！')
    formlist.key.focus()
    return false
  }
}

function check_message(formlist) {
  if (checkspace(formlist.realname.value)) {
    alert('请输入您的姓名！')
    formlist.realname.focus()
    return false
  }
  if (checkspace(formlist.phone.value)) {
    alert('请输入您的电话！')
    formlist.phone.focus()
    return false
  }
  if (checkspace(formlist.email.value)) {
    alert('请输入您的邮箱！')
    formlist.email.focus()
    return false
  }
  if (checkspace(formlist.message.value)) {
    alert('请输入您的建议！')
    formlist.message.focus()
    return false
  }
}

function check_reg(formlist) {
  if (checkspace(formlist.username)) {
    alert('提示：请输入用户名！')
    formlist.username.focus()
    return false
  }

  if (checkspace(formlist.userpwd)) {
    alert('提示：请输入密码！')
    return false
  }

  if (checkspace(formlist.userpwd2)) {
    alert('提示：请输入确认密码！')
    return false
  }

  if (formlist.userpwd != formlist.userpwd2) {
    alert('提示：您两次输入的密码不一样，请检查后重新输入！')
    return false
  }

  if (checkspace(formlist.email)) {
    alert('提示：请输入邮箱！')
    return false
  }
  if (formlist.email.indexOf('@') == '-1' || formlist.email.indexOf('.') == '-1') {
    alert('提示：请输入正确的邮箱地址！')
    return false
  }
  return true
}

function check_login(formlist) {
  if (checkspace(formlist.username)) {
    alert('请输入用户名！')
    return false
  }
  if (checkspace(formlist.password)) {
    alert('请输入登录密码！')
    return false
  }
  return true
}

function check_findpwd(formlist) {
  if (checkspace(formlist.email.value)) {
    alert('提示：请输入邮箱！')
    formlist.email.focus()
    return false
  }
  if (formlist.email.value.indexOf('@') == '-1' || formlist.email.value.indexOf('.') == '-1') {
    alert('提示：请输入正确的邮箱地址！')
    formlist.email.focus()
    return false
  }
}

function check_changpwd(theForm) {
  if (checkspace(theForm.password.value)) {
    alert('请输入原密码！')
    theForm.password.focus()
    return false
  }
  if (checkspace(theForm.password1.value)) {
    alert('请输入新密码！')
    theForm.password1.focus()
    return false
  }
  if (checkspace(theForm.password2.value)) {
    alert('请确认新密码！')
    theForm.password2.focus()
    return false
  }
  if (theForm.password1.value != theForm.password2.value) {
    alert('确认密码错误！')
    theForm.password2.focus()
    return false
  }
}

function addCookie() {
  // 加入收藏
  if (document.all) {
    window.external.addFavorite('http://www.baidu.com', '鸿恒远景城市景观网')
  } else if (window.sidebar) {
    window.sidebar.addPanel('鸿恒远景城市景观网', 'http://www.baidu.com', '')
  }
}
