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
        "* @param snake - The snake's cells in an array of\n" +
        "*\t\t objects containing x and y coordinates\n" +
        "* @param food - The food's cells in an object of x and y\n" +
        "* @param map - The map cells in an array of objects containing\n" +
        "*\t\t the x and y coordinates and the type of the cell\n" +
        "*\t\t 'O' for obstactle and 'T' for tile\n" +
        "* return 'UP', 'RIGHT', 'LEFT' or 'RIGHT'\n" +
        "*/\nthis.moveSnake = function(snake, food) {" +
        "\n\tvar head = snake[snake.length-1];" +
        "\n\tif (head.x > food.x) {\n\t\treturn 'LEFT';" +
        "\n\t} else if (head.x < food.x) {\n\t\treturn 'RIGHT';" +
        "\n\t} else if (head.y < food.y) {\n\t\treturn 'DOWN';" +
        "\n\t} else {\n\t\treturn 'UP';\n\t}" +
        "\n};\n", -1);
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
