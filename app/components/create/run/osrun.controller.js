(function () {
  'use strict';

  angular.module('openSnap')
    .controller('OsRunController', OsRunController);

  OsRunController.$inject = ['$scope', '$mdDialog', '$timeout', 'gameCode'];
  function OsRunController($scope, $mdDialog, $timeout, gameCode) {
    var $ctrl = this;

    $ctrl.initGame = function () {
      $ctrl.game = new Phaser.Game(1000, 500, Phaser.AUTO, 'snake');
      $ctrl.game.state.add('Game', Game);
      $ctrl.game.state.add('Game_Over', Game_Over);
      $ctrl.isLoading = false;
      Game.code = gameCode;
      $ctrl.game.state.start('Game');
    };

    $scope.$on('$destroy', function () {
      $ctrl.game = null;
    });

    $ctrl.close = function () {
      $mdDialog.hide();
    };

    $ctrl.isLoading = true;
    $timeout($ctrl.initGame, 800);
  }

})();
