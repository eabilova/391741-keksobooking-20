'use strict';
(function () {
  var PIN_HEIGHT = window.mainPin.element.offsetHeight;
  var PIN_WIDTH = window.mainPin.element.offsetWidth;

  var pinTemplate = document.querySelector('#pin').content;
  var currentPin;

  // создание пинов и открытие карточек для каждого пина
  var renderPin = function (offerPin) {
    if (offerPin.hasOwnProperty('offer')) {
      var newOfferPin = pinTemplate.cloneNode(true);
      var pinButton = newOfferPin.querySelector('.map__pin');
      var pinButtonImage = pinButton.querySelector('img');
      pinButtonImage.src = offerPin.author.avatar;
      pinButtonImage.alt = offerPin.offer.title;
      pinButton.style.left = offerPin.location.x - (PIN_WIDTH / 2) + 'px';
      pinButton.style.top = offerPin.location.y - PIN_HEIGHT + 'px';
    }

    pinButton.addEventListener('click', function (evt) {
      if (pinButton !== currentPin) {
        window.card.remove();
        deselectPin();
        window.card.create(offerPin);
        currentPin = evt.currentTarget;
        currentPin.classList.add('map__pin--active');
      }
    });

    return newOfferPin;
  };

  // Удаление подсвечивания пина при неактивном состоянии
  var deselectPin = function () {
    if (currentPin) {
      currentPin.classList.remove('map__pin--active');
    }

    currentPin = null;
  };

  // Объявление экспорта
  window.pin = {
    render: renderPin,
    deselect: deselectPin
  };
})();
