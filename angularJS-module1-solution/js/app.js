(function () {  //declare the IIFE to avoid variable leaks
'use strict';  // enforce strict syntax checking

angular.module('LunchCheck', [])
	.controller('LunchCheckController', LunchCheckController);

	LunchCheckController.$inject = ['$scope'];

	var cssClasses = ["default-class", "red-class", "green-class"]

	function stripEmptyItems (inputArray) {
		// This function strips off empty items from inputArray
		var newArray = [];
		inputArray.forEach(function (item, index, array) {
  			if (item != "") {
  				newArray.push(item)
  			};
		});
		return newArray;
	};

	function LunchCheckController($scope) {
		$scope.name = "";
		$scope.message = "";
		$scope.colorClass = cssClasses[0];

	  	$scope.lunchChecker = function () {
	  		// accept a list of strings and convert into an array
	  		// strip off empty elements from the list
	  		// return the message based on the input:
	  		//    	0 -->  "Please enter data first"
	  		//    	1,2,3 --> "Enjoy"
	  		//   	> 3 --> "Too much!"

	  		var arrayOfStrings = stripEmptyItems($scope.name.split(","));

	  		if (arrayOfStrings.length === 0) {
	  			$scope.message = "Please enter data first";
	  			$scope.colorClass = cssClasses[1];
	  		} else if (arrayOfStrings.length <= 3) {
	  			$scope.message = "Enjoy";
	  			$scope.colorClass = cssClasses[2];
	  		} else {
	  			$scope.message = "Too much!";
	  			$scope.colorClass = cssClasses[2];
	  		}
	  };

	  $scope.cssClassReset = function () {
	  	$scope.name = "";
	  	$scope.message = "";
	  	$scope.colorClass = cssClasses[0];
	  };
	};

})();
