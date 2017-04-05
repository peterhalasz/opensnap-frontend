(function () {

  'use strict';

  angular.module('openSnap')
    .constant('CONFIG', {
      menuItems: [{
        state: 'home',
        icon: 'home'
      },
        {
          state: 'codes',
          icon: 'code'
        },
        {
          state: 'create',
          icon: 'create'
        },
        {
          state: 'info',
          icon: 'info'
        }
      ],
      backendUrl: ''
    })

})();
