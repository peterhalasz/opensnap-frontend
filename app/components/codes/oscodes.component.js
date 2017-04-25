(function () {

  'use strict';

  angular.module('openSnap')
    .component('osCodes', {
      templateUrl: 'components/codes/oscodes.html',
      controller: OsCodesController,
      bindings: {
        snippets: '<'
      }
    });

  OsCodesController.$inject = ['OsSnippetApi', '$mdDialog'];
  function OsCodesController(OsSnippetApi, $mdDialog) {
    var $ctrl = this;
    $ctrl.markedForRunning = [];
    $ctrl.checkboxSelected = function (snippet) {
      if (snippet.markToRun) {
        $ctrl.markedForRunning.push(snippet._id);
      }
      else {
        $ctrl.markedForRunning.splice($ctrl.markedForRunning.indexOf(snippet._id), 1);
      }
    };

    $ctrl.canMark = function () {
      return $ctrl.markedForRunning.length !== 2;
    };

    $ctrl.runCompetition = function () {
      if ($ctrl.canMark()) return false;
      OsSnippetApi.service.get({id: $ctrl.markedForRunning[0]}).$promise.then(function (data) {
        var s1 = data;
        OsSnippetApi.service.get({id: $ctrl.markedForRunning[1]}).$promise.then(function (data) {
          var s2 = data;
          $mdDialog.show({
            controller: 'OsRunController',
            templateUrl: 'components/create/run/osrun.html',
            parent: angular.element(document.body),
            clickOutsideToClose: false,
            controllerAs: '$ctrl',
            locals: {
              gameCode1: s1.code,
              gameCode2: s2.code
            }
          });
        })
      })
    }

  }

})();
