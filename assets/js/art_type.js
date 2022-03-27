$(function () {
  var form = layui.form;
  var layer = layui.layer;
  initArtTypeList();
  function initArtTypeList() {
    // 展示用户信息
    $.ajax({
      url: '/my/article/cates',
      type: 'get',
      success: function (res) {
        if (res.status != 0) {
          return layer.alert(res.message);
        }
        var html = template('typeList', res.data);
        $('tbody').html(html);
      }
    });
  }
  var index = null;
  var indexEdit = null;
  // 添加文章类别
  $('#btnAdd').click(function () {
    index = layer.open({
      type: 1,
      area: ['500px', '300px'],
      title: '添加类别'
      , content: $('#artTypeAdd').html()
    });
  });
  // 确认添加
  $('body').on('submit', '#artType', function () {
    // 展示用户信息
    $.ajax({
      url: '/my/article/addcates',
      type: 'post',
      data: $('#artType').serialize(),
      success: function (res) {
        if (res.status != 0) {
          return layer.alert(res.message);
        }
        layer.msg(res.message)
        initArtTypeList();
        layer.close(index);
      }
    });
    return false;
  })
  // 编辑页面
  $('tbody').on('click', '.btn-edit', function () {
    indexEdit = layer.open({
      type: 1,
      area: ['500px', '300px'],
      title: '编辑类别'
      , content: $('#artTypeEdit').html()
    });
    var id = $(this).attr('data-id')
    // 获取用户信息
    $.ajax({
      url: '/my/article/cates/' + id,
      method: 'get',
      success: function (res) {
        if (res.status != 0) {
          return layer.alert(res.message);
        }
        console.log($('#artEdit'))
        form.val('artEdit', res.data)
        console.log(res.data)
      }
    });

  });
  // 确认更新
  $('body').on('submit', '#artEdit', function () {
    // 展示用户信息
    $.ajax({
      url: '/my/article/updatecate',
      type: 'post',
      data: $('#artEdit').serialize(),
      success: function (res) {
        if (res.status != 0) {
          return layer.alert(res.message);
        }
        layer.msg(res.message)
        initArtTypeList();
        layer.close(indexEdit);
      }
    });
    return false;
  })
  // 删除
  $('tbody').on('click', '.btn-del', function () {
    var id = $(this).attr('data-id');
    layer.confirm('确认要删除?', {icon: 3, title:'提示'}, function(index){
      //do something
      $.ajax({
        url: '/my/article/deletecate/' + id,
        type: 'get',
        success: function (res) {
          if (res.status != 0) {
            return layer.alert(res.message);
          }
          layer.msg(res.message)
          initArtTypeList();
          layer.close(index);
        }
      });
    });

  });
});