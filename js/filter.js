'use strict';
(function () {
  var mapFilters = document.querySelector('.map__filters');

  window.form.toggle(mapFilters, true);

  // Объявление экспорта
  window.filter = {
    set: mapFilters
  };
})();
