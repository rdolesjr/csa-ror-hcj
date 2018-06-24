(function () {
'use strict';

angular.module('ShoppingListCheckOff', [])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService);

ToBuyController.$inject = ['ShoppingListCheckOffService'];
function ToBuyController(ShoppingListCheckOffService) {
  var buy = this;
  buy.toBuyItems = ShoppingListCheckOffService.getToBuyItems();

  buy.buyItem = function (index) {
    ShoppingListCheckOffService.buyItem(index);
  }
}

AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtController(ShoppingListCheckOffService) {
  var bought = this;
  bought.boughtItems = ShoppingListCheckOffService.getBoughtItems();
}

function ShoppingListCheckOffService() {
  var service = this;

  var itemsToBuy = [  {name: "gallon of milk", quantity: "1"},
                      {name: "apples", quantity: "5"},
                      {name: "bananas", quantity: "6"},
                      {name: "loaf of bread", quantity: "1"},
                      {name: "frozen pizzas", quantity: "2"},
                      {name: "boxes of cereal", quantity: "2"},
                      {name: "cartons of ice cream", quantity: "3"}  ];
  var itemsBought = [];

  service.buyItem = function (index) {
    console.log(index);
    console.log(itemsToBuy);
    console.log(itemsBought);
    itemsBought.push(itemsToBuy[index]);
    itemsToBuy.splice(index, 1);
  };

  service.getToBuyItems = function () {
    return itemsToBuy;
  };

  service.getBoughtItems = function () {
    return itemsBought;
  };
}

})();
