'use strict';
(function () {
  var map = document.querySelector('.map');
  var mapPins = document.querySelector('.map__pins');
  var mainMapPin = mapPins.querySelector('.map__pin--main');
  var offerPins = window.data.getOffers();
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
    for (var n = 0; n < offerPins.length; n++) {
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

      if ((result.x < 0 && DragLimit.x.min <= positionHalfPin) || (result.x > 0 && DragLimit.x.max >= positionHalfPin)) {
        mainMapPin.style.left = (mainMapPin.offsetLeft - changedPosition.x) + 'px';
      }

      if ((positionFullHeightPin < DragLimit.y.max && DragLimit.y.min <= positionFullHeightPin) && (positionFullHeightPin > DragLimit.y.min && DragLimit.y.max >= positionFullHeightPin)) {
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
