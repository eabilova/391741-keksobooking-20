'use strict';
(function () {
  var TYPE_DICTIONARY = {
    palace: 'Дворец',
    flat: 'Квартира',
    house: 'Дом',
    bungalo: 'Бунгало'
  };

  var offerCard;

  // Создание карточек предложений
  var createOfferCard = function (offerPin) {
    var cardTemplate = document.querySelector('#card').content;
    var newOfferCard = cardTemplate.cloneNode(true);
    var mapCard = newOfferCard.querySelector('.map__card');
    var featureContainer = newOfferCard.querySelector('.popup__features');
    var offerFeatures = featureContainer.querySelectorAll('.popup__feature');
    var photoContainer = newOfferCard.querySelector('.popup__photos');
    var roomPhoto = photoContainer.querySelector('img');
    var closePopupButton = newOfferCard.querySelector('.popup__close');

    mapCard.querySelector('.popup__avatar').src = offerPin.author.avatar;
    mapCard.querySelector('.popup__avatar').alt = offerPin.offer.title;
    mapCard.querySelector('.popup__title').textContent = offerPin.offer.title;
    mapCard.querySelector('.popup__text--address').textContent = offerPin.offer.address;
    mapCard.querySelector('.popup__text--price').textContent = offerPin.offer.price + '₽/ночь';
    mapCard.querySelector('.popup__type').textContent = TYPE_DICTIONARY[offerPin.offer.type];
    mapCard.querySelector('.popup__text--capacity').textContent = offerPin.offer.rooms + ' комнаты для ' + offerPin.offer.guests + ' гостей.';
    mapCard.querySelector('.popup__text--time').textContent = 'Заезд после ' + offerPin.offer.checkin + ', выезд до ' + offerPin.offer.checkout;
    mapCard.querySelector('.popup__description').textContent = offerPin.offer.description;
    checkFeatures(offerFeatures, offerPin);
    addPhotos(photoContainer, roomPhoto, offerPin.offer.photos);

    closePopupButton.addEventListener('click', function () {
      window.pin.clickedButton = null;
      removeCard();
    });

    return mapCard;
  };

  // Добавление фото  фото в карточке
  var addPhotos = function (parentNode, photoElement, photos) {
    parentNode.removeChild(photoElement);
    parentNode.appendChild(createPhotoElement(photos));
  };

  // Создание эелементов для фотографий
  var createPhotoElement = function (photos) {
    var photoFragment = document.createDocumentFragment();
    if (photos.length > 0) {
      photos.forEach(function (item) {
        var newPhoto = document.createElement('img');
        newPhoto.classList.add('popup__photo');
        newPhoto.width = '45';
        newPhoto.src = item;
        photoFragment.appendChild(newPhoto);
      });
    }
    return photoFragment;
  };

  var createCard = function (offerPin) {
    offerCard = createOfferCard(offerPin);
    window.map.element.appendChild(offerCard);
    document.addEventListener('keydown', onDocumentKeyDown);
  };

  // Удаление карточки предложения
  var removeCard = function (button) {
    window.pin.toggleStatus(button);
    if (offerCard) {
      offerCard.remove();
      document.removeEventListener('keydown', onDocumentKeyDown);
    }
  };

  // Закрытие окошка попапа
  var onDocumentKeyDown = function (evt) {
    if (evt.key === 'Escape') {
      removeCard();
      window.pin.clickedButton = null;
    }
  };

  // Скрытие фич, которых нет в предложении
  var checkFeatures = function (childrenElements, offerData) {
    childrenElements.forEach(function (item) {
      var features = offerData.offer.features;
      hideUnusedFeatures(item, features);
    });
  };

  var hideUnusedFeatures = function (checkedFeatures, features) {
    if (features.length !== 0) {
      checkedFeatures.classList.add('hidden');
      features.some(function (feature) {
        if (checkedFeatures.classList.contains('popup__feature--' + feature)) {
          checkedFeatures.classList.remove('hidden');
        }
      });
    } else {
      checkedFeatures.classList.add('hidden');
    }
  };

  // Объявление экспорта
  window.card = {
    create: createCard,
    remove: removeCard
  };
})();
