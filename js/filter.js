'use strict';
(function () {
  var OFFER_LIMIT = 5;

  var mapFilters = document.querySelector('.map__filters');
  var houseType = mapFilters.querySelector('#housing-type');
  var houseRoomNumber = mapFilters.querySelector('#housing-rooms');
  var houseGuestNumber = mapFilters.querySelector('#housing-guests');
  var houseFeatures = mapFilters.querySelector('#housing-features');
  var housePrice = mapFilters.querySelector('#housing-price');

  window.form.toggle(mapFilters, true);

  var activateFilter = function (data) {
    if (data) {
      window.form.toggle(mapFilters, false);
    }
  };


  var getFilteredData = function () {
    var availableOffers = window.map.getData();
    var filteredPins = [];
    availableOffers.filter(function (item) {
      if (filterType(item) && filterRoomNumber(item) && filterGuestNumber(item) && filterFeatures(item) && filterPrice(item)) {
        filteredPins.push(item);
      }
    });
    return filteredPins.slice(0, OFFER_LIMIT);
  };

  var filterType = function (item) {
    return item.offer.type === houseType.value || houseType.value === 'any';
  };

  var filterRoomNumber = function (item) {
    return item.offer.rooms === Number(houseRoomNumber.value) || houseRoomNumber.value === 'any';
  };

  var filterGuestNumber = function (item) {
    return item.offer.guests === Number(houseGuestNumber.value) || houseGuestNumber.value === 'any';
  };

  var filterFeatures = function (item) {
    var selectedFeatures = houseFeatures.querySelectorAll('input:checked');
    return Array.from(selectedFeatures).every(function (checkedFeature) {
      return item.offer.features.includes(checkedFeature.value);
    });
  };

  var filterPrice = function (item) {
    if (item.offer.price <= 10000) {
      item.offer.price = 'low';
    } else if (item.offer.price > 10000 && item.offer.price > 50000) {
      item.offer.price = 'middle';
    } else if (item.offer.price >= 50000) {
      item.offer.price = 'high';
    }
    return item.offer.price === housePrice.value || housePrice.value === 'any';
  };

  var renderFilteredData = function () {
    var filteredData = getFilteredData();
    window.map.addPins(filteredData);
  };

  mapFilters.addEventListener('change', function () {
    window.map.removePins();
    window.card.remove();
    renderFilteredData();
  });

  // Объявление экспорта
  window.filter = {
    set: mapFilters,
    activate: activateFilter,
    renderData: renderFilteredData
  };
})();
