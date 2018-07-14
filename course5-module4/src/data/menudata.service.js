(function () {
    'use strict';

    angular.module('data')
    .service('MenuDataService', MenuDataService);
    
    MenuDataService.$inject = ['$http'];
    function MenuDataService($http) {
      var service = this;
    
      service.getAllCategories = function () {
    
        return $http( { method: "GET", 
                        url: "https://davids-restaurant.herokuapp.com/categories.json" } )
                    .then ( function (result) {
                        var categories = result.data;
//console.log("category count " + categories.length);
//console.log(categories);
                        return categories;
                    });
      };
    
      service.getItemsForCategory = function (categoryShortName) {

//console.log("categoryShortName = " + categoryShortName);
        var categoryUrl = "https://davids-restaurant.herokuapp.com/menu_items.json" + "?category=" + categoryShortName;
//console.log("categoryUrl = " + categoryUrl);
            return $http( { method: "GET", 
                            url: categoryUrl } )
                        .then ( function (result) {
                            var categoryItems = result.data.menu_items;
//console.log("category item count " + categoryItems.length);
//console.log(categoryItems);
                            return categoryItems;
                        } );
          };

        }
        
})();    