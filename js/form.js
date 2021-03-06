'use strict';
(function () {
  var PIN_TAIL_HEIGHT = 15;
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var DEFAULT_AVATAR_SRC = 'img/muffin-grey.svg';
  var RoomGuestValues = {
    MIN: 0,
    MAX: 100
  };
  var RoomTypes = {
    BUNGALO: 'bungalo',
    FLAT: 'flat',
    HOUSE: 'house',
    PALACE: 'palace'
  };

  var RoomPrices = {
    BUNGALO: 0,
    FLAT: 1000,
    HOUSE: 5000,
    PALACE: 10000
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
    toggleFormElement(window.filter.parts, true);
    toggleFormElement(formFieldsets, true);
  };

  // Функция валидации соответствия количества комнат и гостей
  var validateNumbers = function () {
    var capacityValue = Number(capacity.value);
    var roomNumberValue = Number(roomNumber.value);
    var capacityError = '';
    var roomNumberError = '';
    if ((capacityValue > roomNumberValue && capacityValue !== RoomGuestValues.MIN)) {
      capacityError = 'Число гостей не может превышать количество комнат. Выберите другое значение.';
      roomNumberError = 'Число комнат не может быть меньше количества гостей. Выберите другое значение.';
    } else if ((roomNumberValue === RoomGuestValues.MAX && capacityValue !== RoomGuestValues.MIN) || (roomNumberValue !== RoomGuestValues.MAX && capacityValue === RoomGuestValues.MIN)) {
      capacityError = 'Ошибка: выберите другой тип жилья, либо иное количество гостей';
      roomNumberError = 'Ошибка: выберите другой тип жилья, либо иное количество гостей';
    }
    capacity.setCustomValidity(capacityError);
    roomNumber.setCustomValidity(roomNumberError);
  };

  // Функция валидации количества комнат и минимальной цены
  var validateRoomTypeAndMinPrice = function () {
    switch (roomType.value) {
      case RoomTypes.PALACE:
        roomPrice.min = RoomPrices.PALACE;
        roomPrice.placeholder = RoomPrices.PALACE;
        break;
      case RoomTypes.HOUSE:
        roomPrice.min = RoomPrices.HOUSE;
        roomPrice.placeholder = RoomPrices.HOUSE;
        break;
      case RoomTypes.FLAT:
        roomPrice.min = RoomPrices.FLAT;
        roomPrice.placeholder = RoomPrices.FLAT;
        break;
      case RoomTypes.BUNGALO:
        roomPrice.min = RoomPrices.BUNGALO;
        roomPrice.placeholder = RoomPrices.BUNGALO;
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
    var housePhotoPreview = formContainer.querySelector('.ad-form__photo');
    var file;
    var currentSelector = housePhotoSelector;
    if (evt.currentTarget === avatarSelector) {
      currentSelector = avatarSelector;
      file = avatarSelector.files[0];
    } else {
      file = housePhotoSelector.files[0];
    }
    if (file) {
      var fileName = file.name.toLowerCase();

      var matches = FILE_TYPES.some(function (it) {
        return fileName.endsWith(it);
      });
    }

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

  var resetAvatar = function () {
    avatarPreview.src = DEFAULT_AVATAR_SRC;
  };

  var resetHomePhotoBlock = function () {
    var allHomePhotos = Array.from(formContainer.querySelectorAll('.ad-form__photo'));
    allHomePhotos.forEach(function (item) {
      item.remove();
    });
    var photoBlock = document.createElement('div');
    photoBlock.classList.add('ad-form__photo');
    housePhotosUploadContainer.appendChild(photoBlock);
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
    resetAvatar();
    resetHomePhotoBlock();
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
    resetAvatar();
    resetHomePhotoBlock();
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
