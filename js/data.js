'use strict';
(function () {
  var AVATARIMAGES = ['img/avatars/user01.png', 'img/avatars/user02.png', 'img/avatars/user03.png', 'img/avatars/user04.png', 'img/avatars/user05.png', 'img/avatars/user06.png', 'img/avatars/user07.png', 'img/avatars/user08.png'];
  var TITLE = ['Уютное гнездышко для молодоженов', 'Красивое помещение для вечеринок', 'Жилье в самом центре Токио', 'Современное жилище со всеми удобствами'];
  var PIN_TITLES_ADJ = ['Красивая', 'Светлая', 'Чистая', 'Уютная', 'Недорогая', 'Просторная'];
  var TYPE = ['palace', 'flat', 'house', 'bungalo'];
  var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
  var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var CHECK_IN_OUT = ['12:00', '13:00', '14:00'];
  var PIN_POSITION_Y_START = 130;
  var PIN_POSITION_Y_FINISH = 630;
  var OFFER_NUMBER = 8;


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
        avatar: AVATARIMAGES.shift()
      },
      offer: {
        title: getRandomData(TITLE),
        address: 'Улица ' + getRandomData(PIN_TITLES_ADJ) + ', дом ' + getRandomNumber(1, 50) + ', кв. ' + getRandomNumber(1, 600),
        price: getRandomNumber(1000, 5000),
        type: getRandomData(TYPE),
        rooms: getRandomNumber(1, 4),
        guests: getRandomNumber(1, 4),
        checkin: getRandomData(CHECK_IN_OUT),
        checkout: getRandomData(CHECK_IN_OUT),
        features: getRandomData(FEATURES),
        description: getRandomData(TITLE),
        photos: getRandomData(PHOTOS)
      },
      location: {
        x: getRandomNumber(50, 1000),
        y: getRandomNumber(PIN_POSITION_Y_START, PIN_POSITION_Y_FINISH)
      }
    };
  };

  // создание массива из объектов
  var getOffers = function () {
    var offerArray = [];
    for (var i = 0; i < OFFER_NUMBER; i++) {
      offerArray[i] = createPinObject();
    }
    return offerArray;
  };

  // Объявление экспорта
  window.data = {
    getOffers: getOffers,
    OFFER_NUMBER: OFFER_NUMBER,
    FEATURES: FEATURES
  };
})();
