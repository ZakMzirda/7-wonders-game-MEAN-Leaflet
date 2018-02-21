angular.module('mapControllers', [])
.controller('leafletCtrl',function($scope, $http){
	var mymap = L.map('mapid').setView([0, 0, 0], 2);
	
	//$scope.ville = "";
	$scope.question=[];
	$scope.randomvalue=0;
	$scope.crdx=[];
	$scope.crdy=[];
	$scope.ids=[];
	$scope.ApiCall='';
	$scope.essais=0;
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

	var greenIcon = L.icon({
		iconUrl: 'outils/images/greenmarker.ico',
		iconSize:     [20, 30], // size of the icon
		
	});


	//markers
	/*L.marker([48.8583701, 2.2922926], {icon: redIcon}).addTo(mymap)
		.bindPopup("La tour eiffel").openPopup();
	L.marker([48.8583701, 2.2922926], {icon: redIcon}).addTo(mymap);*/

	//merveilles du monde
	//la pyramide de Khéops
	L.marker([29.9792345, 31.1320132], {icon: redIcon}).addTo(mymap);
	//les jardins suspendus de Babylone
	L.marker([48.9198611, 2.3410332], {icon: redIcon}).addTo(mymap);
	//la statue de Zeus
	L.marker([37.6384588, 21.6276909], {icon: redIcon}).addTo(mymap);
	//le mausolée d'Halicarnasse
	L.marker([37.038132, 27.4221962], {icon: redIcon}).addTo(mymap);
	//le Temple d'Artémis
	L.marker([37.9493601, 27.3616675], {icon: redIcon}).addTo(mymap);
	//le Colosse de Rhodes
	L.marker([36.4510656, 28.2236446], {icon: redIcon}).addTo(mymap);
	//le Phare d'Alexandrie
	L.marker([48.9671362, 2.3423655], {icon: redIcon}).addTo(mymap);

	//merveilles d'afrique
	// Mont Kilimandjaro
	L.marker([-3.0674245, 37.3381177], {icon: greenIcon}).addTo(mymap);
	//Le lac Retba
	L.marker([14.8417276, -17.2453492], {icon: greenIcon}).addTo(mymap);
	//le Parc des Tsingy de Bemaraha
	L.marker([-18.89767, 44.8276213], {icon: greenIcon}).addTo(mymap);
	//Piton de la Fournaise
	L.marker([-21.2494278, 55.6762222], {icon: greenIcon}).addTo(mymap);
	//le Lac Turkana
	L.marker([3.4561582, 35.1471546], {icon: greenIcon}).addTo(mymap);
	//Les Cascades de Hammam Chellala 
	L.marker([36.4599982, 7.2524904], {icon: greenIcon}).addTo(mymap);
	//La vallée du récif de la Mer rouge
	L.marker([19.1471325, 23.4898441], {icon: greenIcon}).addTo(mymap);

	//fonction pour avoir le nom de ville avec un click & les coordonnées de l'endroit
	var popup = L.popup();
	/*function onMapClick(e) {
		popup
			.setLatLng(e.latlng)
			.setContent("Les coordonnées de cet endroit " + e.latlng.toString())
			.openOn(mymap);
		//$http.get("https://nominatim.openstreetmap.org/reverse?format=json&lat="+e.latlng.lat+"&lon="+e.latlng.lng)
		//.success(function (response) {
		//	$scope.ville=response.address.town;
			//console.log($scope.ville);
		//})	
	}*/
	
	info.nbrofclick = 0;
	info.showHide=true;
	this.ChangeToApiForm=function changeApiForm(){
		$scope.ApiCall='GetQuestionsFromForm';
		info.showHide=false;
	}
	this.ChangeToApiFile=function changeApiFile(){
		info.showHide=false;
		$scope.ApiCall='GetQuestionsFromFile';
	}
	this.resetquestion=function resetQuestion(){
		info.rndquestion='';
		info.showHide=true;
		$scope.essais=0;
	}
	
	this.getrndQuestion=function Getrndquestion(){
		info.rndquestion="";
		
		$http.get('api/'+$scope.ApiCall).success(function (response) {
			var taille = response.maquestion.length;
			$scope.randomvalue = Math.floor(Math.random() * taille)
			for(var i =0; i<taille; i++){
				$scope.question[i]=response.maquestion[i].laquestion;
				$scope.crdx[i]=response.maquestion[i].coordonnee_x;
				$scope.crdy[i]=response.maquestion[i].coordonnee_y;
				$scope.ids[i]=response.maquestion[i]._id;
			}
			
			//conversion en base64 de l'image 
			var imgdata =response.maquestion[0].merveille_image.data;
			//console.log(imgdata);
			var binary = '';
			var bytes = new Uint8Array(imgdata);
			var len = bytes.byteLength;
			for (var i = 0; i < len; i++) {
				binary += String.fromCharCode( bytes[ i ] );
			}
			info.limage=btoa(binary);
			//console.log(info.limage);
			/***************************************************************/
			var randomQuestion = $scope.question[$scope.randomvalue];
			var randomQuestion_crdx = $scope.crdx[$scope.randomvalue];
			var randomQuestion_crdy = $scope.crdy[$scope.randomvalue];
			var id = $scope.ids[$scope.randomvalue];
			
			info.rndquestion=randomQuestion;
			

			/*if(info.nbrofclick>2){
				info.chance=null;
				info.nbrofclick=1;
			}*/		
			
		})
		//info.nbrofclick++;

		//mymap.on('click', Getrndquestion);
	}//fin getrndquestion
	
	function CalculDistance(e){
		var score = 100;
		$scope.distance = Math.sqrt((($scope.crdx[$scope.randomvalue]-e.latlng.lat)*($scope.crdx[$scope.randomvalue]-e.latlng.lat))
		+(($scope.crdy[$scope.randomvalue]-e.latlng.lng)*($scope.crdy[$scope.randomvalue]-e.latlng.lng)));
		//console.log('Distance : '+ $scope.distance);
		if($scope.distance <= 0.4){
			$scope.chance='Excellent!! votre score est '+ score +' sur 100';
			console.log($scope.chance);
		}
		if($scope.distance > 0.4 && $scope.distance<=0.5){
			score=score-5;
			$scope.chance='Bien! votre score est '+ score +' sur 100, presque parfait!';
		}
		if($scope.distance > 0.5 && $scope.distance<=0.6){
			score=score-10;
			
			$scope.chance='Vous étiez proche! votre score est '+score+' sur 100, vous pouvez faire mieux';
		}
		if($scope.distance>0.6 && $scope.distance <= 0.7){
			score=score-30;
			
			$scope.chance='Vous êtes un peu loin là! votre score est '+score +' sur 100';					
		}
		if($scope.distance>0.7 && $scope.distance <= 0.9){
			score=score-80;
			$scope.chance='Vous êtes loin! votre score est '+score +' sur 100';					
		}
		if($scope.distance>0.9){
			score=score-100;
			$scope.chance='Oulala trop loin!! votre score est '+score +' sur 100';
			console.log($scope.chance);			
		}
		
		if($scope.distance && $scope.chance && info.showHide==false && $scope.essais!=4){
			popup
			.setLatLng(e.latlng)
			.setContent($scope.chance+' distance '+$scope.distance)
			.openOn(mymap);
			if(score==100 && $scope.essais<4){
				$scope.essais=3;
			}
			
			if($scope.essais==3){
				popup
			.setLatLng(e.latlng)
			.setContent('Cliquez sur Rejouer pour lancer une autre partie!')
			.openOn(mymap);
			}
			$scope.essais++;
		}
		
		console.log(info.showHide);
		console.log($scope.essais);
		//console.log($scope.question[$scope.randomvalue]);
		//Mettre le score dans la base de données
		/*$http.get('/api/addScore/'+id).success(function (response) {
				$scope.donnee=response;
				$scope.donnee.les_scores=score;
				console.log('le score dans get '+score);
				$http.put('/api/addScore/'+id, $scope.donnee).success(function (response) {
				console.log($scope.donnee);
			})
				
		})*/
	}//distance fonction

	

	mymap.on('click', CalculDistance);

	//mymap.on('click', onMapClick);
	

});