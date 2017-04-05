(function () {

  'use strict';

  angular.module('openSnap')
    .component('osCodes', {
      templateUrl: 'components/codes/oscodes.html',
      controller: OsCodesController,
      bindings: {
        snippets: '<'
      }
    });

  function OsCodesController() {
    var $ctrl = this;

  }

})();
