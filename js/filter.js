'use strict';
(function () {
  var mapFilters = document.querySelector('.map__filters');
  window.main.toggle(mapFilters, true);

  window.filter = {
    set: mapFilters
  };
})();
