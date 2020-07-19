'use strict';
(function () {
  var PIN_TAIL_HEIGHT = 22;
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var ROOM_PRICES = {
    bungalo: 0,
    flat: 1000,
    house: 5000,
    palace: 10000
  };

  var formContainer = document.querySelector('.ad-form');
  var formFieldsets = formContainer.querySelectorAll('fieldset');
  var roomNumber = formContainer.querySelector('#room_number');
  var capacity = formContainer.querySelector('#capacity');
  var roomType = formContainer.querySelector('#type');
  var roomPrice = formContainer.querySelector('#price');
  var checkin = formContainer.querySelector('#timein');
  var checkout = formContainer.querySelector('#timeout');
  var myAddress = document.querySelector('#address');
  var avatarSelector = formContainer.querySelector('.ad-form__field input[type=file]');
  var avatarPreview = formContainer.querySelector('.ad-form-header__preview img');
  var housePhotosUploadContainer = formContainer.querySelector('.ad-form__photo-container');
  var housePhotoSelector = formContainer.querySelector('.ad-form__upload input[type=file]');
  var housePhotoPreview = formContainer.querySelector('.ad-form__photo');
  var resetButton = formContainer.querySelector('.ad-form__reset');
  var pinCenterPositionX = window.mainPin.element.offsetLeft;
  var pinCenterPositionY = window.mainPin.element.offsetTop;
  var pinWithTailPositionY = window.mainPin.element.offsetTop + window.mainPin.halfOfPinHeight + PIN_TAIL_HEIGHT;
  var retryButton;

  // Изменение состояния карты и форм
  var toggleFormElement = function (elements, isDisabled) {
    elements.forEach(function (item) {
      item.disabled = isDisabled;
    });
  };

  toggleFormElement(formFieldsets, true);

  // Определение положение главного пина после активации и смещения
  var setAddress = function (x, y) {
    myAddress.value = Math.round(x + window.mainPin.halfOfPinWidth) + ', ' + Math.round(y + window.mainPin.halfOfPinHeight);
  };

  setAddress(pinCenterPositionX, pinCenterPositionY);

  // Активация формы
  var activateFormElements = function (data) {
    formContainer.classList.remove('ad-form--disabled');
    setAddress(pinCenterPositionX, pinWithTailPositionY);
    window.filter.activate(data);
    validateNumbers();
    validateRoomTypeAndMinPrice();
    toggleFormElement(formFieldsets, false);
  };

  // Деактивация формы
  var deactivateFormElements = function () {
    formContainer.classList.add('ad-form--disabled');
    setAddress(pinCenterPositionX, pinCenterPositionY);
    toggleFormElement(window.filter.element, true);
    toggleFormElement(formContainer, true);
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
        roomPrice.min = ROOM_PRICES.palace;
        roomPrice.placeholder = ROOM_PRICES.palace;
        break;
      case 'house':
        roomPrice.min = ROOM_PRICES.house;
        roomPrice.placeholder = ROOM_PRICES.house;
        break;
      case 'flat':
        roomPrice.min = ROOM_PRICES.flat;
        roomPrice.placeholder = ROOM_PRICES.flat;
        break;
      case 'bungalo':
        roomPrice.min = ROOM_PRICES.bungalo;
        roomPrice.placeholder = ROOM_PRICES.bungalo;
        break;
    }
  };

  var createPhotoBox = function () {
    var photoBox = document.createElement('div');
    photoBox.classList.add('ad-form__photo');
    housePhotosUploadContainer.appendChild(photoBox);
    return photoBox;
  };

  var createPhotoElement = function () {
    var photo = document.createElement('img');
    photo.style.width = '70px';
    return photo;
  };

  var uploadPhoto = function (evt) {
    var file;
    var currentSelector = housePhotoSelector;
    if (evt.currentTarget === avatarSelector) {
      currentSelector = avatarSelector;
      file = avatarSelector.files[0];
    } else {
      file = housePhotoSelector.files[0];
    }
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        if (currentSelector === avatarSelector) {
          avatarPreview.src = reader.result;
        } else {
          var photo = createPhotoElement();
          photo.src = reader.result;
          if (!housePhotoPreview.querySelector('img')) {
            housePhotoPreview.appendChild(photo);
          } else {
            var photoBox = createPhotoBox();
            photoBox.appendChild(photo);
          }
        }
      });

      reader.readAsDataURL(file);
    }
  };

  // Создание сообщения об удачной операции
  var createSuccessMessage = function () {
    var successMessageTemplate = document.querySelector('#success').content;
    var successMessage = successMessageTemplate.cloneNode(true);
    window.main.element.appendChild(successMessage);
  };

  // Сообщение об удачной отправке формы
  var showSuccessOnSend = function () {
    createSuccessMessage();
    var popUpMessage = document.querySelector('.success');
    document.addEventListener('keydown', window.main.onDocumentKeyDown(popUpMessage));
    document.addEventListener('mousedown', window.main.onDocumentMouseDown(popUpMessage));
    formContainer.reset();
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
  var showErrorOnSend = function () {
    createErrorMessage();
    var popUpMessage = document.querySelector('.error');
    retryButton = popUpMessage.querySelector('.error__button');
    document.addEventListener('keydown', window.main.onDocumentKeyDown(popUpMessage));
    document.addEventListener('mousedown', window.main.onDocumentMouseDown(popUpMessage));

    retryButton.addEventListener('mousedown', function (evt) {
      if (evt.which === window.main.LEFT_BUTTON_CODE) {
        popUpMessage.remove();
      }
    });

    retryButton.addEventListener('keydown', function (evt) {
      if (evt.key === window.mapPin.ENTER_KEY_CODE) {
        popUpMessage.remove();
      }
    });
  };

  // Очистка страницы до дефолтного состояния
  var resetPage = function () {
    formContainer.reset();
    window.filter.element.reset();
    deactivateFormElements();
    window.map.deactivate();
  };

  var onResetButtonMouseDown = function (evt) {
    if (evt.which === window.main.LEFT_BUTTON_CODE) {
      resetPage();
    }
  };

  var onResetButtonKeyDown = function (evt) {
    if (evt.key === window.mapPin.ENTER_KEY_CODE) {
      resetPage();
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

  formContainer.addEventListener('submit', function (evt) {
    evt.preventDefault();
    var formData = new FormData(formContainer);
    window.server.postInfo(showSuccessOnSend, showErrorOnSend, formData);
  });

  avatarSelector.addEventListener('change', uploadPhoto);
  housePhotoSelector.addEventListener('change', uploadPhoto);

  resetButton.addEventListener('mousedown', onResetButtonMouseDown);
  resetButton.addEventListener('keydown', onResetButtonKeyDown);

  // Объявление экспорта
  window.form = {
    toggle: toggleFormElement,
    activate: activateFormElements,
    setAddress: setAddress,
    PIN_TAIL_HEIGHT: PIN_TAIL_HEIGHT
  };
})();
