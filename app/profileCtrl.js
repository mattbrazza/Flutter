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
  $scope.updateUserProfile = function(){
    $scope.errMsg = null;
    $scope.succMsg = null;
    // TODO: Check if form is 'DIRTY', disable update if not, etc.
    if (!$scope.user.dispName) { $scope.errMsg = 'Cannot blank DispName'; return; }
    if (!$scope.user.username) { $scope.errMsg = 'Cannot blank Username'; return; }
    if (!$scope.user.email) { $scope.errMsg = 'Cannot blank Email'; return; }
    if (!$scope.user.tagline) { $scope.errMsg = 'Cannot blank Tagline'; return; }
    let request = {
      id: userService.getUser('id'),
      username: $scope.user.username,
      email: $scope.user.email,
      dispName: $scope.user.dispName,
      tagline: $scope.user.tagline
    };
    $http.post('/user/update', request).then(
      function(response){
        if (response.data.success) {
          userService.setUser(response.data.user);
          $scope.succMsg = 'Successfully updated your User Profile';
        } else {
          $scope.errMsg = response.data.msg || 'Server issue';
        }
      },
      function(err){
        $scope.errMsg = 'Error encountered while updating profile';
        console.error(err);
      }
    );

    return; // re-sets user in IF(RES.SUCC)
  };

  /* UPLOAD A NEW PROFILE PICTURE - */
  function updateProfilePic(){ return; };

}]); /* Profile-Editor Controller */


