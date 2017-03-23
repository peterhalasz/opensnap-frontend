(function () {

  'use strict';

  angular.module('openSnap')
    .component('osCreate', {
      templateUrl: 'components/create/oscreate.html',
      controller: OsCreateController
    });

  OsCreateController.$inject = ['$mdDialog'];
  function OsCreateController($mdDialog) {
    var $ctrl = this;

    $ctrl.$onInit = function () {
      $ctrl.editor = ace.edit('os-editor');
      $ctrl.editor.setTheme('ace/theme/eclipse');
      $ctrl.editor.getSession().setMode('ace/mode/javascript');

      $ctrl.editor.setValue(
        "/**\n* Function for controlling snake movement\n" +
        "* @param snakeX - Snake's X axis coordinate\n" +
        "* @param snakeY - Snake's Y axis coordinate\n" +
        "* @param foodX - Food's X axis coordinate\n" +
        "* @param foodY - Food's Y axis coordinate\n" +
        "* return 'UP', 'RIGHT', 'LEFT' or 'RIGHT'\n" +
        "*/\nthis.moveSnake = function(snakeX, snakeY, foodX, foodY) {\n\t\n\n\n}\n"
      );
    };

    $ctrl.onRunClick = function (ev) {
      $mdDialog.show({
        controller: 'OsRunController',
        templateUrl: 'components/create/run/osrun.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose: false,
        controllerAs: '$ctrl',
        locals: {
          gameCode: $ctrl.editor.getValue()
        }
      });
    }

  }

})();
