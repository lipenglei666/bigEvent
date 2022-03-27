$.ajaxPrefilter(function (options) {
  options.url = 'http://api-breakingnews-web.itheima.net' + options.url;
  //options.url = ' http://ajax.frontend.itheima.net' + options.url;

  if (options.url.indexOf('my') != -1) {
    options.headers = {
      Authorization: localStorage['token']
    };
  }

  options.complete = function (res) {
    var data = res.responseJSON;
    if (data.status == 1 && data.message == '身份认证失败！') {
      localStorage.removeItem('token');
      location.href = 'login.html';
    }

  }

})