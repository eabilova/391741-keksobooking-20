'use strict';
(function () {
  var map = document.querySelector('.map');
  var mapPins = document.querySelector('.map__pins');
  var mainMapPin = mapPins.querySelector('.map__pin--main');
  var offerPins = window.data.getOffers();
  var fragment = document.createDocumentFragment();


  // Активация карты
  var activateMap = function () {
    map.classList.remove('map--faded');
    window.form.activate();
    addPinsOnMap();
    mainMapPin.removeEventListener('mousedown', onMainPinMouseDown);
    mainMapPin.removeEventListener('keydown', onMainPinKeyDown);
  };

  // Добавление пинов на карту
  var addPinsOnMap = function () {
    for (var n = 0; n < window.data.OFFER_NUMBER; n++) {
      fragment.appendChild(window.pin.render(offerPins[n]));
    }
    mapPins.appendChild(fragment);
  };

  // Обработчики событий
  var onMainPinMouseDown = function (evt) {
    if (evt.which === 1) {
      activateMap();
    }
  };

  var onMainPinKeyDown = function (evt) {
    if (evt.key === 'Enter') {
      activateMap();
    }
  };

  mainMapPin.addEventListener('mousedown', onMainPinMouseDown);
  mainMapPin.addEventListener('keydown', onMainPinKeyDown);

  // Объявление экспорта
  window.map = {
    element: map,
    pins: mapPins,
    mainPin: mainMapPin
  };
})();
