'use strict';
(function () {
  var ESCAPE_KEY_CODE = 'Escape';
  var LEFT_BUTTON_CODE = 1;
  var mainBlock = document.querySelector('main');

  var closeMessages = function (message) {
    message.remove();
    document.removeEventListener('keydown', onDocumentKeyDown);
    document.removeEventListener('mousedown', onDocumentMouseDown);
  };

  var onDocumentKeyDown = function (message) {
    return function (evt) {
      if (evt.key === ESCAPE_KEY_CODE) {
        closeMessages(message);
      }
    };
  };

  var onDocumentMouseDown = function (message) {
    return function (evt) {
      if (evt.which === LEFT_BUTTON_CODE) {
        closeMessages(message);
      }
    };
  };

  window.main = {
    onDocumentKeyDown: onDocumentKeyDown,
    onDocumentMouseDown: onDocumentMouseDown,
    element: mainBlock,
    ESCAPE_KEY_CODE: ESCAPE_KEY_CODE,
    LEFT_BUTTON_CODE: LEFT_BUTTON_CODE
  };
})();
