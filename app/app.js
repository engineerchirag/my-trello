'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'myApp.view1',
  'myApp.version',
  "myApp.injector",
  "myApp.cardLocalService",
  "myApp.cardRemoteService",
  "ngDraggable",
  "myApp.enter",
   "myApp.api"
]).
run(['$in', function($in){
  $in.activate();
}]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');

  $routeProvider.otherwise({redirectTo: '/trello'});

}]);
