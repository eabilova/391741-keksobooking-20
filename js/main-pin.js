'use strict';
(function () {
  var DEFAULT_MAIN_PIN_LOCATION_X = 567;
  var DEFAULT_MAIN_PIN_LOCATION_Y = 375;
  var mainMapPin = window.map.pins.querySelector('.map__pin--main');
  var halfOfPinWidth = mainMapPin.offsetWidth / 2;
  var halfOfPinHeight = mainMapPin.offsetHeight / 2;
  var DragLimit = {
    x: {
      min: 0,
      max: 1200
    },
    y: {
      min: 130,
      max: 630
    }
  };

  var deactivateMainPin = function () {
    mainMapPin.removeEventListener('mousedown', onMainPinMouseDown);
    mainMapPin.removeEventListener('keydown', onMainPinKeyDown);
  };

  var activateMainPin = function () {
    mainMapPin.style.left = DEFAULT_MAIN_PIN_LOCATION_X + 'px';
    mainMapPin.style.top = DEFAULT_MAIN_PIN_LOCATION_Y + 'px';
    mainMapPin.addEventListener('mousedown', onMainPinMouseDown);
    mainMapPin.addEventListener('keydown', onMainPinKeyDown);
  };

  // Функции для обработчиков событий
  var onMainPinKeyDown = function (evt) {
    if (evt.key === 'Enter') {
      window.server.getInfo(window.map.activate, window.map.onLoadError);
    }
  };

  var onMainPinMouseDown = function (evt) {
    if (evt.which === 1) {
      window.server.getInfo(window.map.activate, window.map.onLoadError);
    }
  };

  // Обработчики событий
  mainMapPin.addEventListener('mousedown', onMainPinMouseDown);
  mainMapPin.addEventListener('keydown', onMainPinKeyDown);

  mainMapPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startPosition = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMainPinMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var changedPosition = {
        x: startPosition.x - moveEvt.clientX,
        y: startPosition.y - moveEvt.clientY
      };

      startPosition = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      var result = {
        x: mainMapPin.offsetLeft - changedPosition.x,
        y: mainMapPin.offsetTop - changedPosition.y
      };

      var positionHalfPin = result.x + halfOfPinWidth;
      var positionFullHeightPin = result.y + window.form.PIN_TAIL_HEIGHT + mainMapPin.offsetHeight;

      if ((result.x < 0 && DragLimit.x.min <= Math.ceil(positionHalfPin)) || (result.x >= 0 && DragLimit.x.max >= positionHalfPin)) {
        mainMapPin.style.left = (mainMapPin.offsetLeft - changedPosition.x) + 'px';
      }

      if ((positionFullHeightPin <= DragLimit.y.max && DragLimit.y.min <= positionFullHeightPin) && (positionFullHeightPin >= DragLimit.y.min && DragLimit.y.max >= positionFullHeightPin)) {
        mainMapPin.style.top = (mainMapPin.offsetTop - changedPosition.y) + 'px';
      }
    };

    var onMainPinMouseUp = function () {
      evt.preventDefault();
      window.form.setAddress(mainMapPin.offsetLeft, mainMapPin.offsetTop + halfOfPinHeight + window.form.PIN_TAIL_HEIGHT);

      document.removeEventListener('mousemove', onMainPinMouseMove);
      document.removeEventListener('mouseup', onMainPinMouseUp);
    };

    document.addEventListener('mousemove', onMainPinMouseMove);
    document.addEventListener('mouseup', onMainPinMouseUp);
  });

  window.mainPin = {
    element: mainMapPin,
    halfOfPinWidth: halfOfPinWidth,
    halfOfPinHeight: halfOfPinHeight,
    activate: activateMainPin,
    deactivate: deactivateMainPin
  };
})();
