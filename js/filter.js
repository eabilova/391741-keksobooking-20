'use strict';
(function () {
  var ANY_VALUE = 'any';

  var OfferLimit = {
    MIN: 0,
    MAX: 5
  };
  var OfferStartPrice = {
    LOW: 10000,
    HIGH: 50000
  };
  var PriceRange = {
    LOW: 'low',
    MIDDLE: 'middle',
    HIGH: 'high'
  };

  var filterForm = document.querySelector('.map__filters');
  var filterParts = filterForm.querySelectorAll('select, input');
  var houseType = filterForm.querySelector('#housing-type');
  var houseRoomNumber = filterForm.querySelector('#housing-rooms');
  var houseGuestNumber = filterForm.querySelector('#housing-guests');
  var houseFeatures = filterForm.querySelector('#housing-features');
  var housePrice = filterForm.querySelector('#housing-price');

  // Скрытие фильтра
  window.form.toggle(filterParts, true);

  // Активация фильтра
  var activateFilter = function (data) {
    if (data) {
      window.form.toggle(filterParts, false);
    }
  };

  // Получение отфильтрованной информации
  var getFilteredData = function () {
    var allOffers = window.map.getData();
    var filteredPins = [];
    for (var i = 0; i < allOffers.length; i++) {
      if (filteredPins.length < OfferLimit.MAX) {
        if (filterType(allOffers[i]) && filterRoomNumber(allOffers[i]) && filterGuestNumber(allOffers[i]) && filterFeatures(allOffers[i]) && filterPrice(allOffers[i])) {
          filteredPins.push(allOffers[i]);
        }
      } else {
        break;
      }
    }
    return filteredPins;
  };

  var filterType = function (item) {
    return item.offer.type === houseType.value || houseType.value === ANY_VALUE;
  };

  var filterRoomNumber = function (item) {
    return item.offer.rooms === Number(houseRoomNumber.value) || houseRoomNumber.value === ANY_VALUE;
  };

  var filterGuestNumber = function (item) {
    return item.offer.guests === Number(houseGuestNumber.value) || houseGuestNumber.value === ANY_VALUE;
  };

  var filterFeatures = function (item) {
    var selectedFeatures = houseFeatures.querySelectorAll('input:checked');
    return Array.from(selectedFeatures).every(function (checkedFeature) {
      return item.offer.features.includes(checkedFeature.value);
    });
  };

  var filterPrice = function (item) {
    var price;
    if (item.offer.price <= OfferStartPrice.LOW) {
      price = PriceRange.LOW;
    } else if (item.offer.price > OfferStartPrice.LOW && item.offer.price < OfferStartPrice.HIGH) {
      price = PriceRange.MIDDLE;
    } else if (item.offer.price >= OfferStartPrice.HIGH) {
      price = PriceRange.HIGH;
    }
    return price === housePrice.value || housePrice.value === ANY_VALUE;
  };

  var renderFilteredData = function () {
    var filteredData = getFilteredData();
    window.map.addPins(filteredData);
  };

  // Функции для обработчиков событий
  var onFilterChange = window.debounce(function () {
    window.map.removePins();
    window.card.remove();
    renderFilteredData();
  });

  // Обработчики событий
  filterForm.addEventListener('change', onFilterChange);

  // Объявление экспорта
  window.filter = {
    element: filterForm,
    parts: filterParts,
    activate: activateFilter,
    renderData: renderFilteredData
  };
})();
