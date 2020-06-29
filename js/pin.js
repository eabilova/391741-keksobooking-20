'use strict';
(function () {
  var fragment = document.createDocumentFragment();

  // Добавление пинов на карту
  window.addPinsOnMap = function () {
    createPins();
    window.mapClass.mapPins.appendChild(fragment);
  };

  var createPins = function () {
    for (var n = 0; n < window.const.OFFER_NUMBER; n++) {
      fragment.appendChild(window.renderPins(window.offerPins[n]));
    }
  };
})();
