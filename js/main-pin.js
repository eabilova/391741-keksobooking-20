'use strict';
(function () {
  var DEFAULT_MAIN_PIN_LOCATION_X = 567;
  var DEFAULT_MAIN_PIN_LOCATION_Y = 375;
  var ENTER_KEY_CODE = 'Enter';

  var DragLimit = {
    X: {
      min: 0,
      max: 1200
    },
    Y: {
      min: 130,
      max: 630
    }
  };

  var mainMapPin = window.map.pinContainer.querySelector('.map__pin--main');
  var halfOfPinWidth = mainMapPin.offsetWidth / 2;
  var halfOfPinHeight = mainMapPin.offsetHeight / 2;

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
    if (evt.key === ENTER_KEY_CODE) {
      window.server.getInfo(window.map.activate, window.map.showErrorOnLoad);
    }
  };

  var onMainPinMouseDown = function (evt) {
    if (evt.which === window.main.LEFT_BUTTON_CODE) {
      window.server.getInfo(window.map.activate, window.map.showErrorOnLoad);
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

      if ((result.x < DragLimit.X.min && DragLimit.X.min <= Math.ceil(positionHalfPin)) || (result.x >= DragLimit.X.min && DragLimit.X.max >= positionHalfPin)) {
        mainMapPin.style.left = (mainMapPin.offsetLeft - changedPosition.x) + 'px';
      }

      if ((positionFullHeightPin <= DragLimit.Y.max && DragLimit.Y.min <= positionFullHeightPin) && (positionFullHeightPin >= DragLimit.Y.min && DragLimit.Y.max >= positionFullHeightPin)) {
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
    ENTER_KEY_CODE: ENTER_KEY_CODE,
    element: mainMapPin,
    halfOfPinWidth: halfOfPinWidth,
    halfOfPinHeight: halfOfPinHeight,
    activate: activateMainPin,
    deactivate: deactivateMainPin
  };
})();
