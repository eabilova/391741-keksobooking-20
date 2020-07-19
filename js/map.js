'use strict';
(function () {
  var map = document.querySelector('.map');
  var mapPinElement = document.querySelector('.map__pins');
  var fragment = document.createDocumentFragment();
  var availableOffers;

  // Вывод сообщения при ошибке загрузки данный из сервера
  var showErrorOnLoad = function (message) {
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
    availableOffers = data;
    map.classList.remove('map--faded');
    window.filter.renderData();
    window.form.activate(data);
    window.mainPin.deactivate();
  };

  var getData = function () {
    return availableOffers;
  };

  // Добавление пинов на карту
  var addPinsOnMap = function (offers) {
    offers.forEach(function (item) {
      return fragment.appendChild(window.pin.render(item));
    });
    mapPinElement.appendChild(fragment);
  };

  // Деактивация карты
  var deactivateMap = function () {
    window.card.remove();
    removePinsFromMap();
    map.classList.add('map--faded');
    window.mainPin.activate();
  };

  // Удаление пинов с карты
  var removePinsFromMap = function () {
    var allMapPins = mapPinElement.querySelectorAll('.map__pin');
    allMapPins.forEach(function (item) {
      if (!item.classList.contains('map__pin--main')) {
        item.remove();
      }
    });
  };


  // Объявление экспорта
  window.map = {
    element: map,
    pinElement: mapPinElement,
    getData: getData,
    activate: activateMap,
    deactivate: deactivateMap,
    showErrorOnLoad: showErrorOnLoad,
    removePins: removePinsFromMap,
    addPins: addPinsOnMap
  };
})();
