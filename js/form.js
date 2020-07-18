'use strict';
(function () {
  var PIN_TAIL_HEIGHT = 22;

  var formElement = document.querySelector('.ad-form');
  var roomNumber = formElement.querySelector('#room_number');
  var capacity = formElement.querySelector('#capacity');
  var roomType = formElement.querySelector('#type');
  var roomPrice = formElement.querySelector('#price');
  var checkin = formElement.querySelector('#timein');
  var checkout = formElement.querySelector('#timeout');
  var myAddress = document.querySelector('#address');
  var retryButton;
  var resetButton = formElement.querySelector('.ad-form__reset');
  var pinCenterPositionX = window.mainPin.element.offsetLeft;
  var pinCenterPositionY = window.mainPin.element.offsetTop;
  var pinWithTailPositionY = window.mainPin.element.offsetTop + window.mainPin.halfOfPinHeight + PIN_TAIL_HEIGHT;

  // Изменение состояния карты и форм
  var toggleFormElement = function (element, isDisabled) {
    for (var i = 0; i < element.length; i++) {
      element[i].disabled = isDisabled;
    }
  };

  toggleFormElement(formElement, true);

  // Определение положение главного пина после активации и смещения
  var setAddress = function (x, y) {
    myAddress.value = Math.round(x + window.mainPin.halfOfPinWidth) + ', ' + Math.round(y + window.mainPin.halfOfPinHeight);
  };

  setAddress(pinCenterPositionX, pinCenterPositionY);

  // Активация формы
  var activateFormElements = function (data) {
    formElement.classList.remove('ad-form--disabled');
    setAddress(pinCenterPositionX, pinWithTailPositionY);
    window.filter.activate(data);
    validateNumbers();
    validateRoomTypeAndMinPrice();
    toggleFormElement(formElement, false);
  };

  // Деактивация формы
  var deactivateFormElements = function () {
    formElement.classList.add('ad-form--disabled');
    setAddress(pinCenterPositionX, pinCenterPositionY);
    toggleFormElement(window.filter.set, true);
    toggleFormElement(formElement, true);
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
        roomPrice.placeholder = '10000';
        break;
      case 'house':
        roomPrice.min = 5000;
        roomPrice.placeholder = '5000';
        break;
      case 'flat':
        roomPrice.min = 1000;
        roomPrice.placeholder = '1000';
        break;
      case 'bungalo':
        roomPrice.min = 0;
        roomPrice.placeholder = '0';
        break;
    }
  };
  // Создание сообщения об удачной операции
  var createSuccessMessage = function () {
    var successMessageTemplate = document.querySelector('#success').content;
    var successMessage = successMessageTemplate.cloneNode(true);
    window.main.element.appendChild(successMessage);
  };

  // Сообщение об удачной отправке формы
  var onSendSuccess = function () {
    createSuccessMessage();
    var popUpMessage = document.querySelector('.success');
    document.addEventListener('keydown', window.main.onDocumentKeyDown(popUpMessage));
    document.addEventListener('mousedown', window.main.onDocumentMouseDown(popUpMessage));
    formElement.reset();
    deactivateFormElements();
    window.map.deactivate();
  };

  // Создание сообщения об удачной операции
  var createErrorMessage = function () {
    var errorMessageTemplate = document.querySelector('#error').content;
    var errorsMessage = errorMessageTemplate.cloneNode(true);
    window.main.element.appendChild(errorsMessage);
  };

  // Сообщение о неудачной отправке формы
  var onSendFailure = function () {
    createErrorMessage();
    var popUpMessage = document.querySelector('.error');
    retryButton = popUpMessage.querySelector('.error__button');
    document.addEventListener('keydown', window.main.onDocumentKeyDown(popUpMessage));
    document.addEventListener('mousedown', window.main.onDocumentMouseDown(popUpMessage));

    retryButton.addEventListener('mousedown', function (evt) {
      if (evt.which === 1) {
        popUpMessage.remove();
      }
    });
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

  formElement.addEventListener('submit', function (evt) {
    evt.preventDefault();
    var formData = new FormData(formElement);
    window.server.postInfo(onSendSuccess, onSendFailure, formData);
  });

  resetButton.addEventListener('mousedown', function () {
    formElement.reset();
    window.filter.set.reset();
    deactivateFormElements();
    window.map.deactivate();
  });

  // Объявление экспорта
  window.form = {
    toggle: toggleFormElement,
    activate: activateFormElements,
    setAddress: setAddress,
    PIN_TAIL_HEIGHT: PIN_TAIL_HEIGHT
  };
})();
