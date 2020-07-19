'use strict';
(function () {
  var ERROR_LIST = {
    success: 200,
    badRequest: 400,
    unauthorized: 401,
    notFound: 404
  };
  var Url = {
    getData: 'https://javascript.pages.academy/keksobooking/data',
    postData: 'https://javascript.pages.academy/keksobooking'
  };

  var loadXhr = function (xhr, onSuccess, onError) {

    xhr.addEventListener('load', function () {
      switch (xhr.status) {
        case ERROR_LIST.success:
          onSuccess(xhr.response);
          break;
        case ERROR_LIST.badRequest:
          onError('Неверный запрос');
          break;
        case ERROR_LIST.unauthorized:
          onError('Пользователь не авторизован');
          break;
        case ERROR_LIST.notFound:
          onError('Ничего не найдено');
          break;
        default:
          onError('Cтатус ответа: : ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });
    xhr.timeout = 10000;
    return xhr;
  };

  var getInfo = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.open('GET', Url.getData);
    loadXhr(xhr, onSuccess, onError);
    xhr.send();
  };

  var postInfo = function (onSuccess, onError, data) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.open('POST', Url.postData);
    loadXhr(xhr, onSuccess, onError);
    xhr.send(data);
  };


  window.server = {
    getInfo: getInfo,
    postInfo: postInfo
  };
})();
