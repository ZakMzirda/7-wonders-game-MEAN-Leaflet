angular.module('mapControllers', [])
.controller('leafletCtrl',function($scope, $http){
    var mymap = L.map('mapid').setView([48.8587741, 2.2069771,11], 13);
	var coordx = 48.857374;
	var coordy = 2.204046;
	$scope.ville = "";
	L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
		maxZoom: 18,
		attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
			'<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
			'Imagery © <a href="http://mapbox.com">Mapbox</a>',
		id: 'mapbox.streets'
	}).addTo(mymap);
	L.marker([48.8587741, 2.2069771,11]).addTo(mymap)
		.bindPopup("<b>Hello world!").openPopup();
	
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
	
	mymap.on('click', onMapClick);

});
