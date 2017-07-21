// TIMELINE CONTROLLER
anApp.controller('timelineCtrl',
['userService','$scope','$http','$interval','$routeParams','$location',
function(userService,$scope,$http,$interval,$routeParams,$location){

  if (!userService.isLoggedIn()) {
    console.log('USER IS NOT LOGGED IN');
    $location.path('/');
  } else {
    $scope.user = userService.getUser();
  }

  /* CREATE FLUT FUNCTION */
  $scope.submitFlut = function(){
    $scope.errMsg = null;
    if (!$scope.flutText) { return; }

    let request = {
      username: $scope.user.username,
      text: $scope.flutText
    };
    $http.post('flut/add', request).then(
      function(response){
        if (response.data.success) {
          $scope.flutText = ""; // reset Flut text field
          readFluts();
        } else { $scope.errMsg = response.data.msg; }
      },
      function(err){
        $scope.errMsg = 'Error encountered while submitting Flut; please try again';
        console.error(err);
      }
    );
  };

  /* GATHER FLUTS FUNCTION */
  function readFluts(){
    $scope.errMsg = null;
//    let reqId = $routeParams._id || 'all';
    $http.get('flut/all').then(
      function(response){
        if (response.data.success) {
          $scope.fluts = response.data.fluts;
        } else { $scope.errMsg = response.data.msg; }
      },
      function(err){
        $scope.errMsg = 'Error encountered while getting Fluts; please refresh';
        console.error(err);
      }
    );
  };

  // LOOK INTO THIS... MAYBE COMBINE AS ABOVE
  function readFlutById_DEPRICATED_MAYBE(){
    $http.get('timeline/' + $routeParams._id).then(
      function(response){
        $scope.flut = response.data;
      },
      function(err){
        console.error(err);
      }
    );
  };

  // SETUP TO REFRESH CONSTANTLY
  $interval(function(){
    readFluts();
  }, 5000);

}]);


