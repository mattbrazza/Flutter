// TIMELINE/PROFILE CONTROLLER
anApp.controller('timelineCtrl',
['userService','$scope','$http','$location','$interval','$routeParams',
function(userService, $scope, $http, $location, $interval, $routeParams){

  /* See if User is:
    (1) Specific person's profile - /profile/:username
    (2) Logged in, if not redirect - /
    (3) Your profile, AKA Timeline - /timeline */
  if ($routeParams.username) {
    $scope.isProfile = true;
    $scope.currProfile = $routeParams.username;
    getUserProfile($scope.currProfile);
    getFluts($scope.currProfile);
  } else {
    $scope.isProfile = false;
    $scope.currProfile = null;
    if (!userService.isLoggedIn()) {
      console.log('User not logged-in');
      $location.path('/');
    } else {
      $scope.user = userService.getUser();
      getFluts();
    }
  }

  /* READ USER DATA FOR SPECIFIC USERNAME */
  function getUserProfile(username) {
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

    if ($scope.errMsg) { console.log('MyError: ', $scope.errMsg); }
    return; // $scope.user is set in IF(res.succ)
  };

  /* GET FLUTS FOR ALL =OR= SPECIFIC USERNAME */
  function getFluts(username) {
    $scope.errMsg = null;
    // TODO: possibly use $.isProfile instead ??
    let reqURI = (username) ? '/flut/user/' + username : '/flut/all';

    $http.get(reqURI).then(
      function(response){
        if (response.data.success) {
          $scope.fluts = response.data.fluts;
        } else {
          $scope.errMsg = response.data.msg || 'Server issue';
        }
      },
      function(err){
        $scope.errMsg = 'Error encountered while getting Fluts';
        console.error(err);
      }
    );
    
    if ($scope.errMsg) { console.log('MyError: ', $scope.errMsg); }
    return; // $scope.fluts is set above
  };

  /* SUBMIT A NEW FLUT REQUEST */
  $scope.submitFlut = function() {
    $scope.errMsg = null;
    $scope.succMsg = null;
    if (!$scope.flutText) {
      $scope.errMsg = 'Cannot submit a empty Flut';
      return;
    }
    let request = {
      text: $scope.flutText,
      username: $scope.user.username,
      _user: $scope.user.id
    };
    $http.post('/flut/add', request).then(
      function(response){
        if (response.data.success) {
          $scope.flutText = ""; // reset Flut text field
          if ($scope.isProfile) { getFluts($scope.currProfile); }
          else { getFluts(); }
          $scope.succMsg = 'Flut successfully submitted';
        } else {
          $scope.errMsg = response.data.msg || 'Server issue';
        }
      },
      function(err){
        $scope.errMsg = 'Error encountered while submitting Flut';
        console.error(err);
      }
    );
    
    if ($scope.errMsg) { console.log('MyError: ', $scope.errMsg); }
    return; // flut submitted to DB above
  };

  /* ADD LIKE TO FLUT - TODO: make persistent in DB */
  $scope.likeFlut = function(flut){
    flut.likes.count = flut.likes.count + 1;
    flut.likes._users.push($scope.user._id);
    return;
  };

  // SETUP TO REFRESH CONSTANTLY
  $interval(function(){
    if ($scope.isProfile) {
      getFluts($scope.currProfile);
    } else {
      getFluts();
    }
    $scope.errMsg = null;
    $scope.succMsg = null;
    $scope.infoMsg = null;
  }, 50000);

}]); /* Timeline Controller */


