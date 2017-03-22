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

      $ctrl.editor.setValue(
        "this.moveSnake = function(snakeX, snakeY, foodX, foodY) {\n\ \t// return 'UP', 'DOWN', 'LEFT' or 'RIGHT'\n\}"
      );

      $ctrl.game = new Phaser.Game(600, 600, Phaser.AUTO, 'snake');

      $ctrl.game.state.add('Game', Game);
      $ctrl.game.state.add('Game_Over', Game_Over);
    }

    $ctrl.onRunClick = function () {
      Game.code = $ctrl.editor.getValue();
      $ctrl.game.state.start('Game');
    }

  }

})();
