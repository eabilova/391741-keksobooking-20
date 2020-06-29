'use strict';
(function () {
  var map = document.querySelector('.map');
  var mapPins = document.querySelector('.map__pins');
  var mainMapPin = mapPins.querySelector('.map__pin--main');
  var myAddress = document.querySelector('#address');
  var pinCenterPositionX = Math.round(mainMapPin.offsetLeft + window.main.BIG_PIN_WIDTH / 2);
  var pinCenterPositionY = Math.round(mainMapPin.offsetTop + window.main.BIG_PIN_HEIGHT / 2);

  // Активация карты
  var activateMap = function () {
    map.classList.remove('map--faded');
    window.form.activate();
    window.pin.addPins();
    mainMapPin.removeEventListener('mousedown', onMainPinMouseDown);
    mainMapPin.removeEventListener('keydown', onMainPinKeyDown);
  };

  // Определение начального положение главного пина
  var initialMainPinPosition = function () {
    myAddress.value = pinCenterPositionX + ', ' + pinCenterPositionY;
  };
  initialMainPinPosition();

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
    mainPin: mainMapPin,
    address: myAddress,
    pinCenterPositionX: pinCenterPositionX,
    pinCenterPositionY: pinCenterPositionY
  };
})();
