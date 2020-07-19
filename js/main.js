'use strict';
(function () {
  var ESCAPE = 'Escape';
  var mainBlock = document.querySelector('main');

  var closeMessages = function (message) {
    message.remove();
    document.removeEventListener('keydown', onDocumentKeyDown);
    document.removeEventListener('mousedown', onDocumentMouseDown);
  };

  var onDocumentKeyDown = function (message) {
    return function (evt) {
      if (evt.key === ESCAPE) {
        closeMessages(message);
      }
    };
  };

  var onDocumentMouseDown = function (message) {
    return function (evt) {
      if (evt.which === 1) {
        closeMessages(message);
      }
    };
  };

  window.main = {
    onDocumentKeyDown: onDocumentKeyDown,
    onDocumentMouseDown: onDocumentMouseDown,
    element: mainBlock,
    ESCAPE: ESCAPE
  };
})();
