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

  window.offerPins = getOffers();

  // создание пинов и открытие карточек для каждого пина
  var pinTemplate = document.querySelector('#pin').content;
  var clickedButton;

  window.renderPins = function (offerPin) {
    var newOfferPin = pinTemplate.cloneNode(true);
    var pinButton = newOfferPin.querySelector('.map__pin');
    var pinButtonImage = pinButton.querySelector('img');
    pinButtonImage.src = offerPin.author.avatar;
    pinButtonImage.alt = offerPin.offer.title;
    pinButton.style.left = offerPin.location.x - (window.const.PIN_WIDTH / 2) + 'px';
    pinButton.style.top = offerPin.location.y - window.const.PIN_HEIGHT + 'px';

    pinButton.addEventListener('click', function (evt) {
      if (pinButton !== clickedButton) {
        window.replaceOfferCard(offerPin);
      }
      clickedButton = evt.currentTarget;
    });

    return newOfferPin;
  };

  // Создание карточек предложений
  window.createOfferCard = function (offerPin) {
    var cardTemplate = document.querySelector('#card').content;
    var newOfferCard = cardTemplate.cloneNode(true);
    var mapCard = newOfferCard.querySelector('.map__card');
    var offerFeatures = newOfferCard.querySelector('.popup__features');
    var offerFeature = offerFeatures.querySelectorAll('.popup__feature');
    var popPhotos = newOfferCard.querySelector('.popup__photos');
    var closePopupButton = newOfferCard.querySelector('.popup__close');

    mapCard.querySelector('.popup__avatar').src = offerPin.author.avatar;
    mapCard.querySelector('.popup__avatar').alt = offerPin.offer.title;
    mapCard.querySelector('.popup__title').textContent = offerPin.offer.title;
    mapCard.querySelector('.popup__text--address').textContent = offerPin.location.x + '-' + offerPin.location.y + ', ' + offerPin.offer.address;
    mapCard.querySelector('.popup__text--price').textContent = offerPin.offer.price + '₽/ночь';
    mapCard.querySelector('.popup__type').textContent = window.const.TYPE_DICTIONARY[offerPin.offer.type];
    mapCard.querySelector('.popup__text--capacity').textContent = offerPin.offer.rooms + ' комнаты для ' + offerPin.offer.guests + ' гостей.';
    mapCard.querySelector('.popup__text--time').textContent = 'Заезд после ' + offerPin.offer.checkin + ', выезд до ' + offerPin.offer.checkout;
    mapCard.querySelector('.popup__description').textContent = offerPin.offer.description;
    window.hideUnusedFeatures(offerFeature, offerPin);
    popPhotos.querySelector('img').src = offerPin.offer.photos;
    window.mapClass.map.appendChild(mapCard);

    closePopupButton.addEventListener('click', function () {
      window.removeCard();
    });

    return mapCard;
  };
})();
