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

      $ctrl.game = new Phaser.Game(600, 600, Phaser.AUTO, 'snake');

      $ctrl.game.state.add('Game', Game);
    }

    $ctrl.onRunClick = function () {
      Game.code = $ctrl.editor.getValue();
      $ctrl.game.state.start('Game');
    }

  }

})();
