const anApp = angular.module('flutter', ['ngRoute']);

// ROUTE CONFIGURATION
anApp.config(['$routeProvider', function($routeProvider){
  $routeProvider
.when('/test', { templateUrl: 'app/test.html', controller: 'testCtrl'})
.when('/test/:username', { templateUrl: 'app/test.html', controller: 'testCtrl'})
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
    redirectTo: function(userService){ // is fed params, see $routeProvider docs
      userService.logoutUser();
      return '/';
    }
  })
  .otherwise({
    redirectTo: '/'
  });
}]);

// SERVICES
anApp.service('userService', function(){
  // TODO: make items private
  this.userData = null;
  this.userState = false;

  this.setUser = function(user){
    this.userData = {
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
    return true;
  };

});


