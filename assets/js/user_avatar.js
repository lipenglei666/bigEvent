$(function () {
  var layer = layui.layer;
  // 初始化图片裁剪功能
  // 1.1 获取裁剪区域的 DOM 元素
  var $image = $('#image')
  // 1.2 配置选项
  const options = {
    // 纵横比
    aspectRatio: 1,
    // 指定预览区域
    preview: '.img-preview'
  }

  // 1.3 创建裁剪区域
  $image.cropper(options);

  // 点击上传按钮选择文件
  $('#subImg').click(function () {
    $('#file').click();
  })
  // 文件选择控件发生改变时
  $('#file').change(function () {
    var files = this.files;
    if (files.length == 0) {
      return layer.msg('请选择一张图片')
    }
    var file = files[0];
    var newImgURL = URL.createObjectURL(file);
    $image
      .cropper('destroy')      // 销毁旧的裁剪区域
      .attr('src', newImgURL)  // 重新设置图片路径
      .cropper(options);      // 重新初始化裁剪区域
  })
  // 更新头像
  $('#subbtn').click(function () {
    var dataURL = $image
      .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
        width: 100,
        height: 100
      })
      .toDataURL('image/png');       // 将 Canvas 画布上的内容，转化为 base64 格式的字符串
      console.log(dataURL)
    //  发送更新请求
    $.ajax({
      type: 'post',
      url: '/my/update/avatar',
      data: {avatar:dataURL},
      success: function (res) {
        if (res.status != 0) {
          return layer.msg(res.message);
        }
        layer.msg(res.message);
        window.parent.getUserInfo();
      }
    })
  })
})