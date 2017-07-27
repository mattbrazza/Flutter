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

  /* Update User Data in Database */
  $scope.updateUserData = function(){
    $scope.errMsg = null;
    $scope.succMsg = null;
    if (!$scope.dispName) { $scope.errMsg = 'Cannot have blank fields'; return; }
    if (!$scope.username) { $scope.errMsg = 'Cannot have blank fields'; return; }
    if (!$scope.email) { $scope.errMsg = 'Cannot have blank fields'; return; }
    if (!$scope.tagline) { $scope.errMsg = 'Cannot have blank fields'; return; }

    $http.post('/user/update', request).then(
      function(response){
        if (response.data.success) {
          $scope.succMsg = 'Successfully updated your User Profile';
        } else {
          $scope.errMsg = response.data.msg || 'Server issue';
        }
      },
      function(err){
        $scope.errMsg = 'Error encountered while updating profile';
        console.error(err);
      });
  };

  function updateProfilePic(){};

}]); /* Profile-Editor Controller */


