const anApp = angular.module('flutter', ['ngRoute']);

/* ROUTE CONFIGURATION */
anApp.config(['$routeProvider', function($routeProvider){
  $routeProvider
  .when('/', {
    templateUrl: 'app/views/entrance.html',
    controller: 'entranceCtrl'
  })

  .when('/timeline', {
    templateUrl: 'app/views/timeline.html',
    controller: 'timelineCtrl'
  })
  .when('/profile/:username', {
    templateUrl: 'app/views/timeline.html',
    controller: 'timelineCtrl'
  })
 
  .when('/profile', {
    templateUrl: 'app/views/profile.html',
    controller: 'profileCtrl'
  })

  .when('/logout', { // TODO: Do here, not in Ctrl
    templateUrl: 'app/views/entrance.html',
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

