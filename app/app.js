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
  .when('/profile/:username', {
    templateUrl: 'app/profile.html',
    controller: 'profileCtrl'
  })
  .when('/timeline', {
    templateUrl: 'app/timeline.html',
    controller: 'timelineCtrl'
  })
  .when('/logoff', {
    templateUrl: 'app/entrance.html',
    redirectTo: function(){ // is fed params, see $routeProvider docs
      localStorage.removeItem('User-Data');
      return '/';
    }
  })
  .otherwise({
    redirectTo: '/'
  });
}]);

