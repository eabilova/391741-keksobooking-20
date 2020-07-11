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
    var offerFeatures = newOfferCard.querySelector('.popup__features');
    var offerFeature = offerFeatures.querySelectorAll('.popup__feature');
    var popPhotos = newOfferCard.querySelector('.popup__photos');
    var roomPhoto = popPhotos.querySelector('img');
    var closePopupButton = newOfferCard.querySelector('.popup__close');

    mapCard.querySelector('.popup__avatar').src = offerPin.author.avatar;
    mapCard.querySelector('.popup__avatar').alt = offerPin.offer.title;
    mapCard.querySelector('.popup__title').textContent = offerPin.offer.title;
    mapCard.querySelector('.popup__text--address').textContent = offerPin.location.x + '-' + offerPin.location.y + ', ' + offerPin.offer.address;
    mapCard.querySelector('.popup__text--price').textContent = offerPin.offer.price + '₽/ночь';
    mapCard.querySelector('.popup__type').textContent = TYPE_DICTIONARY[offerPin.offer.type];
    mapCard.querySelector('.popup__text--capacity').textContent = offerPin.offer.rooms + ' комнаты для ' + offerPin.offer.guests + ' гостей.';
    mapCard.querySelector('.popup__text--time').textContent = 'Заезд после ' + offerPin.offer.checkin + ', выезд до ' + offerPin.offer.checkout;
    mapCard.querySelector('.popup__description').textContent = offerPin.offer.description;
    hideUnusedFeatures(offerFeature, offerPin);
    addPhotos(popPhotos, roomPhoto, offerPin.offer.photos);

    window.map.element.appendChild(mapCard);

    closePopupButton.addEventListener('click', function () {
      removeCard();
    });

    return mapCard;
  };

  // перебор фото в карточке
  var addPhotos = function (parentNode, photoElement, photo) {
    var photoFragment = document.createDocumentFragment();
    parentNode.removeChild(photoElement);
    if (photo.length !== 0) {
      for (var m = 0; m < photo.length; m++) {
        var newPhoto = document.createElement('img');
        newPhoto.classList.add('popup__photo');
        newPhoto.width = '45';
        newPhoto.src = photo[m];
        photoFragment.appendChild(newPhoto);
      }
      parentNode.appendChild(photoFragment);
    }
  };

  var replaceOfferCard = function (offerPin) {
    if (offerCard) {
      removeCard();
    }
    offerCard = createOfferCard(offerPin);
    document.addEventListener('keydown', onDocumentKeyDown);
  };

  // Удаление карточки предложения
  var removeCard = function () {
    offerCard.remove();
    document.removeEventListener('keydown', onDocumentKeyDown);
  };

  // Закрытие окошка попапа
  var onDocumentKeyDown = function (evt) {
    if (evt.key === 'Escape') {
      removeCard();
    }
  };

  // Скрытие фич, которых нет в предложении
  var hideUnusedFeatures = function (childrenElements, offerData) {
    for (var k = 0; k < window.data.FEATURES.length; k++) {
      var feature = offerData.offer.features;
      for (var n = 0; n < feature.length; n++) {
        var featureCheck = childrenElements[n];
        if (!featureCheck.classList.contains('popup__feature--' + feature[k])) {
          featureCheck.classList.add('hidden');
        }
      }
    }
  };

  // Объявление экспорта
  window.card = {
    replace: replaceOfferCard,
    remove: removeCard
  };
})();
