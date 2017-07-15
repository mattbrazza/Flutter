// PROFILE CONTROLLER
anApp.controller('profileCtrl',['$scope','$http','$routeParams',
function($scope,$http,$routeParams){

  // TODO: Initiate this on load of controller properly?
  if ($routeParams.username) {
    getUserData($routeParams.username);
  } else {
    getUserData('user00');
  };

  function getUserData(username) {
    $http.get('/profile/' + username).then(
      function(response){
        let userData = {
          username: response.data.username,
          email: response.data.email,
          dispName: response.data.dispName,
          tagline: response.data.tagline,
          profPicUrl: response.data.profPicUrl,
          joinDate: response.data.joinDate
        };
        $scope.user = response.data; //userData;
      },
      function(err){ console.error(err); }
    );
  };

  $scope.update = function(){};

}]);

