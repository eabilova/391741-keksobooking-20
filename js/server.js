'use strict';

(function () {
  var getInfo = function () {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.open('GET', 'https://javascript.pages.academy/keksobooking/data', true);
    xhr.send();

    if (xhr.status != 200) {
      // обработать ошибку
      alert( xhr.status + ': ' + xhr.statusText ); // пример вывода: 404: Not Found
    } else {
      // вывести результат
      alert( xhr.responseText ); // responseText -- текст ответа.
    }
  };

  window.server = {
    getInfo: getInfo
  };
})();
