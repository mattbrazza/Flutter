// PROFILE CONTROLLER
anApp.controller('testCtrl',
['userService','$scope','$http','$routeParams','$location','$interval',
function(userService, $scope, $http, $routeParams, $location, $interval){

  if (!userService.isLoggedIn()) {
    console.log('USER NOT LOGGED IN...');
//    $location.path('/');
    $location.path('/test/user00');
  } else {}
  if ($routeParams.username) {
    setUserData($routeParams.username);
    $scope.isProfile = true;
  } else {
    $scope.user = userService.getUser();
    $scope.isProfile = false;
  }
  readFluts();

  /* SET USER DATA BY USERNAME - HELPER */
  function setUserData(username) {
    $scope.errMsg = null;
    $http.get('/user/' + username).then(
      function(response){
        if (response.data.success) {
          $scope.user = response.data.user;
        } else {
          $scope.errMsg = response.data.msg || 'Server issue';
        }
      },
      function(err){
        $scope.errMsg = 'Error encountered while getting User Data';
        console.error(err);
      }
    );
    return; // $scope.user is set in IF(res.succ)
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
    return;
  };


// TIMELINE CONTROLLER

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
        } else { $scope.errMsg = response.data.msg || 'Server issue'; }
      },
      function(err){
        $scope.errMsg = 'Error encountered while submitting Flut; please try again';
        console.error(err);
      }
    );
    return;
  };

  /* GATHER FLUTS FUNCTION */
  function readFluts(){
    $scope.errMsg = null;
//    let reqId = $routeParams._id || 'all';
    $http.get('flut/all').then(
      function(response){
        if (response.data.success) {
          $scope.fluts = response.data.fluts;
        } else { $scope.errMsg = response.data.msg || 'Server issue'; }
      },
      function(err){
        $scope.errMsg = 'Error encountered while getting Fluts; please refresh';
        console.error(err);
      }
    );
    return;
  };

  /* ADD LIKE TO FLUT - TODO: make persistent in DB*/
  $scope.likeFlut = function(flut){
    flut.likes.count = flut.likes.count + 1;
    flut.likes.users.push($scope.user);
    return;
  };

  // SETUP TO REFRESH CONSTANTLY
  $interval(function(){
    if ($scope.isProfile) {
//      getFluts($scope.user.username);
readFluts();
    } else {
      readFluts();
    }
  }, 50000);

}]);


