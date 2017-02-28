(function () {

  'use strict';

  angular.module('openSnap')
    .config(infoConfig);

  infoConfig.$inject = ['$stateProvider'];

  function infoConfig($stateProvider) {
    $stateProvider.state('info', {
      url: '/info',
      component: 'osInfo',
      data: {
        title: 'Info'
      }
    })
  }

})();
