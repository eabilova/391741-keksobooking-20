'use strict';
(function () {
  // получение рандомной информации из массива (пока не понимаю откуда брать данные)
  var getRandomData = function (data) {
    var dataNumber = Math.floor(Math.random() * data.length);
    return data[dataNumber];
  };

  // создание рандомных чисел, тоже временные пока не узнаю откуда брать данные
  var getRandomNumber = function (min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  };

  // создание объекта
  var createPinObject = function () {
    return {
      author: {
        avatar: window.const.AVATARIMAGES.shift()
      },
      offer: {
        title: getRandomData(window.const.TITLE),
        address: 'Улица ' + getRandomData(window.const.PIN_TITLES_ADJ) + ', дом ' + getRandomNumber(1, 50) + ', кв. ' + getRandomNumber(1, 600),
        price: getRandomNumber(1000, 5000),
        type: getRandomData(window.const.TYPE),
        rooms: getRandomNumber(1, 4),
        guests: getRandomNumber(1, 4),
        checkin: getRandomData(window.const.CHECK_IN_OUT),
        checkout: getRandomData(window.const.CHECK_IN_OUT),
        features: getRandomData(window.const.FEATURES),
        description: getRandomData(window.const.TITLE),
        photos: getRandomData(window.const.PHOTOS)
      },
      location: {
        x: getRandomNumber(50, 1000),
        y: getRandomNumber(window.const.PIN_POSITION_Y_START, window.const.PIN_POSITION_Y_FINISH)
      }
    };
  };

  // создание массива из объектов
  var getOffers = function () {
    var offerArray = [];
    for (var i = 0; i < window.const.OFFER_NUMBER; i++) {
      offerArray[i] = createPinObject();
    }
    return offerArray;
  };

  window.data = {
    getOffers: getOffers
  };
})();
