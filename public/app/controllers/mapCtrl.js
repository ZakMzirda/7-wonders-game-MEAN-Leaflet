angular.module('mapControllers', [])
.controller('leafletCtrl',function($scope, $http){
	var mymap = L.map('mapid').setView([0, 0, 0], 2);
	
	//$scope.ville = "";
	$scope.question=[];
	$scope.crdx=[];
	$scope.crdy=[];
	$scope.ids=[];

	$scope.donnee=null;
	var info =this;//pour pouvoir recuperer les donnes a l'interieur des fonctions et les utiliser dans les pages html

	L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
		maxZoom: 18,
		minZoom: 2,
		id: 'mapbox.streets'
	}).addTo(mymap);

	//icon
	var redIcon = L.icon({
		iconUrl: 'outils/images/redmarker.png',
		iconSize:     [20, 30], // size of the icon
		
	});

	//markers
	L.marker([48.8583701, 2.2922926], {icon: redIcon}).addTo(mymap)
		.bindPopup("La tour eiffel").openPopup();
	L.marker([48.8583701, 2.2922926], {icon: redIcon}).addTo(mymap);

	//rome
	L.marker([41.8902102, 12.4900422], {icon: redIcon}).addTo(mymap);
	//chine
	L.marker([40.4319077, 116.5681862], {icon: redIcon}).addTo(mymap);
	//petra
	L.marker([30.3284544, 35.4421735], {icon: redIcon}).addTo(mymap);
	//Le Christ Rédempteur à Rio de Janeiro
	L.marker([-22.951916, -43.2126759], {icon: redIcon}).addTo(mymap);
	//Machu Picchu 
	L.marker([-13.1631412, -72.5471516], {icon: redIcon}).addTo(mymap);
	//Chichen Itza
	L.marker([20.6842849, -88.5699713], {icon: redIcon}).addTo(mymap);
	//Le Taj Mahal
	L.marker([27.1750151, 78.0399665], {icon: redIcon}).addTo(mymap);

	//fonction pour avoir le nom de ville avec un click & les coordonnées de l'endroit
	var popup = L.popup();
	function onMapClick(e) {
		popup
			.setLatLng(e.latlng)
			.setContent("Les coordonnées de cet endroit " + e.latlng.toString())
			.openOn(mymap);
		/*$http.get("https://nominatim.openstreetmap.org/reverse?format=json&lat="+e.latlng.lat+"&lon="+e.latlng.lng)
		.success(function (response) {
			$scope.ville=response.address.town;
			//console.log($scope.ville);
		})	*/
	}
	
	info.nbrofclick = 0;
	//info.i=0;
	this.getrndQuestion=function Getrndquestion(){
		info.rndquestion="";
		$http.get('api/GetQuestion').success(function (response) {
			
			var taille = response.maquestion.length;
			var randomvalue = Math.floor(Math.random() * taille)
			for(var i =0; i<taille; i++){
				$scope.question[i]=response.maquestion[i].laquestion;
				$scope.crdx[i]=response.maquestion[i].coordonnee_x;
				$scope.crdy[i]=response.maquestion[i].coordonnee_y;
				$scope.ids[i]=response.maquestion[i]._id;
			}
			
			var randomQuestion = $scope.question[randomvalue];
			var randomQuestion_crdx = $scope.crdx[randomvalue];
			var randomQuestion_crdy = $scope.crdy[randomvalue];
			var id = $scope.ids[randomvalue];
		
			//console.log(randomQuestion);
			//console.log(randomQuestion_crdx);
			//console.log(randomQuestion_crdy);
			function CalculDistance(e){
				var score = 100;
				//var i = 0;
				var distance = Math.sqrt(((randomQuestion_crdx-e.latlng.lat)*(randomQuestion_crdx-e.latlng.lat))
				+((randomQuestion_crdy-e.latlng.lng)*(randomQuestion_crdy-e.latlng.lng)));
				console.log('Distance : '+ distance);
				//requete pour recuperer les données json
				if(distance <= 0.4){
					
					info.chance='Excellent!! votre score est '+ score +' sur 100';
					console.log(info.chance);
				}
				if(distance > 0.4 && distance<=0.5){
					score=score-5;
					info.chance='Bien! votre score est '+ score +' sur 100, presque parfait!';
				}
				if(distance > 0.5 && distance<=0.6){
					score=score-10;
					
					info.chance='Vous étiez proche! votre score est '+score+' sur 100, vous pouvez faire mieux';
				}
				if(distance>0.6 && distance <= 0.7){
					score=score-30;
					
					info.chance='Vous êtes un peu loin là! votre score est '+score +' sur 100';					
				}
				if(distance>0.7 && distance <= 0.9){
					score=score-80;
					
					info.chance='Vous êtes loin! votre score est '+score +' sur 100';					
				}
				if(distance>0.9){
					score=score-100;
					
					info.chance='Oulala trop loin!! votre score est '+score +' sur 100';					
				}
				console.log(randomQuestion);

				//Mettre le score dans la base de données
				$http.get('/api/addScore/'+id).success(function (response) {
					//$scope.getscore=response.les_scores
					//console.log("response "+" "+$scope.getscore);
					
						$scope.donnee=response;
						$scope.donnee.les_scores=score;
						console.log('le score dans get '+score);
						$http.put('/api/addScore/'+id, $scope.donnee).success(function (response) {
						console.log($scope.donnee);
					})
						
				})
				//i++;
				//console.log('i = '+i);	
			}
			info.rndquestion=randomQuestion;
			
			//console.log(info.nbrofclick);

			if(info.nbrofclick>2){
				info.chance=null;
				info.nbrofclick=1;
			}


			mymap.on('click', CalculDistance);
		
			
		})
		info.nbrofclick++;

		mymap.on('click', Getrndquestion);
	}
	this.resetquestion=function resetQuestion(){
		info.chance=null;
		info.randomQuestion=null;
		info.nbrofclick=0;
	}
	
	mymap.on('click', onMapClick);
	

});