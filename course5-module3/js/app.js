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
      message: '<',
      onRemove: '&'
    }
  };

  return ddo;
}

NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
  var nidCtl = this;

  nidCtl.found = [];
  nidCtl.searchTerm = "";
  nidCtl.message = "";
  nidCtl.title = "Filtered Menu Items (" + nidCtl.found.length + ")";

  nidCtl.searchMenu = function () {
  //console.log(nidCtl.searchTerm + " has length " + nidCtl.searchTerm.length);
    if (nidCtl.searchTerm.length > 0) { 
      var promise = MenuSearchService.GetMatchedMenuItems(nidCtl.searchTerm);
      promise.then( function(response) {
        nidCtl.found = response;
        if (nidCtl.found.length === 0) {
          nidCtl.message = "Nothing found";
          nidCtl.title = "Filtered Menu Items (" + nidCtl.found.length + ")";
        }
        else {
          nidCtl.message = "";
          nidCtl.title = "Filtered Menu Items (" + nidCtl.found.length + ")";
        }
        }).catch( function(error) {
          nidCtl.found = [];
          nidCtl.message = "Error from menu search service - please try again";
          nidCtl.title = "Filtered Menu Items (" + nidCtl.found.length + ")";
          console.log("MenuSearchService.GetMatchedMenuItems() failed, error = ", error);
        });
    }
    else {
      nidCtl.found = [];
      nidCtl.message = "Nothing found";
      nidCtl.title = "Filtered Menu Items (" + nidCtl.found.length + ")";
    }
  }

  nidCtl.removeItem = function (itemIndex) {
//console.log("Removing index " + itemIndex);
    nidCtl.found.splice(itemIndex, 1);
    nidCtl.title = "Filtered Menu Items (" + nidCtl.found.length + ")";
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
