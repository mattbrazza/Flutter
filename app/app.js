const anApp = angular.module('flutter', ['ngRoute']);

/* ROUTE CONFIGURATION */
anApp.config(['$routeProvider', function($routeProvider){
  $routeProvider
  .when('/', {
    templateUrl: 'app/entrance.html',
    controller: 'entranceCtrl'
  })

  .when('/timeline', {
    templateUrl: 'app/timeline.html',
    controller: 'timelineCtrl'
  })

  .when('/profile/:username', {
    templateUrl: 'app/timeline.html',
    controller: 'timelineCtrl'
  })
 
  .when('/profile', {
    templateUrl: 'app/profile.html',
    controller: 'profileCtrl'
  })

  .when('/logout', { // TODO: Do here, not in Ctrl
    templateUrl: 'app/entrance.html',
    controller: 'entranceCtrl'
/*  redirectTo: function() {
      userService.logoutUser();
      return '/';
    }
*/
  })

  .otherwise({
    redirectTo: '/'
  });

}]);

