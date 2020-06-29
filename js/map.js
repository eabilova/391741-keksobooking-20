'use strict';
(function () {
  var map = document.querySelector('.map');
  var mapPins = document.querySelector('.map__pins');
  var mainMapPin = mapPins.querySelector('.map__pin--main');

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
    window.form.new.classList.remove('ad-form--disabled');
    setAddress();
    window.main.toggle(window.filter.set, false);
    window.form.validateNumbers();
    window.form.validatePrice();
    window.main.toggle(window.form.new, false);
    window.pin.addPins();
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

  window.map = {
    element: map,
    pins: mapPins
  };
})();
