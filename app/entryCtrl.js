// ENTRY CONTROLLER
anApp.controller('entryCtrl',['$scope','$http','$location','$timeout',
function($scope, $http, $location, $timeout){

  // TODO: Create proper log-in system
  $scope.login = function(){
    $scope.loginError = null;
    $scope.loginSuccess = false;
    if (!$scope.username || !$scope.password) {
      $scope.loginError = 'Fill in username/password';
      return;
    } else {}

    let request = {
      username: $scope.username,
      password: $scope.password
    };
    $http.post('entry', request).then(
      function(response){
        if (response.data.success) {
          $scope.loginSuccess = true;
          localStorage.setItem('User-Data', JSON.stringify(response.data.user));
          $timeout(function(){
            $location.path('/timeline');
          }, 2000);
        } else { $scope.loginError = response.data.msg; } //'Wrong credentials. Please try again'; }
      },
      function(err){
        console.error(err);
        $scope.loginError = 'Login failure. Please try again';
      }
    );
  };

  $scope.signup = function(){
    if (!$scope.new_username || !$scope.new_email ||
        !$scope.new_pwd1 || !$scope.new_pwd2) {
      console.log('>>>>Fill in sign-up form');
      return;
    } else if ($scope.new_pwd1 !== $scope.new_pwd2) {
      console.log('>>>>Passwords do not match');
      return;
    } else {}

    let request = {
        username: $scope.new_username,
        email: $scope.new_email,
        password: $scope.new_pwd1
    };
    $http.post('addUser', request).then(
      function(response){
        if (response.data.success) {
          $location.path('/profile');
        } else { console.log('>>>>userFailer'); }
      },
      function(err){
        if (err) { console.error(err); }
      }
    );
  };

}]);

