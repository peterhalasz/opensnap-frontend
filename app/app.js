(function () {

  'use strict';

  angular.module('openSnap', [
    'ui.router',
    'ngMaterial',
    'ui.codemirror'
  ]).config(osConfig);

  osConfig.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider', '$mdThemingProvider', '$transitionsProvider'];
  function osConfig($stateProvider, $urlRouterProvider, $locationProvider, $mdThemingProvider, $transitionsProvider) {
    $locationProvider.html5Mode(true).hashPrefix('!');
    $urlRouterProvider.otherwise('/home');
    $mdThemingProvider
      .theme('default')
      .primaryPalette('teal')
      .accentPalette('yellow')
      .warnPalette('red')
      .backgroundPalette('grey');

    $transitionsProvider.onStart({to: '*', from: '*'}, function (transition) {
      var $rootScope = transition.injector().get('$rootScope');
    });

    $transitionsProvider.onSuccess({to: '*', from: '*'}, function (transition) {
      var $rootScope = transition.injector().get('$rootScope');
      $rootScope.pageTitle = transition.to().data.title;
    });
  }

})();
