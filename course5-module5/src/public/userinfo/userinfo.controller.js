(function () {
    "use strict";
    
    angular.module('public')
    .controller('UserInfoController', UserInfoController);
    
    UserInfoController.$inject = ['userInfo', 'ApiPath'];
    function UserInfoController(userInfo, ApiPath) {
      var uiCtrl = this;
      uiCtrl.user = userInfo;
      uiCtrl.path = ApiPath;
//      console.log("UserInfoController, uiCtrl.user = ", uiCtrl.user);
    }
    
    })();
    