$(function () {
  var form = layui.form;
  var layer = layui.layer;
  cateInit();
  // 初始化
  function cateInit() {
    $.ajax({
      url: '/my/article/cates',
      type: 'get',
      success: function (res) {
        if (res.status != 0) {
          return layer.alert(res.message);
        }
        console.log(res)
        var html = template('cateType', res);
        //console.log(html);
        $('.cate-box').html(html);
        form.render();
      }
    });
  }
  // 初始化富文本编辑器
  initEditor()
  // 裁剪
  // 1. 初始化图片裁剪器
  var $image = $('#image')

  // 2. 裁剪选项
  var options = {
    aspectRatio: 400 / 280,
    preview: '.img-preview'
  }

  // 3. 初始化裁剪区域
  $image.cropper(options)
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
   .cropper(options)        // 重新初始化裁剪区域
  });
  var art_status = '';
  // 发布
  $('#sub').click(function(){
    art_status = '已发布'
  });
  // 存为草稿
  $('#save').click(function(){
    art_status = '草稿'
  });
  // 表单提交时
  $('#article').on('submit',function(){
    var fd = new FormData($('#article')[0]);
    fd.append('state',art_status)
    $image
      .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
        width: 400,
        height: 280
      })
      .toBlob(function (blob) {       // 将 Canvas 画布上的内容，转化为文件对象
        // 得到文件对象后，进行后续的操作
        fd.append('cover_img',blob)
        // 发送请求，发布文章
        goAdd(fd);
      })
    
    return false;
  });

  function goAdd(fd){
    $.ajax({
      type:'post',
      url:'/my/article/add',
      data:fd,
      contentType:false,
      processData:false,
      success:function(res){
        if(res.status!=0){
          return layer.msg(res.message)
        }
        layer.msg(res.message);
      }
    })
  }
});