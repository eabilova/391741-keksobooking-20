'use strict';

var AVATARIMAGES = ['img/avatars/user01.png', 'img/avatars/user02.png', 'img/avatars/user03.png', 'img/avatars/user04.png', 'img/avatars/user05.png', 'img/avatars/user06.png', 'img/avatars/user07.png', 'img/avatars/user08.png'];
var CHECK_IN_OUT = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
// var TYPE = [{key: 'palace', value: 'Дворец'}, {key: 'flat', value: 'Квартира'}, {key: 'house', value: 'Дом'}, {key: 'bungalo', value: 'Бунгало'}];
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
  addCardsOnMap();
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

// Скрытие фих, которых нет в предложении
var hideUnusedFeatures = function (childrenElements, offerData) {
  for (var k = 0; k < FEATURES.length; k++) {
    var feature = offerData.offer.features;
    var featureCheck = childrenElements[k];
    if (!featureCheck.classList.contains('popup__feature--' + feature)) {
      featureCheck.classList.add('hidden');
    }
  }
};

// создание массива из объектов
var getOffers = function () {
  var offerArray = [];
  for (var i = 0; i < OFFER_NUMBER; i++) {
    offerArray[i] = createPinObject();
  }
  return offerArray;
};

// создание пинов
var offerPins = getOffers();
var pinTemplate = document.querySelector('#pin').content;

var renderPins = function (i) {
  var newOfferPin = pinTemplate.cloneNode(true);
  var pinButton = newOfferPin.querySelector('.map__pin');
  var pinButtonImage = pinButton.querySelector('img');
  pinButtonImage.src = offerPins[i].author.avatar;
  pinButtonImage.alt = offerPins[i].offer.title;
  pinButton.style.left = offerPins[i].location.x - (PIN_WIDTH / 2) + 'px';
  pinButton.style.top = offerPins[i].location.y - PIN_HEIGHT + 'px';

  pinButton.addEventListener('click', function () {
    addCardsOnMap(i);
  });

  return newOfferPin;
};

var createPins = function () {
  for (var n = 0; n < OFFER_NUMBER; n++) {
    fragment.appendChild(renderPins(n));
  }
};

// Добавление пинов на карту
var addPinsOnMap = function () {
  createPins();
  mapPins.appendChild(fragment);
};

// Создание карточек предложений
var createOfferCard = function (offerPin) {
  var cardTemplate = document.querySelector('#card').content;
  var newOfferCard = cardTemplate.cloneNode(true);
  var mapCard = newOfferCard.querySelector('.map__card');
  var offerFeatures = newOfferCard.querySelector('.popup__features');
  var offerFeature = offerFeatures.querySelectorAll('.popup__feature');
  var popPhotos = newOfferCard.querySelector('.popup__photos');

  mapCard.querySelector('.popup__avatar').src = offerPin.author.avatar;
  mapCard.querySelector('.popup__avatar').alt = offerPin.offer.title;
  mapCard.querySelector('.popup__title').textContent = offerPin.offer.title;
  mapCard.querySelector('.popup__text--address').textContent = offerPin.location.x + '-' + offerPin.location.y + ', ' + offerPin.offer.address;
  mapCard.querySelector('.popup__text--price').textContent = offerPin.offer.price + '₽/ночь';
  mapCard.querySelector('.popup__type').textContent = TYPE_DICTIONARY[offerPin.offer.type];
  mapCard.querySelector('.popup__text--capacity').textContent = offerPin.offer.rooms + ' комнаты для ' + offerPin.offer.guests + ' гостей.';
  mapCard.querySelector('.popup__text--time').textContent = 'Заезд после ' + offerPin.offer.checkin + ', выезд до ' + offerPin.offer.checkout;
  mapCard.querySelector('.popup__description').textContent = offerPin.offer.description;
  hideUnusedFeatures(offerFeature, offerPin);
  popPhotos.querySelector('img').src = offerPin.offer.photos;
  map.appendChild(newOfferCard);
};

// Добавление карточек предложений на карту
var addCardsOnMap = function (data) {
  createOfferCard(offerPins[data]);
};
