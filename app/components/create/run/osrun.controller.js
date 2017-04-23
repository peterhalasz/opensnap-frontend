(function () {
  'use strict';

  angular.module('openSnap')
    .controller('OsRunController', OsRunController);

  OsRunController.$inject = ['$scope', '$mdDialog', '$timeout', 'gameCode'];
  function OsRunController($scope, $mdDialog, $timeout, gameCode) {
    var $ctrl = this;

    $ctrl.initGame = function () {
      $ctrl.game = new Phaser.Game(620, 620, Phaser.AUTO, 'snake');
      $ctrl.game.state.add('Game', Game);
      $ctrl.game.state.add('GameOver', GameOver);
      $ctrl.isLoading = false;
      Game.code = gameCode;
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
