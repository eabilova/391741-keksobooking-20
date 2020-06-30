'use strict';
(function () {
  var formElement = document.querySelector('.ad-form');
  var roomNumber = formElement.querySelector('#room_number');
  var capacity = formElement.querySelector('#capacity');
  var roomType = formElement.querySelector('#type');
  var roomPrice = formElement.querySelector('#price');
  var checkin = formElement.querySelector('#timein');
  var checkout = formElement.querySelector('#timeout');
  var myAddress = document.querySelector('#address');
  var pinCenterPositionX = Math.round(window.map.mainPin.offsetLeft + window.main.BIG_PIN_WIDTH / 2);
  var pinCenterPositionY = Math.round(window.map.mainPin.offsetTop + window.main.BIG_PIN_HEIGHT / 2);
  var newPinPositionY = Math.round(window.map.mainPin.offsetTop + window.main.BIG_PIN_HEIGHT + window.main.PIN_TAIL_HEIGHT);

  // Изменение состояния карты и форм
  var toggleFormElement = function (element, isDisabled) {
    for (var i = 0; i < element.length; i++) {
      element[i].disabled = isDisabled;
    }
  };

  toggleFormElement(formElement, true);

  // Определение положение главного пина после активации и смещения
  var setAddress = function (x, y) {
    myAddress.value = x + ', ' + y;
  };

  setAddress(pinCenterPositionX, pinCenterPositionY);

  // Активация формы
  var activateFormElements = function () {
    formElement.classList.remove('ad-form--disabled');
    setAddress(pinCenterPositionX, newPinPositionY);
    toggleFormElement(window.filter.set, false);
    validateNumbers();
    validateRoomTypeAndMinPrice();
    toggleFormElement(formElement, false);
  };

  // Функция валидации соответствия количества комнат и гостей
  var validateNumbers = function () {
    var capacityValue = Number(capacity.value);
    var roomNumberValue = Number(roomNumber.value);
    var capacityError = '';
    var roomNumberError = '';
    if ((capacityValue > roomNumberValue && capacityValue !== 0)) {
      capacityError = 'Число гостей не может превышать количество комнат. Выберите другое значение.';
      roomNumberError = 'Число комнат не может быть меньше количества гостей. Выберите другое значение.';
    } else if ((roomNumberValue === 100 && capacityValue !== 0) || (roomNumberValue !== 100 && capacityValue === 0)) {
      capacityError = 'Ошибка: выберите другой тип жилья, либо иное количество гостей';
      roomNumberError = 'Ошибка: выберите другой тип жилья, либо иное количество гостей';
    }
    capacity.setCustomValidity(capacityError);
    roomNumber.setCustomValidity(roomNumberError);
  };

  // Функция валидации количества комнат и минимальной цены
  var validateRoomTypeAndMinPrice = function () {
    switch (roomType.value) {
      case 'palace':
        roomPrice.min = 10000;
        break;
      case 'house':
        roomPrice.min = 5000;
        break;
      case 'flat':
        roomPrice.min = 1000;
        break;
      case 'bungalo':
        roomPrice.min = 0;
        break;
    }
  };

  // Обработчики событий
  roomNumber.addEventListener('change', function () {
    validateNumbers();
  });
  capacity.addEventListener('change', function () {
    validateNumbers();
  });

  roomType.addEventListener('change', function () {
    validateRoomTypeAndMinPrice();
  });

  checkin.addEventListener('change', function () {
    checkout.value = checkin.value;
  });

  checkout.addEventListener('change', function () {
    checkin.value = checkout.value;
  });

  // Объявление экспорта
  window.form = {
    element: formElement,
    pinPositionX: pinCenterPositionX,
    pinStartPositionY: pinCenterPositionY,
    setAddress: setAddress,
    toggle: toggleFormElement,
    activate: activateFormElements,
    validateNumbers: validateNumbers,
    validatePrice: validateRoomTypeAndMinPrice
  };
})();
