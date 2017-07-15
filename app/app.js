const anApp = angular.module('flutter', ['ngRoute']);

anApp.config(['$routeProvider', function($routeProvider){
  $routeProvider
  .when('/', {
    templateUrl: 'app/entrance.html',
    controller: 'entryCtrl'
  })
  .when('/profile', {
    templateUrl: 'app/profile.html',
    controller: 'profileCtrl'
  })
  .when('/timeline', {
    templateUrl: 'app/timeline.html',
    controller: 'timelineCtrl'
  })
  .otherwise({
    redirectTo: '/'
  });
}]);

