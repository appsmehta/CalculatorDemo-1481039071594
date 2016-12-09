var app = angular.module("togetherApp");

function intensityControllerFn($scope,$http) {
	
	var vm = this;

	console.log("Intensity Home controller loaded");

	$http.get('/getPlayers').
	then(function(response){

		//console.log(response);

		vm.players = response.data;

		$http.get('/getRunningIntensityData').
		then(function(intensityResponse){

				playerIntensityPoints = intensityResponse.data;

						angular.forEach(vm.players,function(player){

								

								player.runningIntensityPointsArray = _.findWhere(playerIntensityPoints,{"name":player.playerName});
								console.log(player.runningIntensityPointsArray);
								player.runningIntensityPoints =0;

								angular.forEach(player.runningIntensityPointsArray.data,function(intensityObj){

										player.runningIntensityPoints += intensityObj.runningIntensityPoint;


										//console.log(player.playerName + player.runningIntensityPoints);
								});

								

						})
					myFunction();

		})


		$http.get('/getWeightingIntensityData').
		then(function(intensityResponse){

				playerIntensityPoints = intensityResponse.data;

						angular.forEach(vm.players,function(player){

								

								player.weightIntensityPointsArray = _.findWhere(playerIntensityPoints,{"name":player.playerName});
								console.log(player.weightIntensityPointsArray);
								player.weightIntensityPoints =0;

								angular.forEach(player.weightIntensityPointsArray.data,function(intensityObj){

										player.weightIntensityPoints += intensityObj.weightingIntensityPoint;

										
										//console.log(player.playerName + player.runningIntensityPoints);
								});

								

						})

		})





	})

	myFunction  = function() {

	//alert("My function loaded");
  var cards = document.querySelectorAll(".card");
  console.log("length");
  console.log(cards.length);
  for ( var i  = 0, len = cards.length; i < len; i++ ) {
    var card = cards[i];
    clickListener( card );
  }

  function clickListener(card) {
  	//alert("clicked");
    card.addEventListener( "click", function() {
      var c = this.classList;
      c.contains("flipped") === true ? c.remove("flipped") : c.add("flipped");
    });
  }
} 




}

app.controller("intensityController",intensityControllerFn);