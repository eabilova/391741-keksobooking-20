'use strict';
(function () {
  // получение рандомной информации из массива (пока не понимаю откуда брать данные)
  window.getRandomData = function (data) {
    var dataNumber = Math.floor(Math.random() * data.length);
    return data[dataNumber];
  };

  // создание рандомных чисел, тоже временные пока не узнаю откуда брать данные
  window.getRandomNumber = function (min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  };
})();
