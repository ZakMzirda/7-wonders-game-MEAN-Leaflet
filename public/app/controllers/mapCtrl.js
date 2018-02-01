angular.module('mapControllers', [])
.controller('leafletCtrl',function($scope, $http){
	var mymap = L.map('mapid').setView([48.8583701, 2.2922926, 17], 13);
	
	$scope.ville = "";
	$scope.question=[];
	$scope.crdx=[];
	$scope.crdy=[];

	L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
		maxZoom: 8,
		id: 'mapbox.streets'
	}).addTo(mymap);
	L.marker([48.8583701, 2.2922926, 17]).addTo(mymap)
		.bindPopup("La tour eiffel").openPopup();
	
	/*Avoir les coordonnées x et y*/ 
		
	var popup = L.popup();

	//fonction pour avoir le nom de ville avec un click
	function onMapClick(e) {
		popup
			.setLatLng(e.latlng)
			.setContent("Les coordonnées de cet endroit " + e.latlng.toString())
			.openOn(mymap);
		$http.get("https://nominatim.openstreetmap.org/reverse?format=json&lat="+e.latlng.lat+"&lon="+e.latlng.lng)
		.success(function (response) {
			$scope.ville=response.address.town;
			//console.log($scope.ville);
		})	
	}
	this.getrndQuestion=function Getrndquestion(){
		$http.get('api/GetQuestion').success(function (response) {
			
			var taille = response.maquestion.length;
			var randomvalue = Math.floor(Math.random() * taille)
			for(var i =0; i<taille; i++){
				$scope.question[i]=response.maquestion[i].laquestion;
				$scope.crdx[i]=response.maquestion[i].coordonnee_x;
				$scope.crdy[i]=response.maquestion[i].coordonnee_y;

			}

			
			var randomQuestion = $scope.question[randomvalue];
			var randomQuestion_crdx = $scope.crdx[randomvalue];
			var randomQuestion_crdy = $scope.crdy[randomvalue];
			
			console.log(randomQuestion);
			//console.log(randomQuestion_crdx);
			//console.log(randomQuestion_crdy);

			function CalculDistance(e){
				var score = 100;
				var distance = Math.sqrt(((randomQuestion_crdx-e.latlng.lat)*(randomQuestion_crdx-e.latlng.lat))+((randomQuestion_crdy-e.latlng.lng)*(randomQuestion_crdy-e.latlng.lng)));
				console.log('Distance : '+ distance);
				//requete pour recuperer les données json
				
				if(distance <= 0.4){
					console.log('Bien joué! votre score est '+ score);
				}
				if(distance >= 0.44 && distance<=0.66){
					score=score-20;
					console.log('Vous êtes proche! votre score est '+score);
				}
				if(distance >= 0.67 && distance<=0.8){
					score=score-50;
					console.log('Vous êtes loin! votre score est '+score);
				}
				if(distance>0.8){
					score=score-100;
					console.log('Oulala trop loin! votre score est '+score);
				}
				
			}
			mymap.on('click', CalculDistance);

		})
		
	}
	
	
	mymap.on('click', onMapClick);
	

});