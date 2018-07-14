(function () {
    'use strict';
    
    angular.module('MenuApp')
    .config(RoutesConfig);
    
    RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
    function RoutesConfig($stateProvider, $urlRouterProvider) {
    
      // Redirect to home page if no other URL matches
      $urlRouterProvider.otherwise('/');
    
      // *** Set up UI states ***
      $stateProvider
    
      // Home page
      .state('home', {
        url: '/',
        templateUrl: 'src/menuapp/templates/home.template.html'
      })
    
      // Categories page
      .state('categories', {
        url: '/categories',
        templateUrl: 'src/menuapp/templates/categories.template.html',
        controller: 'CategoriesController as catCtlr',
        resolve: {
          citems: ['MenuDataService', function (MenuDataService) {
            return MenuDataService.getAllCategories();
          }]
        }
      })
    
      // Items page for selected category
      .state('items', {
        url: '/items/{short_name}',
        templateUrl: 'src/menuapp/templates/items.template.html',
        controller: 'ItemsController as itemsCtlr',
        resolve: {
            items: ['$stateParams', 'MenuDataService', 
                function ($stateParams, MenuDataService) {
                    return MenuDataService.getItemsForCategory($stateParams.short_name);
//                    return MenuDataService.getItemsForCategory("C");
                }]
        }
      });
    
    }
    
    })();    