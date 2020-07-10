'use strict';

(function () {
  var main = document.querySelector('main');

  var closeMessages = function (evt) {
    if ((evt.key === 'Escape') || (evt.which === 1)) {
      document.querySelector('.error').remove();
      document.querySelector('.success').remove();
      document.removeEventListener('keydown', closeMessages);
      document.removeEventListener('mousedown', closeMessages);
    }
  };

  window.main = {
    element: main,
    closeMessages: closeMessages
  };
})();
