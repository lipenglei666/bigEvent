$(function () {
  var form = layui.form;
  var layer = layui.layer;
  // 定义模版引擎时间格式化过滤器
  template.defaults.imports.dateFormat = function (date) {
    var date = new Date(date);
    var year = date.getFullYear();
    var month = paddZero(date.getMonth() + 1);
    var day = paddZero(date.getDate());
    var hours = paddZero(date.getHours());
    var minutes = paddZero(date.getMinutes());
    var seconds = paddZero(date.getSeconds());
    return year + '年' + month + '月' + day + '日' + ' ' + hours + ':' + minutes + ':' + seconds;
  }
  // 补零函数
  function paddZero(num) {
    return num < 10 ? '0' + num : num;
  }
  // 定义查询对象
  var query = {
    pagenum: 1,
    pagesize: 2,
    cate_id: '',
    state: ''
  }
  // 初始化文章列表
  initArtList();
  // 初始化文章分类
  initArtType();
  // 筛选查询
  $('#searchBtn').click(function () {
    query.pagenum = 1;
    query.state = $('#artState').val();
    query.cate_id = $('#selectCId').val();
    initArtList();
    return false;
  });
  // 删除文章
  $('tbody').on('click','.del-art',function(){
    var id = $(this).attr('data-id');
    layer.confirm('确定要删除吗?', {icon: 3, title:'提示'}, function(index){
      //do something
      $.ajax({
        url:'/my/article/delete/'+id,
        type:'get',
        success:function(res){
          if(res.status!=0){
            return layer.msg('删除文章失败');
          }
          layer.msg(res.message);
          var len = $('.del-art').length
          if(len==1){
            query.pagenum-=1;
            query.pagenum <=1?1:query.pagenum;
          }
          initArtList();
        }
      })
      layer.close(index);
    });
    return false;
  });

  // 初始化文章列表
  function initArtList() {
    $.ajax({
      url: '/my/article/list',
      type: 'get',
      data: query,
      success: function (res) {
        if (res.status != 0) {
          return layer.alert(res.message);
        }
        var html = template('articleList', res);
        $('tbody').html(html);
        // 渲染分页
        renderPage(res.total)
      }
    });
  }
  // 初始化文章类型
  function initArtType() {
    $.ajax({
      url: '/my/article/cates',
      type: 'get',
      success: function (res) {
        if (res.status != 0) {
          return layer.alert(res.message);
        }
        var html = template('cateType', res);
        //console.log(html);
        $('.cate-box').html(html);
        form.render();
      }
    });
  }
  // 渲染分页方法
  function renderPage(total) {
    layui.use('laypage', function () {
      var laypage = layui.laypage;

      //执行一个laypage实例
      laypage.render({
        elem: 'page_box' //注意，这里的 test1 是 ID，不用加 # 号
        , count: total //数据总数，从服务端得到
        , limit: query.pagesize
        , curr: query.pagenum
        ,jump: function(obj, first){
          //obj包含了当前分页的所有参数，比如：
          //console.log(obj.curr); //得到当前页，以便向服务端请求对应页的数据。
          //console.log(obj.limit); //得到每页显示的条数
          query.pagenum = obj.curr;
          query.pagesize = obj.limit;
          //首次不执行
          if(!first){
            initArtList();
          }
        }
        ,layout:['count','limit','prev','page','next','skip']
        ,limits:[2,5,10,15,20,30]
      });
    });
  }
})