(function () {

  'use strict';

  angular.module('openSnap')
    .config(homeConfig);

  homeConfig.$inject = ['$stateProvider'];
  function homeConfig($stateProvider) {
    $stateProvider.state('codes', {
      url: '/snippets',
      component: 'osCodes',
      data: {
        title: 'Snippets'
      },
      resolve: {
        snippets: ['OsSnippetApi', function (OsSnippetApi) {
          return OsSnippetApi.service.query();
        }]
      }
    })
  }

})();
