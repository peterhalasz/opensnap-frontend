(function () {

  'use strict';

  angular.module('openSnap')
    .component('osCreate', {
      templateUrl: 'components/create/oscreate.html',
      controller: OsCreateController,
      bindings: {
        snippet: '<'
      }
    });

  OsCreateController.$inject = ['$mdDialog', 'OsSnippetApi', '$mdToast'];
  function OsCreateController($mdDialog, OsSnippetApi, $mdToast) {
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

        if (this.snippet) {
          $ctrl.editor.setValue(this.snippet.code, -1);
        }
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
          gameCode1: $ctrl.editor.getValue(),
          gameCode2: null
        }
      });
    };

    $ctrl.updateSnippet = function () {
      if ($ctrl.newSnippetForm.invalid) return;
      var toastText = 'Snippet saved successfully!';
      $ctrl.snippet.code = $ctrl.editor.getValue();
      OsSnippetApi.service.save($ctrl.snippet).$promise.then(function (data) {
        $ctrl.snippet.id = data.id;
      }, function (error) {
        toastText = 'Error while saving snippet!';
      }).finally(function () {
        $mdToast.show(
          $mdToast.simple()
            .textContent(toastText)
            .position('bottom')
            .hideDelay(3000)
        );
      });
    };
  }

})();
