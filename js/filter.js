'use strict';
(function () {
  var OFFER_LIMIT = 5;

  var mapFilters = document.querySelector('.map__filters');
  var houseType = mapFilters.querySelector('#housing-type');
  var availableOffers = window.map.getData();

  window.form.toggle(mapFilters, true);

  var activateFilter = function (data) {
    if (data) {
      window.form.toggle(mapFilters, false);
    }
  };

  var filterData = function () {
    var selectedType = houseType.value;
    var filteredPins = [];
    availableOffers.filter(function(item){
      if (item.offer.type === selectedType || selectedType === "any") {
        filteredPins.push(item);
      }
    });
    var shortData = filteredPins.slice(0, OFFER_LIMIT)
    window.map.addPins(shortData);
  }

  var onFilterChange = function () {
    window.map.removePins();
    window.card.remove();
    filterData(availableOffers);
  };

  houseType.addEventListener('change', onFilterChange);

  // Объявление экспорта
  window.filter = {
    set: mapFilters,
    activate: activateFilter,
    check: filterData,
    change: onFilterChange
  };
})();
