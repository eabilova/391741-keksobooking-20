'use strict';
(function () {
  var map = document.querySelector('.map');
  var mapPins = document.querySelector('.map__pins');
  var mainMapPin = mapPins.querySelector('.map__pin--main');
  var mapOverlay = map.querySelector('.map__overlay');
  var fragment = document.createDocumentFragment();
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

  var onSuccess = function (data) {
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

    var activateMap = function () {
      map.classList.remove('map--faded');
      window.form.activate();
      addPinsOnMap(data);
      mainMapPin.removeEventListener('mousedown', onMainPinMouseDown);
      mainMapPin.removeEventListener('keydown', onMainPinKeyDown);
    };

    mainMapPin.addEventListener('mousedown', onMainPinMouseDown);
    mainMapPin.addEventListener('keydown', onMainPinKeyDown);
  };

  var onError = function (message) {
    var errorMessage = document.createElement('div');
    errorMessage.textContent = message;
    errorMessage.style.color = '#ff0000';
    errorMessage.style.backgroundColor = '#ffffff';
    errorMessage.style.textAlign = 'center';
    errorMessage.style.fontSize = '20px';
    mapOverlay.appendChild(errorMessage);
  };

  window.server(onSuccess, onError);

  // Добавление пинов на карту
  var addPinsOnMap = function (data) {
    for (var n = 0; n < data.length; n++) {
      fragment.appendChild(window.pin.render(data[n]));
    }
    mapPins.appendChild(fragment);
  };

  // Обработчики событий
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

  // Объявление экспорта
  window.map = {
    element: map,
    mainPin: mainMapPin,
    halfOfPinWidth: halfOfPinWidth,
    halfOfPinHeight: halfOfPinHeight
  };
})();
