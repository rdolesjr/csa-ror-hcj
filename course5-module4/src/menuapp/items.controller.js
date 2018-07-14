(function () {
    'use strict'; 
    
    angular.module('MenuApp')
    .controller('ItemsController', ItemsController);
    
    ItemsController.$inject = ['items'];
    function ItemsController(items) {
      var itemsCtlr = this;
//console.log("In ItemsController, items = ", items);
      itemsCtlr.items = items;
    }
    
})();    