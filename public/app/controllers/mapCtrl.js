angular.module('mapControllers', [])
.controller('leafletCtrl',function($scope, $http){
	var mymap = L.map('mapid').setView([0, 0, 0], 2);
	
	//$scope.ville = "";
	$scope.question=[];
	$scope.randomvalue=0;
	$scope.crdx=[];
	$scope.crdy=[];
	$scope.ids=[];
	$scope.lesimagesdata=[];
	$scope.ApiCall='';
	$scope.essais=0;
	$scope.donnee=null;
	var info =this;//pour pouvoir recuperer les donnes a l'interieur des fonctions et les utiliser dans les pages html

	L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
		maxZoom: 6,
		minZoom: 2,
		id: 'mapbox.streets'
	}).addTo(mymap);

	//icon
	var redIcon = L.icon({
		iconUrl: 'outils/images/redmarker.png',
		iconSize:     [20, 30], // taille de l'icon
		
	});

	var greenIcon = L.icon({
		iconUrl: 'outils/images/greenmarker.ico',
		iconSize:     [20, 30],
		
	});

	/*
	//markers
	//merveilles du monde
	//la pyramide de Khéops
	L.marker([29.9792345, 31.1320132], {icon: redIcon}).addTo(mymap).bindPopup("pyramide de Khéops").openPopup();
	//les jardins suspendus de Babylone
	L.marker([33.1401745, 39.2219768], {icon: redIcon}).addTo(mymap).bindPopup("les jardins suspendus de Babylone").openPopup();
	//la statue de Zeus
	L.marker([37.6384588, 21.6276909], {icon: redIcon}).addTo(mymap).bindPopup("la statue de Zeus").openPopup();
	//le mausolée d'Halicarnasse
	L.marker([37.038132, 27.4221962], {icon: redIcon}).addTo(mymap).bindPopup("le mausolée d'Halicarnasse").openPopup();
	//le Temple d'Artémis
	L.marker([37.9493601, 27.3616675], {icon: redIcon}).addTo(mymap).bindPopup("le Temple d'Artémis").openPopup();
	//le Colosse de Rhodes
	L.marker([36.4510656, 28.2236446], {icon: redIcon}).addTo(mymap).bindPopup("le Colosse de Rhodes").openPopup();
	//le Phare d'Alexandrie
	L.marker([31.2240349, 29.8148008], {icon: redIcon}).addTo(mymap).bindPopup("le Phare d'Alexandrie").openPopup();

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
	*/
	var PopupOptions =
        {
        'maxWidth': '500',
        'className' : 'custom'
        }
	var popup = L.popup(PopupOptions);
	
	//fonction pour avoir le nom de ville avec un click & les coordonnées de l'endroit
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
		info.showimage=false;

	}
	this.ChangeToApiFile=function changeApiFile(){
		
		$scope.ApiCall='GetQuestionsFromFile';
		info.showHide=false;
		info.showimage=true;

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
			if($scope.ApiCall=='GetQuestionsFromForm' && taille==0){
				location.href='/questions';
			}
			else{
				$scope.randomvalue = Math.floor(Math.random() * taille)
				for(var i =0; i<taille; i++){
					$scope.question[i]=response.maquestion[i].laquestion;
					$scope.crdx[i]=response.maquestion[i].coordonnee_x;
					$scope.crdy[i]=response.maquestion[i].coordonnee_y;
					$scope.ids[i]=response.maquestion[i]._id;
					if($scope.ApiCall=='GetQuestionsFromFile'){
						
						$scope.lesimagesdata[i]=response.maquestion[i].merveille_image.data;
					}
				}
				
				/***************************************************************/
				var randomQuestion = $scope.question[$scope.randomvalue];
				var randomQuestion_crdx = $scope.crdx[$scope.randomvalue];
				var randomQuestion_crdy = $scope.crdy[$scope.randomvalue];
				var id = $scope.ids[$scope.randomvalue];
				var imgdata =$scope.lesimagesdata[$scope.randomvalue];

				//conversion en base64 de l'image 
			
				//console.log(imgdata);
				var binary = '';
				var bytes = new Uint8Array(imgdata);
				var len = bytes.byteLength;
				for (var i = 0; i < len; i++) {
					binary += String.fromCharCode(bytes[i]);
				}
				info.limage=btoa(binary);
				/*********************/
				
				info.rndquestion=randomQuestion;

			}
			
			
			
		})
		
	}//fin getrndquestion
	
	function TraitementScoreDistance(e){
		var score = 100;
		$scope.distance = Math.sqrt((($scope.crdx[$scope.randomvalue]-e.latlng.lat)*($scope.crdx[$scope.randomvalue]-e.latlng.lat))
		+(($scope.crdy[$scope.randomvalue]-e.latlng.lng)*($scope.crdy[$scope.randomvalue]-e.latlng.lng)));
		var lat1=e.latlng.lat;
		var lat2=$scope.crdx[$scope.randomvalue];
		var lon1=e.latlng.lng;
		var lon2=$scope.crdy[$scope.randomvalue];

		//Calculer la distance en Km
		var R = 6371; // rayon de la terre en km
		var phi1 = lat1*(Math.PI/180);
		var phi2 = lat2*(Math.PI/180);
		var deltaPhi = (lat2-lat1)*(Math.PI/180);
		var deltaY = (lon2-lon1)*(Math.PI/180);

		var a = Math.sin(deltaPhi/2) * Math.sin(deltaPhi/2) +
				Math.cos(phi1) * Math.cos(phi2) *
				Math.sin(deltaY/2) * Math.sin(deltaY/2);
		var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

		var DistanceEnKM = parseInt(R * c);
		//
		var k=4;
		var nbressais=k-$scope.essais;
		if($scope.distance <= 100){
			$scope.chance='Excellent!!';
		}
		if(DistanceEnKM > 100 && DistanceEnKM<=200){
			//score=score-5;
			$scope.chance='Vous êtes très proche! il vous reste '+nbressais+' essais';
			if(nbressais==0){
				$scope.chance='Vous-avez perdu! ';
			}
		}
		if(DistanceEnKM > 200 && DistanceEnKM<=300){
			//score=score-10;
			$scope.chance='Vous êtes proche! il vous reste '+nbressais+' essais';
			if(nbressais==0){
				$scope.chance='Vous-avez perdu! ';
			}
		}
		if(DistanceEnKM>300 && DistanceEnKM <= 500){
			//score=score-30;
			$scope.chance='vous n'+"'"+'êtes pas loin! continuez dans cette direction! il vous reste '+nbressais+' essais';
			if(nbressais==0){
				$scope.chance='Vous-avez perdu! ';
			}					
		}
		if(DistanceEnKM>500 && DistanceEnKM <= 700){
			//score=score-80;
			$scope.chance='Vous êtes loin! il vous reste '+nbressais+' essais';	
			if(nbressais==0){
				$scope.chance='Vous-avez perdu! ';
			}				
		}
		if(DistanceEnKM>1000){
			//score=score-100;
			$scope.chance='Trop loin!! il vous reste '+nbressais+' essais';
			if(nbressais==0){
				$scope.chance='Vous-avez perdu! ';
			}
		}

		//5 essais 
		if($scope.distance && $scope.chance && info.showHide==false && $scope.essais!=6){
			popup
			.setLatLng(e.latlng)
			.setContent($scope.chance+' la distance est '+DistanceEnKM+' Km')
			.openOn(mymap);

			if($scope.essais==4 && $scope.chance=='Excellent!!'){
				popup
				.setLatLng(e.latlng)
				.setContent('Trouvé! mais après beacoup d'+"'"+'essais! votre score est 1/10')
				.openOn(mymap);
			}
			
			if($scope.essais==1 && $scope.chance=='Excellent!!'){
				popup
				.setLatLng(e.latlng)
				.setContent('Trouvé! votre score est 8/10')
				.openOn(mymap);
				$scope.essais=$scope.essais+3;
			}

			if($scope.essais==2 && $scope.chance=='Excellent!!'){
				popup
				.setLatLng(e.latlng)
				.setContent('Trouvé! pas mal votre score est 5/10')
				.openOn(mymap);
				$scope.essais=$scope.essais+2;
			}
			if($scope.essais==3 && $scope.chance=='Excellent!!'){
				popup
				.setLatLng(e.latlng)
				.setContent('Trouvé! vous pouvez faire mieux! votre score est 3/10')
				.openOn(mymap);
				$scope.essais=$scope.essais+1;
			}
			
			if($scope.essais==0 && $scope.chance=='Excellent!!'){
				popup
				.setLatLng(e.latlng)
				.setContent($scope.chance+' Trouvé! Vous êtes rapide!! votre score est 10/10')
				.openOn(mymap);
				$scope.essais=$scope.essais+4;
			}
			if($scope.essais==5){
				popup
			.setLatLng(e.latlng)
			.setContent('Cliquez sur Rejouer pour lancer une nouvelle partie!')
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

	

	mymap.on('click', TraitementScoreDistance);
	
});