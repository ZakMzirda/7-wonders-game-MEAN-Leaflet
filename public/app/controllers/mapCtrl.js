angular.module('mapControllers', [])
.controller('leafletCtrl',function($scope, $http){
	var mymap = L.map('mapid').setView([48.8583701, 2.2922926, 17], 13);
	var coordx = 48.8583701;
	var coordy = 2.2922926;
	$scope.ville = "";
	$scope.question=[];
	L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
		maxZoom: 8,
		id: 'mapbox.streets'
	}).addTo(mymap);
	L.marker([48.8583701, 2.2922926, 17]).addTo(mymap)
		.bindPopup("La tour eiffel").openPopup();
	
	/*Avoir les coordonnées x et y*/ 
		
	var popup = L.popup();
	function onMapClick(e) {
		popup
			.setLatLng(e.latlng)
			.setContent("Les coordonnées de cet endroit " + e.latlng.toString())
			.openOn(mymap);
		$http.get("https://nominatim.openstreetmap.org/reverse?format=json&lat="+e.latlng.lat+"&lon="+e.latlng.lng)
		.success(function (response) {
			$scope.ville=response.address.town;
			console.log($scope.ville);
		})	
	}

	function CalculDistance(e){
		var score = 100;
		var distance = Math.sqrt(((coordx-e.latlng.lat)*(coordx-e.latlng.lat))+((coordy-e.latlng.lng)*(coordy-e.latlng.lng)));
		//console.log('Distance : '+ distance);
		//requete pour recuperer les données json
		$http.get('api/GetQuestion').success(function (response) {
			var taille = response.maquestion.length;
			for(var i =0; i<taille; i++){
				$scope.question[i]=response.maquestion[i].laquestion;
				//console.log($scope.question[i]);
			}
			//console.log($scope.question)
			
		})	

		if(distance <= 0.1){
			console.log('Bien joué! votre score est '+ score);
		}
		if(distance >= 0.1){
			score=score-80;
			console.log('Vous êtes loin! votre score est '+score);
		}
	}
	
	//mymap.on('click', onMapClick);
	mymap.on('click', CalculDistance);

});
