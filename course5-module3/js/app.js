(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.directive('foundItems', FoundItemsDirective);

function FoundItemsDirective() {
  var ddo = {
    templateUrl: 'foundItems.html',
    scope: {
      items: '<',
      title: '<',
      flag: '<',
      onRemove: '&'
    }
  };

  return ddo;
}

NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
  var nidCtl = this;

  nidCtl.title = "Filtered Menu Items";
  nidCtl.found = [];
  nidCtl.searchTerm = "";
  nidCtl.flag = "start";

  nidCtl.searchMenu = function () {
  //console.log(nidCtl.searchTerm + " has length " + nidCtl.searchTerm.length);
    if (nidCtl.searchTerm.length > 0) { 
      var promise = MenuSearchService.GetMatchedMenuItems(nidCtl.searchTerm);
      promise.then( function(response) {
        nidCtl.found = response;
        }).catch( function(error) {
          console.log("MenuSearchService.GetMatchedMenuItems() failed, error = ", error);
        });
    }
    nidCtl.flag = "";
  }

  nidCtl.removeItem = function (itemIndex) {
//console.log("Removing index " + itemIndex);
    nidCtl.found.splice(itemIndex, 1);
  };
}

MenuSearchService.$inject = ['$http'];
function MenuSearchService($http) {
  var service = this;

  service.GetMatchedMenuItems = function (searchTerm) {
//console.log("searchTerm = " + searchTerm);

    return $http( { method: "GET", 
                    url: "https://davids-restaurant.herokuapp.com/menu_items.json", 
                    params: { searchTerm: searchTerm } } ).then ( function (result) {
                      var allItems = result.data.menu_items;
                      var foundItems = [];
//console.log("total item count " + allItems.length);
                      for (var i=0 ; i<allItems.length ; i++) {
                        if (allItems[i].description.toLowerCase().indexOf(searchTerm) >= 0) {
                          foundItems.push(allItems[i]);
                        }
                      }
//console.log("filtered item count " + foundItems.length);
//console.log(foundItems);
                      return foundItems;
                    } );
  };
}

})();
