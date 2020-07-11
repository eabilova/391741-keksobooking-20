'use strict';
(function () {
  var mainElement = document.querySelector('main');

  var closeMessages = function () {
    mainElement.querySelector('.error').remove();
    mainElement.querySelector('.success').remove();
    document.removeEventListener('keydown', onDocumentKeyMouseDown);
    document.removeEventListener('mousedown', onDocumentKeyMouseDown);
  };

  var onDocumentKeyMouseDown = function (evt) {
    if ((evt.key === 'Escape') || (evt.which === 1)) {
      closeMessages();
    }
  };

  window.main = {
    keyMouseDown: onDocumentKeyMouseDown,
    element: mainElement
  };
})();
