var app = angular.module("togetherApp");

function coachHomeControllerFn($scope,$http) {
	
	var vm = this;

	console.log("Coach Home controller loaded");

	$http.get('/getPlayers').
	then(function(response){

		console.log(response);

		vm.players = response.data;
	})

}

app.controller("coachHomeController",coachHomeControllerFn);