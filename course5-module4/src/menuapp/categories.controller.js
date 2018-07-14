(function () {
    'use strict';
    
    angular.module('MenuApp')
    .controller('CategoriesController', CategoriesController);
    
    CategoriesController.$inject = ['citems'];
    function CategoriesController(citems) {
      var catCtlr = this;
      catCtlr.citems = citems;
    }
    
    })();    