// PROFILE-EDITOR CONTROLLER
anApp.controller('profileCtrl',
['userService','$scope','$http','$location',
function(userService, $scope, $http, $location){

  /* Redirect non-logged-in users */
  if (!userService.isLoggedIn()) {
    console.log('User not logged-in');
    $location.path('/');
  } else {
    $scope.user = userService.getUser();
  }

  function updateProfilePic(){};

}]); /* Profile-Editor Controller */


