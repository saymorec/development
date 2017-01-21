(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.constant('ApiBasePath', "http://davids-restaurant.herokuapp.com")
.directive('foundItems', FoundItemsDirective);

function FoundItemsDirective() {
  var ddo = {
    templateUrl: 'foundItems.html',
    scope: {
      found: '<',
      onRemove: '&'
    }
  };

  return ddo;
}


NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
  var menu = this;

  menu.MenuItems = function (searchTerm) {
    var promise  = MenuSearchService.getMatchedMenuItems(searchTerm);
    promise.then( function (result) {

    menu.found = result;

    })
  };

  menu.removeItem = function (index) {
    menu.found.splice(index, 1);
  };

}


MenuSearchService.$inject = ['$http', 'ApiBasePath'];
function MenuSearchService($http, ApiBasePath) {
  var service = this;

  service.getMatchedMenuItems = function (searchTerm) {

    return $http({
        method: "GET",
        url: (ApiBasePath + "/menu_items.json")
      }).then(function (result) {
      // process result and only keep items that match

      var my_array = result.data["menu_items"];
      var foundItems = [];

      for (var i = my_array.length - 1; i >= 0; i--) {
        if (my_array[i].description.toLowerCase().indexOf(searchTerm) !== -1) {
          foundItems.push(my_array[i]);
        };
      }

      // return processed items
      return foundItems;
      });
  };
}


})(); // end of IIFE
