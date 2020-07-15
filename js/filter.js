'use strict';
(function () {
  var OFFER_LIMIT = 5;

  var mapFilters = document.querySelector('.map__filters');
  var houseType = mapFilters.querySelector('#housing-type');

  window.form.toggle(mapFilters, true);

  var activateFilter = function (data) {
    if (data) {
      window.form.toggle(mapFilters, false);
    }
  };

  var getFilteredData = function () {
    var availableOffers = window.map.getData();
    var selectedType = houseType.value;
    var filteredPins = [];
    availableOffers.filter(function(item){
      if (item.offer.type === selectedType || selectedType === 'any') {
        filteredPins.push(item);
      }
    });
    var shortData = filteredPins.slice(0, OFFER_LIMIT);
    return shortData;
  }

  var addFilteredData = function () {
    var filteredData = getFilteredData();
    window.map.addPins(filteredData);
  };

  houseType.addEventListener('change', function () {
    window.map.removePins();
    window.card.remove();
    addFilteredData();
  });

  // Объявление экспорта
  window.filter = {
    set: mapFilters,
    activate: activateFilter,
    addData: addFilteredData
  };
})();
