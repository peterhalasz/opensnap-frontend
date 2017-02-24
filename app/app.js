(function () {

  'use strict';

  angular.module('openSnap', [
    'ui.router',
    'ngMaterial'
  ]).config(osConfig);

  osConfig.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];
  function osConfig($stateProvider, $urlRouterProvider, $locationProvider) {
    $locationProvider.html5Mode(true).hashPrefix('!');
    $urlRouterProvider.otherwise('/home');
  }

})();
