'use strict';
(function () {
  var OFFER_LIMIT = 5;

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
    var price;
    if (item.offer.price <= 10000) {
      price = 'low';
    } else if (item.offer.price > 10000 && item.offer.price < 50000) {
      price = 'middle';
    } else if (item.offer.price >= 50000) {
      price = 'high';
    }
    return price === housePrice.value || housePrice.value === 'any';
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
