(function () {
    "use strict";
    
    angular.module('public')
    .controller('SignupController', SignupController);
    
    SignupController.$inject = ['UserService', 'MenuService'];
    function SignupController(UserService, MenuService) {
      var signupCtrl = this;
      signupCtrl.submitted = false;
      signupCtrl.completed = false;

      signupCtrl.submit = function () {
//            console.log("submit function called, looking up favorite = "+signupCtrl.user.favorite);
            signupCtrl.submitted = true;        // turn on 'wait' message
            var promise = MenuService.getMenuItem(signupCtrl.user.favorite);
            promise.then(function (response) {
//                console.log("promise success, returned ", response);
                signupCtrl.user.lookup = response;
                UserService.saveUser(signupCtrl.user);
                signupCtrl.submitted = false;   // turn off 'wait' message
                signupCtrl.completed = true;    // turn on 'saved' message
            }
            );
        };
    }
    
    })();
    
