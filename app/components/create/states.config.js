(function () {
  
  'use strict';

  angular.module('openSnap')
    .config(createConfig);

  createConfig.$inject = ['$stateProvider'];
  function createConfig($stateProvider) {
    $stateProvider.state('create', {
      url: '/create',
      component: 'osCreate',
      data: {
        title: 'Create New Snippet'
      }
    })
  }

})();
