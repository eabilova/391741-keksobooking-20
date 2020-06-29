'use strict';
(function () {
  var fragment = document.createDocumentFragment();

  // Добавление пинов на карту
  var offerPins = window.data.getOffers();
  var addPinsOnMap = function () {
    createPins();
    window.map.pins.appendChild(fragment);
  };

  var createPins = function () {
    for (var n = 0; n < window.const.OFFER_NUMBER; n++) {
      fragment.appendChild(renderPins(offerPins[n]));
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
        window.card.replace(offerPin);
      }
      clickedButton = evt.currentTarget;
    });

    return newOfferPin;
  };

  window.pin = {
    addPins: addPinsOnMap
  };
})();