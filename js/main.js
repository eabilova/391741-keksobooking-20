'use strict';
(function () {
  var mainElement = document.querySelector('main');

  var closeMessages = function () {
    mainElement.querySelector('.error').remove();
    mainElement.querySelector('.success').remove();
    document.removeEventListener('keydown', onDocumentKeyDown);
    document.removeEventListener('mousedown', onDocumentMouseDown);
  };

  var onDocumentKeyDown = function (evt) {
    if (evt.key === 'Escape') {
      closeMessages();
    }
  };

  var onDocumentMouseDown = function (evt) {
    if (evt.which === 1) {
      closeMessages();
    }
  };

  window.main = {
    keyDown: onDocumentKeyDown,
    mouseDown: onDocumentMouseDown,
    element: mainElement
  };
})();
