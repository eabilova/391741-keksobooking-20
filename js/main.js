'use strict';

var AVATAR = 'img/avatars/user';
var CHECK_IN_OUT = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var TYPE = ['palace', 'flat', 'house', 'bungalo'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var OFFER_NUMBER = 8;
var PIN_HEIGHT = 70;
var PIN_WIDTH = 50;
var PIN_TITLES_ADJ = ['красивая', 'светлая', 'чистая', 'уютная', 'недорогая', 'просторная'];


var map = document.querySelector('.map');
map.classList.remove('map--faded');

var fragment = document.createDocumentFragment();

// получение рандомной информации из массива (пока не понимаю откуда брать данные)
var getRandomData = function (data) {
  var dataNumber = Math.floor(Math.random() * data.length);
  return data[dataNumber];
};

// создание рандомных чисел, тоже временные пока не узнаю откудать брать данные
var getRandomNumber = function (min, max) {
  var number = Math.floor(Math.random() * (max - min) + min);
  return number;
};

// создание объекта
var createPinObject = function (ownerNumber) {
  return {
    author: {
      avatar: AVATAR + '0' + ownerNumber + '.png'
    },
    offer: {
      title: PIN_TITLES_ADJ + getRandomData(TYPE),
      address: 'Улица' + getRandomData(PIN_TITLES_ADJ) + ', дом ' + getRandomNumber(1, 50) + 'б кв. ' + getRandomNumber(1, 600),
      price: getRandomNumber(1000, 5000),
      type: getRandomData(TYPE),
      rooms: getRandomNumber(1, 4),
      guests: getRandomNumber(1, 4),
      checkin: getRandomData(CHECK_IN_OUT),
      checkout: getRandomData(CHECK_IN_OUT),
      features: getRandomData(FEATURES),
      description: PIN_TITLES_ADJ + getRandomData(TYPE) + getRandomData(FEATURES) + ' и' + getRandomData(FEATURES),
      photos: getRandomData(PHOTOS)
    },
    location: {
      x: getRandomNumber(1, 1000),
      y: getRandomNumber(130, 630)
    }
  };
};

// создание массива из объектов
var getOwnersArray = function () {
  var ownerArray = [];
  var ownerNumber;
  for (var i = 0; i < OFFER_NUMBER; i++) {
    ownerNumber = i + 1;
    var owner = createPinObject(ownerNumber);
    ownerArray[i] = owner;
  }
  return ownerArray;
};

// создание пинов
var createPins = function () {
  var pinTemplate = document.querySelector('#pin').content;
  var ownerPins = getOwnersArray();
  for (var n = 0; n < OFFER_NUMBER; n++) {
    var newOwnerPin = pinTemplate.cloneNode(true);
    var pinButton = newOwnerPin.querySelector('.map__pin');

    pinButton.children[0].src = ownerPins[n].author.avatar;
    pinButton.children[0].alt = ownerPins[n].offer.title;
    pinButton.style.left = ownerPins[n].location.x - (PIN_WIDTH / 2) + 'px';
    pinButton.style.top = ownerPins[n].location.y - PIN_HEIGHT + 'px';
    fragment.appendChild(newOwnerPin);
  }
};

// Добавлеение пинов на карту
var addPinsOnMap = function () {
  var mapPins = document.querySelector('.map__pins');
  createPins();
  mapPins.appendChild(fragment);
};

addPinsOnMap();
