$(function () {
  // 导入form
  var form = layui.form;
  var layer = layui.layer;
  // 自定义表单校验
  form.verify({
    nickname: [
      /^[\S]{1,6}$/
      , '用户昵称数字限制1-6'
    ]
  });
  var user = null;
  getUserInfo();
  // 重置
  $('#reset').click(function(){
    getUserInfo();
    return false;
  });
  // 提交
  $('#userInfo').on('submit',function(){
    updateUserInfo();
    return false;
  })
  // 获取用户信息
  function getUserInfo(){
    if(user==null){
      $.ajax({
        url:'/my/userinfo',
        type:'get',
        success:function(res){
          if(res.status!=0){
            return layer.msg(res.message);
          }
          user = res.data;
          form.val('formUserInfo',res.data)
        }
      })
    }else {
      form.val('formUserInfo',user)
    }
  }
  // 更新用户信息
  function updateUserInfo(){
    $.ajax({
      type:'post',
      url:'/my/userinfo',
      data:$('#userInfo').serialize(),
      success:function(res){
        if(res.status!=0){
          return layer.msg(res.message);
        }
        layer.msg(res.message);
        user=null;
        getUserInfo();
        window.parent.getUserInfo();
      }
    })
  }

});