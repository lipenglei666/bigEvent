$(function () {
  // 导入layer
  var layer = layui.layer;
  getUserInfo();

  // 退出
  $('#exit').click(function(){
    exit();
  })
  // 退出登录
  function exit(){
    layer.confirm('确定退出吗？',[3,'提示'],function(index){
      layer.close(index);
      localStorage.removeItem('token');
      location.href='login.html'
    })
  }

  // 获取用户信息
  function getUserInfo() {
    // 展示用户信息
    $.ajax({
      url: '/my/userinfo',
      type: 'get',
      // headers: {
      //   Authorization: localStorage['token']
      // },
      success: function (res) {
        if (res.status != 0) {
          return layer.alert(res.message);
        }
        rederUserInfo(res);
      }
    });
  }
  // 渲染用户信息
  function rederUserInfo(res) {
    var uname = res.data.nickname || res.data.username;
    $('.text-userName').html('欢迎&nbsp;&nbsp;' + uname);
    var imgSrc = res.data.user_pic;
    if (imgSrc) {
      $('.headImg').show();
      $('.headImg').attr('src',res.data.user_pic)
      $('.avatar').hide();
    } else {
      $('.headImg').hide();
      $('.avatar').show();
      var text_avatar = uname[0].toUpperCase();
      $('.text-avatar').html(text_avatar);
    }
  }
  window.getUserInfo = getUserInfo;

})
