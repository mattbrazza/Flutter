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
    getUserProfile($routeParams.username);
    $scope.user = userService.getUser();
    getFluts($routeParams.username); // $scope.profile.username
  } else {
   if (!userService.isLoggedIn()) {
      console.log('User not logged-in');
      $location.path('/');
    } else {
      $scope.isProfile = false;
      $scope.profile = userService.getUser();
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
          $scope.profile = response.data.user;
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
    return; // $user.profile is set in IF(RES.SUCC)
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
          if ($scope.isProfile) { getFluts($scope.profile.username); }
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
    flut.likes.count = flut.likes.count + 1; // += 1
    flut.likes._users.push($scope.user._id);
    return;
  };

  /* FOLLOW/UNFOLLOW USER */
  $scope.followUser = function(){
    if (!$scope.isProfile) { return; }
    let request = {
      profile_id: $scope.profile._id,
      user_id: $scope.user.id,
      toFollow: true // true=follow, false=unfollow
    };

    $http.post('/user/follow', request).then(
      function(response){
        if (response.data.success) {
          $scope.isFollowing = true;
          $scope.succMsg = 'You are now following ' + $scope.profile.username;
          userService.setUser(response.data.user);
        } else {
          $scope.errMsg = response.data.msg || 'Server issue';
        }
      },
      function(err){
        $scope.errMsg = 'Error encountered while following user';
        console.error(err);
      }
    );

    return;
  };
  $scope.unfollowUser = function(){
    if (!$scope.isProfile) { return; }
    $scope.isFollowing = false;
    return;
  };

  /* REFRESH TIMELINE REPEATEDLY */
  $interval(function(){
    if ($scope.isProfile) {
      getFluts($scope.profile.username);
    } else {
      getFluts();
    }
    $scope.errMsg = null;
    $scope.succMsg = null;
    $scope.infoMsg = null;
  }, 50000);

}]); /* Timeline Controller */


