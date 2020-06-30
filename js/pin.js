'use strict';
(function () {
  var pinTemplate = document.querySelector('#pin').content;
  var clickedButton;

  // создание пинов и открытие карточек для каждого пина
  var renderPins = function (offerPin) {
    var newOfferPin = pinTemplate.cloneNode(true);
    var pinButton = newOfferPin.querySelector('.map__pin');
    var pinButtonImage = pinButton.querySelector('img');
    pinButtonImage.src = offerPin.author.avatar;
    pinButtonImage.alt = offerPin.offer.title;
    pinButton.style.left = offerPin.location.x - (window.main.PIN_WIDTH / 2) + 'px';
    pinButton.style.top = offerPin.location.y - window.main.PIN_HEIGHT + 'px';

    pinButton.addEventListener('click', function (evt) {
      if (pinButton !== clickedButton) {
        window.card.replace(offerPin);
      }
      clickedButton = evt.currentTarget;
    });

    return newOfferPin;
  };

  // Объявление экспорта
  window.pin = {
    render: renderPins
  };
})();
