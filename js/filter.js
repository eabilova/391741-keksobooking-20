'use strict';
(function () {
  var mapFilters = document.querySelector('.map__filters');
  var houseType = mapFilters.querySelector('#housing-type');
  var availableOffers;

  window.form.toggle(mapFilters, true);

  var activateFilter = function (data) {
    if (data !== undefined || data !== null) {
      window.form.toggle(mapFilters, false);
    }
  };

  var getInfoForFilter = function (data) {
    availableOffers = data;
  }

  houseType.addEventListener('change', function () {
    window.map.removePins();
    window.card.remove();
    var selectedType = houseType.value;
    var filteredPins = [];
    availableOffers.filter(function(item){
      if (item.offer.type === selectedType) {
        filteredPins.push(item);
      } else if (selectedType === "any") {
        filteredPins.push(item);
      }
    });
    window.map.addPins(filteredPins);
});

  // Объявление экспорта
  window.filter = {
    set: mapFilters,
    activate: activateFilter,
    getInfo: getInfoForFilter
  };
})();
