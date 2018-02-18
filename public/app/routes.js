//on cree les routes vers les pages dans ce fichier
angular.module('appRoutes', ['ngRoute'])
.config(function($routeProvider, $locationProvider){ //locationprovider pour enlever le #
    $routeProvider
    .when('/',{
        templateUrl:'app/views/pages/home.html', //route par default
        controller: 'leafletCtrl',
        controllerAs: 'leafletmap'
    })
    
    .when('/about',{
        templateUrl:'app/views/pages/about.html'
    })
    .when('/questions',{
        templateUrl:'app/views/pages/questions/question.html',
        controller: 'ergQuestionCtrl',
        controllerAs: 'enregistrer'
    })
    .otherwise({
        redirectTo:'/'
    });
    $locationProvider.html5Mode({
        enabled : true,
        requireBase: false
    });
});