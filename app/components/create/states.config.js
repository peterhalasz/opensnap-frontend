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
    }).state('edit', {
      url: '/snippets/:id',
      component: 'osCreate',
      data: {
        title: 'Edit Snippet'
      },
      resolve: {
        snippet: ['OsSnippetApi', '$stateParams', function (OsSnippetApi, $stateParams) {
          return OsSnippetApi.service.get($stateParams).$promise;
        }]
      }
    })
  }

})();
