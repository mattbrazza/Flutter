// PROFILE CONTROLLER
anApp.controller('profileCtrl',['$scope','$http',
function($scope,$http){

  $http.get('/profile').then(
    function(response){
      let userData = {
        username: response.data.username,
        email: response.data.email,
        dispName: response.data.dispName,
        profPicUrl: response.data.profPicUrl,
        joinDate: response.data.joinDate
      };
      $scope.user = userData;
    },
    function(err){ console.error(err); }
  );

  $scope.update = function(){};
/*
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
//        console.log('submitted entry: ', response.data);
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
//        console.log('>>AU-REP: ', response.data);
        if (response.data.success) {
          $location.path('/timeline');
        } else { console.log('>>>>userFailer'); }
      },
      function(err){
        if (err) { console.error(err); }
      }
    );
  };
*/

}]);

