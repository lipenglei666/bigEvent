$(function () {
  // 导入form
  var form = layui.form;
  var layer=layui.layer;
  // 自定义表单校验
  form.verify({
    rePwd: [
      /^[\S]{6,12}$/
      , '密码长度6-12位，且不能有空格'
    ],
    samePwd:function(value){
      if(value==$('#oldPwd').val()){
        return '新密码不能与旧密码相同'
      }
    },
    surePwd:function(value){
      if(value!=$('#newPwd').val()){
        return '两次密码输入不一致'
      }
    }
  });

  $('#pwdInfo').submit(function(){
    $.ajax({
      url:'/my/updatepwd',
      type:'post',
      data:$('#pwdInfo').serialize(),
      success:function(res){
        if(res.status!=0){
          return layer.msg(res.message);
        }
        layer.msg(res.message);
      }
    })
    return false;
  })
})