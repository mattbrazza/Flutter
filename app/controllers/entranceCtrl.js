// ENTRY CONTROLLER
anApp.controller('entryCtrl',
['userService','$scope','$http','$location','$timeout',
function(userService, $scope, $http, $location, $timeout){

  /* Log-off User - NEEDS to be at top
    TODO: Do this correctly in app.js */
  if ($location.path() === '/logout') {
    console.log('Logging off...');
    userService.logoutUser();
    $location.path('/');
  }

  /* Check if User is already logged-in */
  if (userService.isLoggedIn()){
    $scope.infoMsg = 'Already logged-in; redirecting...'
    $timeout(() => { $location.path('/timeline'); }, 1000);
  }

  /* Verify,Submit log-in form */
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

    $http.post('login', request).then(
      function(response){
        if (response.data.success) {
          if (userService.setUser(response.data.user)){
            $scope.succMsg = 'Login successful; redirecting now...';
            $timeout(() => { $location.path('/timeline'); }, 1000);
          } else {
            $scope.errMsg = 'Could not login user; please try again';
          }
        } else { $scope.errMsg = response.data.msg || 'Server issue'; }
      },
      function(err){
        $scope.errMsg = 'Login error encountered; please try again';
        console.error(err);
      }
    );

    if ($scope.errMsg) { console.log('MyError: ', $scope.errMsg); }
    return; // redirects at IF(RES.SUCC),IF(SETUSER)
  };


  /* Verify,Submit sign-up form */
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

    $http.post('user/add', request).then(
      function(response){
        if (response.data.success) {
          if (userService.setUser(response.data.user)){
            $location.path('/profile'); // TODO: Add timeout/msg ?
          } else {
            $scope.errMsgSu = 'Could sign-up user; please try again';
          }
        } else {
          $scope.errMsgSu = response.data.msg || 'Server issue';
        }
      },
      function(err){
        $scope.errMsgSu = 'Signup error encountered; please try again';
        console.error(err);
      }
    );
    
    if ($scope.errMsgSu) { console.log('MyError: ', $scope.errMsgSu); }
    return; // redirects at IF(RES.SUCC),IF(SETUSER)
  };

}]); /* Entrance Controller */

