'use strict';
(function () {
  var map = document.querySelector('.map');
  var mapPins = document.querySelector('.map__pins');
  var fragment = document.createDocumentFragment();

  // Вывод сообщения при ошибке загрузки данный из сервера
  var onLoadError = function (message) {
    createErrorMessage(message);
    var popUpMessage = document.querySelector('.error');
    document.addEventListener('keydown', window.main.onDocumentKeyDown(popUpMessage));
    document.addEventListener('mousedown', window.main.onDocumentMouseDown(popUpMessage));
  };

  // Создание сообщения
  var createErrorMessage = function (message) {
    var errorBox = document.createElement('div');
    errorBox.classList.add('error');
    var errorMessage = document.createElement('p');
    errorMessage.classList.add('error__message');
    errorMessage.textContent = message;
    window.main.element.appendChild(errorBox);
    errorBox.appendChild(errorMessage);
  };

  // Активация карты
  var activateMap = function (data) {
    map.classList.remove('map--faded');
    window.form.activate();
    addPinsOnMap(data);
    window.mainpin.activate();
  };

  // Добавление пинов на карту
  var addPinsOnMap = function (data) {
    data.forEach(function (item) {
      return fragment.appendChild(window.pin.render(item));
    });
    mapPins.appendChild(fragment);
  };

  // Деактивация карты
  var deactivateMap = function () {
    window.card.remove();
    removePinsFromMap();
    map.classList.add('map--faded');
    window.mainpin.deactivate();
  };

  // Удаление пинов с карты
  var removePinsFromMap = function () {
    var allMapPins = mapPins.querySelectorAll('.map__pin');
    allMapPins.forEach(function (item) {
      if (!item.classList.contains('map__pin--main')) {
        item.remove();
      }
    });
  };

  // Объявление экспорта
  window.map = {
    element: map,
    pins: mapPins,
    activate: activateMap,
    deactivate: deactivateMap,
    onLoadError: onLoadError
  };
})();
