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
    var filteredPins = window.map.getData().filter(function (item) {
      return filterType(item) && filterRoomNumber(item) && filterGuestNumber(item) && filterFeatures(item) && filterPrice(item);
    });
    return filteredPins.slice(OfferLimit.MIN, OfferLimit.MAX);
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
      price = 'low';
    } else if (item.offer.price > OfferStartPrice.LOW && item.offer.price < OfferStartPrice.HIGH) {
      price = 'middle';
    } else if (item.offer.price >= OfferStartPrice.HIGH) {
      price = 'high';
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
    activate: activateFilter,
    renderData: renderFilteredData
  };
})();
