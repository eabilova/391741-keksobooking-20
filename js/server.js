'use strict';

(function () {
  var url = {
    getData: 'https://javascript.pages.academy/keksobooking/data',
    postData: 'https://javascript.pages.academy/keksobooking'
  };

  var xhrLoad = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      switch (xhr.status) {
        case 200:
          onSuccess(xhr.response);
          break;
        case 400:
          onError('Неверный запрос');
          break;
        case 401:
          onError('Пользователь не авторизован');
          break;
        case 404:
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
    var xhr = xhrLoad(onSuccess, onError);
    xhr.open('GET', url.getData);
    xhr.send();
  };

  var postInfo = function (data, onSuccess, onError) {
    var xhr = xhrLoad(onSuccess, onError);
    xhr.open('POST', url.postData);
    xhr.setRequestHeader('Content-Type', 'multipart/form-data');
    xhr.send(data);
  };


  window.server = {
    getInfo: getInfo,
    postInfo: postInfo
  };
})();
