(function () {
  'use strict';

  angular.module('openSnap')
    .controller('OsRunController', OsRunController);

  OsRunController.$inject = ['$scope', '$mdDialog', '$timeout', 'gameCode1', 'gameCode2'];
  function OsRunController($scope, $mdDialog, $timeout, gameCode1, gameCode2) {
    var $ctrl = this;

    $ctrl.initGame = function () {
      if (gameCode2) {
        $ctrl.game = new Phaser.Game(1220, 610, Phaser.AUTO, 'snake');
        $ctrl.game.state.add('Game', DoubleGame);
        DoubleGame.code1 = gameCode1;
        DoubleGame.code2 = gameCode2;
      } else {
        $ctrl.game = new Phaser.Game(610, 610, Phaser.AUTO, 'snake');
        $ctrl.game.state.add('Game', Game);
        $ctrl.game.state.add('GameOver', GameOver);
        Game.code = gameCode1;
      }

      $ctrl.isLoading = false;
      $ctrl.game.state.start('Game');
    };

    $scope.$on('$destroy', function () {
      $ctrl.game.destroy();
    });

    $ctrl.close = function () {
      $mdDialog.hide();
    };

    $ctrl.isLoading = true;
    $timeout($ctrl.initGame, 800);
  }

})();
