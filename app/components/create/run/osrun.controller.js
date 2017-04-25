(function () {
  'use strict';

  angular.module('openSnap')
    .controller('OsRunController', OsRunController);

  OsRunController.$inject = ['$scope', '$mdDialog', '$timeout', 'gameCode1', 'gameCode2'];
  function OsRunController($scope, $mdDialog, $timeout, gameCode1, gameCode2) {
    var $ctrl = this;

    $ctrl.initGame = function () {
      $ctrl.game = new Phaser.Game(610, 610, Phaser.AUTO, 'snake1');
      $ctrl.game.state.add('Game', Game);
      $ctrl.game.state.add('GameOver', GameOver);
      $ctrl.isLoading = false;
      Game.code = gameCode1;

      // if (gameCode2) {
      //   $ctrl.game2 = new Phaser.Game(610, 610, Phaser.AUTO, 'snake2');
      //   $ctrl.game2.state.add('Game', Game2);
      //   $ctrl.game2.state.add('GameOver', GameOver);
      //   Game2.code = gameCode2;

      // }
      $ctrl.game.state.start('Game');
      // $ctrl.game2.state.start('Game');
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
