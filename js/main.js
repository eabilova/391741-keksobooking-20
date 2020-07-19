'use strict';
(function () {
  var ESCAPE = 'Escape';
  var LEFTCLICK = 1;
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
      if (evt.which === LEFTCLICK) {
        closeMessages(message);
      }
    };
  };

  window.main = {
    onDocumentKeyDown: onDocumentKeyDown,
    onDocumentMouseDown: onDocumentMouseDown,
    element: mainBlock,
    ESCAPE: ESCAPE,
    LEFTCLICK: LEFTCLICK
  };
})();
