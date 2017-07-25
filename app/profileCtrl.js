// PROFILE CONTROLLER
anApp.controller('profileCtrl',
['userService','$scope','$http','$routeParams','$location','$interval',
function(userService, $scope, $http, $routeParams, $location, $interval){

  // TODO: Initiate this on load of controller properly?
  if ($routeParams.username) {
    getUserData($routeParams.username);
  } else {
    if (userService.isLoggedIn()) {
      getUserData(userService.getUser('username'));
    } else { $location.path('/'); }
  };

  function getUserData(username) {
    $scope.errorMsg = null;
    $http.get('/user/' + username).then(
      function(response){
        if (response.data.success) {
          $scope.user = response.data.user;
        } else {
          $scope.errorMsg = response.data.msg || 'Server issue';
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
        if (response.data.success) {
          $scope.fluts = response.data.fluts;
        } else {
          $scope.alertMsg = response.data.msg || 'Server issue';
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

