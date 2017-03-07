(function () {

  'use strict';

  angular.module('openSnap')
    .component('osCreate', {
      templateUrl: 'components/create/oscreate.html',
      controller: OsCreateController
    });

  function OsCreateController() {
    var $ctrl = this;

    $ctrl.$onInit = function () {
      $ctrl.editor = ace.edit('os-editor');
      $ctrl.editor.setTheme('ace/theme/eclipse');
      $ctrl.editor.getSession().setMode('ace/mode/javascript');
    }
  }

})();
