'use strict';
(function () {
  var offerCard;
  window.replaceOfferCard = function (offerPin) {
    if (offerCard) {
      window.removeCard();
    }
    offerCard = window.createOfferCard(offerPin);
    document.addEventListener('keydown', onDocumentKeyDown);
  };

  // Удаление карточки предложения
  window.removeCard = function () {
    offerCard.remove();
    document.removeEventListener('keydown', onDocumentKeyDown);
  };

  // Закрытие окошка попапа
  var onDocumentKeyDown = function (evt) {
    if (evt.key === 'Escape') {
      window.removeCard();
    }
  };

  // Скрытие фич, которых нет в предложении
  window.hideUnusedFeatures = function (childrenElements, offerData) {
    for (var k = 0; k < window.const.FEATURES.length; k++) {
      var feature = offerData.offer.features;
      var featureCheck = childrenElements[k];
      if (!featureCheck.classList.contains('popup__feature--' + feature)) {
        featureCheck.classList.add('hidden');
      }
    }
  };
})();
