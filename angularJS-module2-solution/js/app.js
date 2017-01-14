(function () {  //declare the IIFE to avoid variable leaks
'use strict';  // enforce strict syntax checking

angular.module('ShoppingListCheckOff', [])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService);

ToBuyController.$inject = ['ShoppingListCheckOffService'];
function ToBuyController(ShoppingListCheckOffService) {
  var itemsBuy = this;
	itemsBuy.items = ShoppingListCheckOffService.getItemsToBuy();

  itemsBuy.boughtItem = function (itemIndex) {
    	ShoppingListCheckOffService.boughtItem(itemIndex);
  };
}

AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtController(ShoppingListCheckOffService) {
  var itemsBought = this;

  itemsBought.items = ShoppingListCheckOffService.getItemsBought();
}


function ShoppingListCheckOffService() {
  var service = this;

  // List of shopping items to buy
  var itemsBuy = [
		{name: "Milk", quantity: "2 bottles"},
		{name: "Bread", quantity: "1 loaf"},
		{name: "Yorghurt", quantity: "2 containers"},
		{name: "Beef", quantity: "2 kg"},
		{name: "Cookies", quantity: "2 bags"}
	];

	// List of shopping items to bought
	var itemsBought = [];

	// once an item is bought, remove it from itemsBuy and push it to itemBought
	service.boughtItem = function (itemIdex) {
		itemsBought.push(itemsBuy[itemIdex]);
		itemsBuy.splice(itemIdex, 1);
	};

	// retrieve items to buy
  service.getItemsToBuy = function () {
    return itemsBuy;
  };

	// retrieve items bought
  service.getItemsBought = function () {
    return itemsBought;
  };
}

})();
