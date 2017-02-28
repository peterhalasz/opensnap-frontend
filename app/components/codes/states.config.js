(function () {

  'use strict';

  angular.module('openSnap')
    .config(homeConfig);

  homeConfig.$inject = ['$stateProvider'];
  function homeConfig($stateProvider) {
    $stateProvider.state('codes', {
      url: '/codes',
      component: 'osCodes',
      data: {
        title: 'Codes'
      }
    })
  }

})();
