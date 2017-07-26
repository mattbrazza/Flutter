const anApp = angular.module('flutter', ['ngRoute']);

// ROUTE CONFIGURATION
anApp.config(['$routeProvider', function($routeProvider){
  $routeProvider
  .when('/', {
    templateUrl: 'app/entrance.html',
    controller: 'entryCtrl'
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

  .when('/logout', {
    templateUrl: 'app/entrance.html',
    controller: 'entryCtrl'
/*  redirectTo: function() {
      console.log('Logging out...');
      userService.logoutUser();
      return '/';
    } */
  })
  .otherwise({
    redirectTo: '/'
  });
}]);

// SERVICES
anApp.service('userService', ['$location', function($location){
  // TODO: make items private
  this.userData = null;
  this.userState = false;

    this.hi = function() {
console.log('hii');
return;
}

  this.setUser = function(user){
    this.userData = {
      id: user._id,
      username: user.username,
      email: user.email,
      dispName: user.dispName,
      tagline: user.tagline,
      profPicUrl: user.profPicUrl,
      joinDate: user.joinDate,
      following: user.following,
      followers: user.followers
    };
    this.userState = true;
    return true; // TODO: ret FALSE if user already set or something ?
  };

  this.getUser = function(prop){
    if (prop) {
      return this.userData[prop];
    } else {
      return this.userData;
    }
  };

  this.isLoggedIn = function(){
    return this.userState;
  };

  this.logoutUser = function(){
    this.userData = null;
    this.userState = false;
    $location.path('/');
    return true;
  };

}]);


