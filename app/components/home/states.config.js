(function () {

  'use strict';

  angular.module('openSnap')
    .config(homeConfig);

  homeConfig.$inject = ['$stateProvider'];
  function homeConfig($stateProvider) {
    $stateProvider.state('home', {
      url: '/home',
      component: 'osHome',
      data: {
        title: 'Dashboard'
      }
    })
  }

})();
