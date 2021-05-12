$(function () {
  $('#wordnum1').blur(function () {
    var price1 = $('#wordnum1').val() * 0.06
    $('#result1').val(price1)
  })

  $('#wordnum2').blur(function () {
    var price2 = $('#wordnum2').val() * 0.075
    $('#result2').val(price2)
  })

  $('#wordnum3').blur(function () {
    var price3 = $('#wordnum3').val() * 1
    $('#result3').val(price3)
  })

  $('#wordnum4').blur(function () {
    var price4 = $('#wordnum4').val() * 0.03
    $('#result4').val(price4)
  })

  $('#wordnum5').blur(function () {
    var price5 = $('#wordnum5').val() * 0.7
    $('#result5').val(price5)
  })
})
