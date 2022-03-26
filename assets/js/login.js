var api = 'http://api-breakingnews-web.itheima.net/';
$(function () {
  // 点击去登录
  $('#btn_reg').on('click', function () {
    $('.login-box').hide();
    $('.reg-box').show();
  });
  // 点击去注册
  $('#btn_login').on('click', function () {
    $('.reg-box').hide();
    $('.login-box').show();
  });
  // 导入form
  var form = layui.form;
  // 导入layer
  var layer = layui.layer;
  // 自定义表单校验
  form.verify({
    pwd: [
      /^[\S]{6,12}$/
      , '密码必须6到12位，且不能出现空格'
    ],
    repwd: function (value) {
      var pwd1 = $('.reg-box input[type=password]').val();
      if (pwd1 != value) {
        return '两次密码输入不一致'
      }
    }
  });
  // 注册
  $('#regForm').on('submit', function () {

    $.post('/api/reguser', {
      username: $('#regForm [name=username]').val(),
      password: $('#regForm [name=password]').val()
    }, function (res) {
      if (res.status != 0) {
        return layer.alert(res.message);
      }
      $('#regForm input').val('');
      $('#btn_login').click();
      return layer.alert('注册成功！请登录');
    })
    return false;
  });
  // 登录
  $('#loginForm').submit(function (e) {
    e.preventDefault();
    $.ajax({
      type: 'post',
      url:'/api/login',
      data: $('#loginForm').serialize(),
      success: function (res) {
        if (res.status != 0) {
          return layer.alert(res.message);
        }
        localStorage['token'] = res.token;
        location.href = './index.html'

      }
    })
    return false;
  })

})