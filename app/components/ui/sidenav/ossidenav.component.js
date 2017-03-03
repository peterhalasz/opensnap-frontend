(function () {

  'use strict';

  angular.module('openSnap')
    .component('osSidenav', {
      templateUrl: 'components/ui/sidenav/ossidenav.html',
      controller: OsSidenavController
    });

  OsSidenavController.$inject = ['$transitions', 'CONFIG'];

  function OsSidenavController($transitions, CONFIG) {
    var $ctrl = this;

    $ctrl.updateCurrentState = function (state) {
      $ctrl.currentState = state.router.stateService.current.name;
    };

    $ctrl.$onInit = function () {
      $ctrl.deregisterTransitionHook = $transitions.onSuccess({
        to: '*',
        from: '*'
      }, $ctrl.updateCurrentState);
      $ctrl.currentState = $transitions._router.stateService.current.name;
      $ctrl.menuItems = CONFIG.menuItems;
    };

    $ctrl.$onDestroy = function () {
      $ctrl.deregisterTransitionHook();
    };

  }

})();
