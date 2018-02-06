//on rajouter les dependances/modules ici (code ecrit en angular)
//approutes est dans routes.js userControllers est dans userCtrl.js
angular.module('questionApp', ['appRoutes', 'questionControllers', 'mapControllers', 'mainController']);//injecter les dependances comme approutes userControllers etc...
//De cette facon on peut faire ng-app une fois