'use strict';
(function () {
  var fragment = document.createDocumentFragment();
  var map = document.querySelector('.map');
  var mapFilters = document.querySelector('.map__filters');
  var mapPins = document.querySelector('.map__pins');
  var mainMapPin = mapPins.querySelector('.map__pin--main');

  window.toggleFormElement(mapFilters, true);


  window.map = {
    map: map
  };

  // Активация карты
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
    window.form.newForm.classList.remove('ad-form--disabled');
    setAddress();
    window.toggleFormElement(mapFilters, false);
    window.validateNumbers();
    window.validateRoomTypeAndMinPrice();
    window.toggleFormElement(window.form.newForm, false);
    addPinsOnMap();
    mainMapPin.removeEventListener('mousedown', onMainPinMouseDown);
    mainMapPin.removeEventListener('keydown', onMainPinKeyDown);
  };

  // Определение начального положение главного пина
  var myAddress = document.querySelector('#address');
  var pinCenterPositionX = Math.round(mainMapPin.offsetLeft + window.const.MAIN_PIN_WIDTH / 2);
  var pinCenterPositionY = Math.round(mainMapPin.offsetTop + window.const.MAIN_PIN_HEIGHT / 2);

  var initialMainPinPosition = function () {
    myAddress.value = pinCenterPositionX + ', ' + pinCenterPositionY;
  };
  initialMainPinPosition();

  // Определение положение главного пина после активации и смещения
  var setAddress = function () {
    var newPinPositionY = Math.round(mainMapPin.offsetTop + window.const.MAIN_PIN_HEIGHT + window.const.PIN_TAIL_HEIGHT);
    myAddress.value = pinCenterPositionX + ', ' + newPinPositionY;
  };

  // Добавление пинов на карту
  var addPinsOnMap = function () {
    createPins();
    mapPins.appendChild(fragment);
  };

  var createPins = function () {
    for (var n = 0; n < window.const.OFFER_NUMBER; n++) {
      fragment.appendChild(renderPins(window.pin.offerPins[n]));
    }
  };

  // создание пинов и открытие карточек для каждого пина
  var pinTemplate = document.querySelector('#pin').content;
  var clickedButton;

  var renderPins = function (offerPin) {
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
})();
