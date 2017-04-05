(function () {

  'use strict';

  angular.module('openSnap')
    .service('OsSnippetApi', OsSnippetApi);

  OsSnippetApi.$inject = ['$resource', 'CONFIG'];
  function OsSnippetApi($resource, CONFIG) {
    var snippets = $resource(CONFIG.backendUrl + 'snippets/:id',
      {
        id: '@id'
      }
    );

    return {
      'service': snippets
    }
  }

})();
