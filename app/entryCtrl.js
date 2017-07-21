// ENTRY CONTROLLER
anApp.controller('entryCtrl',
['userService', '$scope','$http','$location','$timeout',
function(userService, $scope, $http, $location, $timeout){

  /* LOGIN FUNCTION */
  $scope.login = function(){
    $scope.errMsg = null;
    $scope.succMsg = null;
    if (!$scope.username || !$scope.password) {
      $scope.errMsg = 'Please fill in Username and Password';
      return;
    } else {}

    let request = {
      username: $scope.username,
      password: $scope.password // TODO: Encrypt before POST
    }
    $http.post('entry', request).then(
      function(response){
        if (response.data.success) {
          if (!userService.setUser(response.data.user)){
            $scope.errMsg = 'Could not login user; please try again';
          } else {
            $scope.succMsg = 'Login successful; redirecting now...';
            $timeout(function(){
                $location.path('/timeline');
            }, 2000);
          }
        } else { $scope.errMsg = response.data.msg || 'Server issue'; }
      },
      function(err){
        $scope.errMsg = 'Login error encountered; please try again';
        console.error(err);
      }
    );
  };

  /* SIGN-UP FUNCTION */
  $scope.signup = function(){
    $scope.errMsgSu = null;
    if (!$scope.new_username || !$scope.new_email ||
        !$scope.new_pwd1 || !$scope.new_pwd2) {
      $scope.errMsgSu = 'Please fill out all fields';
      return;
    } else if ($scope.new_pwd1 !== $scope.new_pwd2) {
      $scope.errMsgSu = 'Passwords did not match; please try again';
      return;
    } else {}

    let request = {
        username: $scope.new_username,
        email: $scope.new_email,
        password: $scope.new_pwd1 // TODO: Encrypt before POST
    };
    $http.post('addUser', request).then(
      function(response){
        if (response.data.success) {
          if (!userService.setUser(response.data.user)){
            $scope.errMsgSu = 'Could sign-up user; please try again';
          } else {
            $location.path('/profile/' + userService.getUser('username'));
          }
        } else { $scope.errMsgSu = response.data.msg || 'Server issue'; }
      },
      function(err){
        $scope.errMsgSu = 'Login error encountered; please try again';
        console.error(err);
      }
    );
  };

}]);

