'use strict';
(function () {
  var AVATARIMAGES = ['img/avatars/user01.png', 'img/avatars/user02.png', 'img/avatars/user03.png', 'img/avatars/user04.png', 'img/avatars/user05.png', 'img/avatars/user06.png', 'img/avatars/user07.png', 'img/avatars/user08.png'];
  var CHECK_IN_OUT = ['12:00', '13:00', '14:00'];
  var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var TYPE = ['palace', 'flat', 'house', 'bungalo'];
  var TYPE_DICTIONARY = {
    palace: 'Дворец',
    flat: 'Квартира',
    house: 'Дом',
    bungalo: 'Бунгало'
  };
  var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
  var TITLE = ['Уютное гнездышко для молодоженов', 'Красивое помещение для вечеринок', 'Жилье в самом центре Токио', 'Современное жилище со всеми удобствами'];
  var OFFER_NUMBER = 8;
  var PIN_HEIGHT = 70;
  var PIN_WIDTH = 50;
  var MAIN_PIN_WIDTH = 65;
  var MAIN_PIN_HEIGHT = 65;
  var PIN_TAIL_HEIGHT = 22;
  var PIN_POSITION_Y_START = 130;
  var PIN_POSITION_Y_FINISH = 630;
  var PIN_TITLES_ADJ = ['Красивая', 'Светлая', 'Чистая', 'Уютная', 'Недорогая', 'Просторная'];

  window.const = {
    AVATARIMAGES: AVATARIMAGES,
    CHECK_IN_OUT: CHECK_IN_OUT,
    FEATURES: FEATURES,
    TYPE: TYPE,
    TYPE_DICTIONARY: TYPE_DICTIONARY,
    PHOTOS: PHOTOS,
    TITLE: TITLE,
    OFFER_NUMBER: OFFER_NUMBER,
    PIN_HEIGHT: PIN_HEIGHT,
    PIN_WIDTH: PIN_WIDTH,
    MAIN_PIN_WIDTH: MAIN_PIN_WIDTH,
    MAIN_PIN_HEIGHT: MAIN_PIN_HEIGHT,
    PIN_TAIL_HEIGHT: PIN_TAIL_HEIGHT,
    PIN_POSITION_Y_START: PIN_POSITION_Y_START,
    PIN_POSITION_Y_FINISH: PIN_POSITION_Y_FINISH,
    PIN_TITLES_ADJ: PIN_TITLES_ADJ
  };
})();


// Изменение состояния карты и форм
window.toggleFormElement = function (element, isDisabled) {
  for (var i = 0; i < element.length; i++) {
    element[i].disabled = isDisabled;
  }
};
