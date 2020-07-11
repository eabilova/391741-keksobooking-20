'use strict';
(function () {
  var DEFAULT_MAIN_PIN_LOCATION_X = 567;
  var DEFAULT_MAIN_PIN_LOCATION_Y = 375;
  var map = document.querySelector('.map');
  var mapPins = document.querySelector('.map__pins');
  var mainMapPin = mapPins.querySelector('.map__pin--main');
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

  var onLoadError = function (message) {
    var errorBox = document.createElement('div');
    errorBox.classList.add('error');
    var errorMessage = document.createElement('div');
    errorMessage.classList.add('error__message');
    errorMessage.textContent = message;
    window.main.element.appendChild(errorBox);
    errorBox.appendChild(errorMessage);
    document.addEventListener('keydown', window.main.onDocumentKeyDown);
    document.addEventListener('mousedown', window.main.onDocumentKeyDown);
  };

  // Активация карты
  var activateMap = function (data) {
    map.classList.remove('map--faded');
    window.form.activate();
    addPinsOnMap(data);
    mainMapPin.removeEventListener('mousedown', onMainPinMouseDown);
    mainMapPin.removeEventListener('keydown', onMainPinKeyDown);
  };

  // Добавление пинов на карту
  var addPinsOnMap = function (data) {
    for (var n = 0; n < data.length; n++) {
      fragment.appendChild(window.pin.render(data[n]));
    }
    mapPins.appendChild(fragment);
  };

  // Деактивация карты
  var deactivateMap = function () {
    map.classList.add('map--faded');
    removePinsFromMap();
    window.card.replace();
    mainMapPin.style.left = DEFAULT_MAIN_PIN_LOCATION_X + 'px';
    mainMapPin.style.top = DEFAULT_MAIN_PIN_LOCATION_Y + 'px';
    mainMapPin.addEventListener('mousedown', onMainPinMouseDown);
    mainMapPin.addEventListener('keydown', onMainPinKeyDown);
  };

  // Удаление пинов с карты
  var removePinsFromMap = function () {
    var allMapPins = mapPins.querySelectorAll('.map__pin');
    for (var n = 0; n < allMapPins.length; n++) {
      if (!allMapPins[n].classList.contains('map__pin--main')) {
        allMapPins[n].remove();
      }
    }
  };

  // Функции для обработчиков событий
  var onMainPinKeyDown = function (evt) {
    if (evt.key === 'Enter') {
      window.server.getInfo(activateMap, onLoadError);
    }
  };

  var onMainPinMouseDown = function (evt) {
    if (evt.which === 1) {
      window.server.getInfo(activateMap, onLoadError);
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

  // Объявление экспорта
  window.map = {
    element: map,
    mainPin: mainMapPin,
    deactivate: deactivateMap,
    halfOfPinWidth: halfOfPinWidth,
    halfOfPinHeight: halfOfPinHeight
  };
})();
