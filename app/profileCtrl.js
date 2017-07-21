// PROFILE CONTROLLER
anApp.controller('profileCtrl',
['userService','$scope','$http','$routeParams','$location','$interval',
function(userService, $scope, $http, $routeParams, $location, $interval){

  // TODO: Initiate this on load of controller properly?
  if ($routeParams.username) {
    getUserData($routeParams.username);
  } else {
    user = JSON.parse(localStorage.getItem('User-Data'));
    if (user) {
      getUserData(user.username);
    } else { $location.path('/'); };
  };

  function getUserData(username) {
    $scope.errorMsg = null;
    $http.get('/profile/' + username).then(
      function(response){
        if (!response.data.success) {
          $scope.errorMsg = response.data.msg;
          return;
        } else {
          $scope.user = response.data.user;
        }
      },
      function(err){ console.error(err); }
    );
  };

  $scope.update = function(){};
  $scope.followUser = function(){};

  // READ FLUTS - TODO: make into factory/service & share with TimelineCtrl
  function getFluts(username){
    $http.get('flut/user/' + username).then(
      function(response){
        if (!response.data.success) {
          $scope.alertMsg = response.data.msg;
          return;
        } else {
          $scope.fluts = response.data.fluts;
        }
      },
      function(err){ console.error(err); }
    );
  };

  $interval(function(){
    if ($scope.user) {
      getFluts($scope.user.username);
    } else {}
  }, 5000);

}]);

