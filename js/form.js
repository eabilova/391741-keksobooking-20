'use strict';
(function () {
  var newForm = document.querySelector('.ad-form');
  window.main.toggle(newForm, true);

  // Валидация соответствия количества комнат и гостей
  var roomNumber = newForm.querySelector('#room_number');
  var capacity = newForm.querySelector('#capacity');

  roomNumber.addEventListener('change', function () {
    validateNumbers();
  });
  capacity.addEventListener('change', function () {
    validateNumbers();
  });

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

  // Валидация количества комант и минимальной цены
  var roomType = newForm.querySelector('#type');
  var roomPrice = newForm.querySelector('#price');

  roomType.addEventListener('change', function () {
    validateRoomTypeAndMinPrice();
  });

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


  // Валидация checkin-checkout
  var checkin = newForm.querySelector('#timein');
  var checkout = newForm.querySelector('#timeout');

  checkin.addEventListener('change', function () {
    checkout.value = checkin.value;
  });

  checkout.addEventListener('change', function () {
    checkin.value = checkout.value;
  });

  window.form = {
    new: newForm,
    validateNumbers: validateNumbers,
    validatePrice: validateRoomTypeAndMinPrice
  };
})();
