'use strict';

var AVATARIMAGES = ['img/avatars/user01.png', 'img/avatars/user02.png', 'img/avatars/user03.png', 'img/avatars/user04.png', 'img/avatars/user05.png', 'img/avatars/user06.png', 'img/avatars/user07.png', 'img/avatars/user08.png'];
var CHECK_IN_OUT = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var TYPE = ['palace', 'flat', 'house', 'bungalo'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var OFFER_NUMBER = 8;
var PIN_HEIGHT = 70;
var PIN_WIDTH = 50;
var MAIN_PIN_WIDTH = 65;
var MAIN_PIN_HEIGHT = 65;
var PIN_TAIL_HEIGHT = 22;
var PIN_TITLES_ADJ = ['красивая', 'светлая', 'чистая', 'уютная', 'недорогая', 'просторная'];


var fragment = document.createDocumentFragment();
var map = document.querySelector('.map');
var mapFilters = document.querySelector('.map__filters');
var newForm = document.querySelector('.ad-form');
var mapPins = document.querySelector('.map__pins');

// Изменение состояния карты и форм
var toggleFormElement = function (element, isDisabled) {
  for (var i = 0; i < element.length; i++) {
    element[i].disabled = isDisabled;
  }
};

toggleFormElement(mapFilters, true);
toggleFormElement(newForm, true);

// Активация пина
var mainMapPin = mapPins.querySelector('.map__pin--main');

var onMainPinMouseDown = function (evt) {
  if (evt.which === 1) {
    activatePin();
  }
};

var onMainPinKeyDown = function (evt) {
  if (evt.key === 'Enter') {
    activatePin();
  }
};

mainMapPin.addEventListener('mousedown', onMainPinMouseDown);
mainMapPin.addEventListener('keydown', onMainPinKeyDown);

var activatePin = function () {
  map.classList.remove('map--faded');
  newForm.classList.remove('ad-form--disabled');
  setAddress();
  toggleFormElement(mapFilters, false);
  validateNumbers();
  toggleFormElement(newForm, false);
  addPinsOnMap();
  mainMapPin.removeEventListener('mousedown', onMainPinMouseDown);
  mainMapPin.removeEventListener('keydown', onMainPinKeyDown);
};

// Валидация соответствия количества комнат и гостей
var roomNumber = document.querySelector('#room_number');
var capacity = document.querySelector('#capacity');

var validateNumbers = function () {
  var capacityError = '';
  var roomNumberError = '';
  if ((Number(roomNumber.value) !== 100 && Number(capacity.value) !== 0) && (Number(capacity.value) > Number(roomNumber.value))) {
    capacityError = 'Число гостей не может превышать количество комнат. Выберите другое значение.';
    roomNumberError = 'Число комнат не может быть меньше количества гостей. Выберите другое значение.';
  }
  capacity.setCustomValidity(capacityError);
  roomNumber.setCustomValidity(roomNumberError);
};

roomNumber.addEventListener('change', function () {
  validateNumbers();
});
capacity.addEventListener('change', function () {
  validateNumbers();
});

// Определение начального положение главного пина
var myAddress = document.querySelector('#address');
var pinCenterPositionX = Math.round(mainMapPin.offsetLeft + MAIN_PIN_WIDTH / 2);
var pinCenterPositionY = Math.round(mainMapPin.offsetTop + MAIN_PIN_HEIGHT / 2);

var initialMainPinPosition = function () {
  myAddress.value = pinCenterPositionX + ', ' + pinCenterPositionY;
};
initialMainPinPosition();

// Определение положение главного пина после активации и смещения
var setAddress = function () {
  var newPinPositionY = Math.round(mainMapPin.offsetTop + MAIN_PIN_HEIGHT + PIN_TAIL_HEIGHT);
  myAddress.value = pinCenterPositionX + ', ' + newPinPositionY;
};

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
      title: getRandomData(PIN_TITLES_ADJ) + ' ' + getRandomData(TYPE),
      address: 'Улица' + getRandomData(PIN_TITLES_ADJ) + ', дом ' + getRandomNumber(1, 50) + ', кв. ' + getRandomNumber(1, 600),
      price: getRandomNumber(1000, 5000),
      type: getRandomData(TYPE),
      rooms: getRandomNumber(1, 4),
      guests: getRandomNumber(1, 4),
      checkin: getRandomData(CHECK_IN_OUT),
      checkout: getRandomData(CHECK_IN_OUT),
      features: getRandomData(FEATURES),
      description: getRandomData(PIN_TITLES_ADJ) + getRandomData(TYPE) + getRandomData(FEATURES) + ' и' + getRandomData(FEATURES),
      photos: getRandomData(PHOTOS)
    },
    location: {
      x: getRandomNumber(50, 1000),
      y: getRandomNumber(130, 630)
    }
  };
};

// создание массива из объектов
var getOffers = function () {
  var ownerArray = [];
  for (var i = 0; i < OFFER_NUMBER; i++) {
    ownerArray[i] = createPinObject();
  }
  return ownerArray;
};

// создание пинов
var createPins = function () {
  var pinTemplate = document.querySelector('#pin').content;
  var ownerPins = getOffers();
  for (var n = 0; n < OFFER_NUMBER; n++) {
    var newOwnerPin = pinTemplate.cloneNode(true);
    var pinButton = newOwnerPin.querySelector('.map__pin');
    var pinButtonImage = pinButton.querySelector('img');

    pinButtonImage.src = ownerPins[n].author.avatar;
    pinButtonImage.alt = ownerPins[n].offer.title;
    pinButton.style.left = ownerPins[n].location.x - (PIN_WIDTH / 2) + 'px';
    pinButton.style.top = ownerPins[n].location.y - PIN_HEIGHT + 'px';
    fragment.appendChild(newOwnerPin);
  }
};

// Добавление пинов на карту
var addPinsOnMap = function () {

  createPins();
  mapPins.appendChild(fragment);
};
