(function () {

  'use strict';

  angular.module('openSnap', [
    'ui.router',
    'ngMaterial',
    'anim-in-out'
  ]).config(osConfig);

  osConfig.$inject = ['$urlRouterProvider', '$locationProvider', '$mdThemingProvider', '$transitionsProvider'];
  function osConfig($urlRouterProvider, $locationProvider, $mdThemingProvider, $transitionsProvider) {
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
