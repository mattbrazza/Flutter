// ENTRY CONTROLLER
anApp.controller('entryCtrl',['$scope','$http','$location',
function($scope,$http,$location){

  // TO-DO: Create proper log-in system
  // For now, move in with "user1"/"pass"
  $scope.login = function(){
    if (!$scope.username || !$scope.password) {
      console.log(">>>>Fill in Username and/or Password");
      return;
    }

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
      function(err){
        console.error(err);
      }
    );
  }

}]);

