var loginApp = angular.module("loginApp",[]);

loginApp.controller("loginController",function($scope,$http)

{
	

	console.log("Login Controller loaded");

	$scope.authenticate = function(){

		alert("login called");
		console.log("login method call");

		console.log($scope.username,$scope.password);

		$http.post("/authenticate",{"username":$scope.username,"password":$scope.password}).
		then(function(response){


			console.log(response);

			window.location.assign("/about.html");
		})
	}

}





)