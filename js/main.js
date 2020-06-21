'use strict';

var AVATARIMAGES = ['img/avatars/user01.png', 'img/avatars/user02.png', 'img/avatars/user03.png', 'img/avatars/user04.png', 'img/avatars/user05.png', 'img/avatars/user06.png', 'img/avatars/user07.png', 'img/avatars/user08.png'];
var CHECK_IN_OUT = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var TYPE = ['palace', 'flat', 'house', 'bungalo'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var TITLE = ['Уютное гнездышко для молодоженов', 'Красивое помещение для вечеринок', 'Жилье в самом центре Токио', 'Современное жилище со всеми удобствами'];
var OFFER_NUMBER = 8;
var PIN_HEIGHT = 70;
var PIN_WIDTH = 50;
var MAIN_PIN_WIDTH = 65;
var MAIN_PIN_HEIGHT = 65;
var PIN_TAIL_HEIGHT = 22;
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

// Присваивание значений типу помещения
var defineTypeOfBuilding = function (type) {
  var type = getRandomData(type);
  if (type === 'palace') {
    type = 'Дворец';
  } else if (type === 'flat') {
    type = 'Квартира';
  } else if (type === 'house') {
    type = 'Дом';
  } else if (type === 'bungalo') {
    type = 'Бунгало';
  }
  return type;
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
      type: defineTypeOfBuilding(TYPE),
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
      y: getRandomNumber(130, 630)
    }
  };
};

// Удаление ненужных фич из списка
var removeUnusedFeature = function (parentElement, childrenElements, offerData) {
  for (var k = 0; k < FEATURES.length; k++) {
    var feature = offerData.offer.features;
    if (FEATURES[k] !== feature) {
      if (FEATURES[k] === 'wifi') {
        parentElement.removeChild(childrenElements[0]);
      } else if (FEATURES[k] === 'dishwasher') {
        parentElement.removeChild(childrenElements[1]);
      } else if (FEATURES[k] === 'parking') {
        parentElement.removeChild(childrenElements[2]);
      } else if (FEATURES[k] === 'washer') {
        parentElement.removeChild(childrenElements[3]);
      } else if (FEATURES[k] === 'elevator') {
        parentElement.removeChild(childrenElements[4]);
      } else if (FEATURES[k] === 'conditioner') {
        parentElement.removeChild(childrenElements[5]);
      }
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

var createPins = function () {
  var pinTemplate = document.querySelector('#pin').content;
  for (var n = 0; n < OFFER_NUMBER; n++) {
    var newOfferPin = pinTemplate.cloneNode(true);
    var pinButton = newOfferPin.querySelector('.map__pin');
    var pinButtonImage = pinButton.querySelector('img');

    pinButtonImage.src = offerPins[n].author.avatar;
    pinButtonImage.alt = offerPins[n].offer.title;
    pinButton.style.left = offerPins[n].location.x - (PIN_WIDTH / 2) + 'px';
    pinButton.style.top = offerPins[n].location.y - PIN_HEIGHT + 'px';
    fragment.appendChild(newOfferPin);
  }
};

// Добавление пинов на карту
var addPinsOnMap = function () {
  createPins();
  mapPins.appendChild(fragment);
};

// Создание карточек предложений
var createOfferCard = function () {
  var cardTemplate = document.querySelector('#card').content;
  var newOfferCard = cardTemplate.cloneNode(true);
  var mapCard = newOfferCard.querySelector('.map__card');
  var offerFeatures = newOfferCard.querySelector('.popup__features');
  var offerFeature = newOfferCard.querySelectorAll('.popup__feature');
  var popPhotos = newOfferCard.querySelector('.popup__photos');

  mapCard.querySelector('.popup__avatar').src = offerPins[0].author.avatar;
  mapCard.querySelector('.popup__avatar').alt = offerPins[0].offer.title;
  mapCard.querySelector('.popup__title').textContent = offerPins[0].offer.title;
  mapCard.querySelector('.popup__text--address').textContent = offerPins[0].location.x + '-' + offerPins[0].location.y + ', ' + offerPins[0].offer.address;
  mapCard.querySelector('.popup__text--price').textContent = offerPins[0].offer.price + '₽/ночь';
  mapCard.querySelector('.popup__type').textContent = offerPins[0].offer.type;
  mapCard.querySelector('.popup__text--capacity').textContent = offerPins[0].offer.rooms + ' комнаты для ' + offerPins[0].offer.guests + ' гостей.';
  mapCard.querySelector('.popup__text--time').textContent = 'Заезд после ' + offerPins[0].offer.checkin + ', выезд до ' + offerPins[0].offer.checkout;
  mapCard.querySelector('.popup__description').textContent = offerPins[0].offer.description;
  removeUnusedFeature(offerFeatures, offerFeature, offerPins[0]);
  popPhotos.querySelector('img').src = offerPins[0].offer.photos;
  fragment.appendChild(newOfferCard);
};

// Добавление карточек предложений на карту
var addCardsOnMap = function () {
  createOfferCard();
  map.appendChild(fragment);
};
