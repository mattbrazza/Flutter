// ENTRY CONTROLLER
anApp.controller('entryCtrl',['$scope','$http','$location',
function($scope,$http,$location){

  // TODO: Create proper log-in system
  $scope.login = function(){
    if (!$scope.username || !$scope.password) {
      console.log(">>>>Fill in Username and/or Password");
      return;
    } else {}

    let request = {
      username: $scope.username,
      password: $scope.password
    };
    $http.post('entry', request).then(
      function(response){
        if (response.data.success) {
          $location.path('/timeline');
        } else { console.log('>>>>WRONG CREDENTIALS'); }
      },
      function(err){ console.error(err); }
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

