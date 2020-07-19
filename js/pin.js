'use strict';
(function () {
  var PIN_HEIGHT = 70;
  var PIN_WIDTH = 50;

  var pinTemplate = document.querySelector('#pin').content;
  var clickedButton;

  // создание пинов и открытие карточек для каждого пина
  var renderPin = function (offerPin) {
    if (offerPin.hasOwnProperty('offer')) {
      var newOfferPinElement = pinTemplate.cloneNode(true);
      var pinButton = newOfferPinElement.querySelector('.map__pin');
      var pinButtonImage = pinButton.querySelector('img');
      pinButtonImage.src = offerPin.author.avatar;
      pinButtonImage.alt = offerPin.offer.title;
      pinButton.style.left = offerPin.location.x - (PIN_WIDTH / 2) + 'px';
      pinButton.style.top = offerPin.location.y - PIN_HEIGHT + 'px';
    }

    pinButton.addEventListener('click', function (evt) {
      if (pinButton !== clickedButton) {
        window.card.remove(evt.currentTarget);
        window.card.create(offerPin);
      }
      clickedButton = evt.currentTarget;
    });

    return newOfferPinElement;
  };

  // Подствечивание пина при активном состоянии
  var togglePinStatus = function (button) {
    var pins = document.querySelectorAll('.map__pin');
    pins.forEach(function (item) {
      if (item === button) {
        item.classList.add('map__pin--active');
      } else {
        item.classList.remove('map__pin--active');
      }
    });
  };

  // Объявление экспорта
  window.pin = {
    render: renderPin,
    toggleStatus: togglePinStatus
  };
})();
