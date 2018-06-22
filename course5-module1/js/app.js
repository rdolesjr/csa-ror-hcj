(function () {
'use strict';

angular.module('LunchChecker', [])
.controller('LunchCheckController', LunchCheckController);

LunchCheckController.$inject = ['$scope'];
function LunchCheckController($scope) {
  $scope.items = "";
  $scope.checkResult = "";
  $scope.itemString = "";

  $scope.checkLunch = function() {
    var items = $scope.itemString.split(",").filter(isNotEmptyString);
    // console.log("itemString <" + $scope.itemString + ">");
    // console.log("itemString.length = " + $scope.itemString.length);
    // console.log("items.length = " + items.length);
    // for (var i=0 ; i<items.length ; i++)
    //   console.log("items[" + i + "] = " + items[i]);
    if (items.length == 0) {
      $scope.checkResult = "Please enter data first"
    }
    else if (items.length <= 3) {
      $scope.checkResult = "Enjoy!"
    }
    else {
      $scope.checkResult = "Too much!"
    }
  }
}

function isNotEmptyString(string) {
  return string.trim().length;
}

})();
