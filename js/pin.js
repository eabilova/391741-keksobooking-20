'use strict';
(function () {
  // создание объекта
  var createPinObject = function () {
    return {
      author: {
        avatar: window.const.AVATARIMAGES.shift()
      },
      offer: {
        title: window.getRandomData(window.const.TITLE),
        address: 'Улица ' + window.getRandomData(window.const.PIN_TITLES_ADJ) + ', дом ' + window.getRandomNumber(1, 50) + ', кв. ' + window.getRandomNumber(1, 600),
        price: window.getRandomNumber(1000, 5000),
        type: window.getRandomData(window.const.TYPE),
        rooms: window.getRandomNumber(1, 4),
        guests: window.getRandomNumber(1, 4),
        checkin: window.getRandomData(window.const.CHECK_IN_OUT),
        checkout: window.getRandomData(window.const.CHECK_IN_OUT),
        features: window.getRandomData(window.const.FEATURES),
        description: window.getRandomData(window.const.TITLE),
        photos: window.getRandomData(window.const.PHOTOS)
      },
      location: {
        x: window.getRandomNumber(50, 1000),
        y: window.getRandomNumber(window.const.PIN_POSITION_Y_START, window.const.PIN_POSITION_Y_FINISH)
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
  var offerPins = getOffers();

  window.pin = {
    offerPins: offerPins
  };
})();
