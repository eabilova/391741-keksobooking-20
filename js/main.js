'use strict';

var AVATAR = 'img/avatars/user';
var CHECK_IN_OUT = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var TYPE = ['palace', 'flat', 'house', 'bungalo'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var OFFER_NUMBER = 8;

var map = document.querySelector('.map');
map.classList.remove('map--faded');

var mapPins = document.querySelector('.map__pins');
var pinTemplate = document.querySelector('#pin').content;
var fragment = document.createDocumentFragment();

var getRandomData = function (data) {
  var dataNumber = Math.floor(Math.random() * data.length);
  return data[dataNumber];
};

var getRandomNumber = function (min, max) {
  var number = Math.floor(Math.random() * (max - min) + min);
  return number;
};

var createPinObject = function (ownerNumber) {
  var pin = {};
  pin.author = {};
  pin.author.avatar = AVATAR + '0' + ownerNumber + '.png';
  pin.offer = {};
  pin.offer.title = 'Название';
  pin.offer.address = 'место';
  pin.offer.price = getRandomNumber(1000, 5000);
  pin.offer.type = getRandomData(TYPE);
  pin.offer.rooms = getRandomNumber(1, 4);
  pin.offer.guests = getRandomNumber(1, 4);
  pin.offer.checkin = getRandomData(CHECK_IN_OUT);
  pin.offer.checkout = getRandomData(CHECK_IN_OUT);
  pin.offer.features = getRandomData(FEATURES);
  pin.offer.description = 'Текст';
  pin.offer.photos = getRandomData(PHOTOS);
  pin.location = {};
  pin.location.x = getRandomNumber(130, 630);
  pin.location.y = getRandomNumber(130, 630);
  return pin;
};

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

var createPins = function () {
  for (var n = 0; n < OFFER_NUMBER; n++) {
    var ownerPins = getOwnersArray();
    var newOwnerPin = pinTemplate.cloneNode(true);

    var pinButton = newOwnerPin.querySelector('.map__pin');
    pinButton.children[0].src = ownerPins[n].author.avatar;
    pinButton.children[0].alt = ownerPins[n].offer.title;
    pinButton.style.left = ownerPins[n].location.x + 'px';
    pinButton.style.top = ownerPins[n].location.y + 'px';
    fragment.appendChild(newOwnerPin);
  }
};

var addPinsOnMap = function () {
  createPins();
  mapPins.appendChild(fragment);
};

addPinsOnMap();
