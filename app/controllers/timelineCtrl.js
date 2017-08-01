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
    return; // $scope.fluts is set in IF(RES.SUCC)
  };

  /* SUBMIT A NEW FLUT REQUEST */
  $scope.submitFlut = function() {
    if (!$scope.flutText) { return; }
    $scope.errMsg = null;
    $scope.succMsg = null;
    let request = {
      text: $scope.flutText,
      username: $scope.user.username,
      _user: $scope.user.id
    };

    $http.post('/flut/add', request).then(
      function(response){
        if (response.data.success) {
          $scope.succMsg = 'Flut successfully submitted';
          $scope.flutText = ""; // reset Flut text field
          if ($scope.isProfile) { getFluts($scope.profile.username); }
          else { getFluts(); }
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
    return; // flut submitted to DB
  };

  /* ADD LIKE TO FLUT - TODO: make persistent in DB */
  // TODO: Disallow liking your own Flut ?
  $scope.likeFlut = function(flut){
    $scope.errMsg = null;
    let request = {
      flut_id: flut._id,
      user_id: $scope.user.id
    };

    $http.post('/flut/like', request).then(
      function(response){
        if (response.data.success) {
          if ($scope.isProfile) { getFluts($scope.profile.username); }
          else { getFluts(); }
        } else {
          $scope.errMsg = response.data.msg || 'Server issue';
        }
      },
      function(err){
        $scope.errMsg = 'Error encountered while liking Flut';
        console.error(err);
      }
    );

    if ($scope.errMsg) { console.log('MyError: ', $scope.errMsg); }
    return;
  };

  /* FOLLOW/UNFOLLOW USER */
  $scope.followUser = function(){
    if (!$scope.isProfile) { return; }
    $scope.errMsg = null;
    let request = {
      profile_id: $scope.profile._id,
      user_id: $scope.user.id,
    };

    $http.post('/user/follow', request).then(
      function(response){
        if (response.data.success) {
          $scope.isFollowing = true; // TODO: Make persistent
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

    if ($scope.errMsg) { console.log('MyError: ', $scope.errMsg); }
    return; // re-sets user in IF(RES.SUCC)
  };
  $scope.unfollowUser = function(){
    if (!$scope.isProfile) { return; }
    return;
  };

  /* REFRESH TIMELINE REPEATEDLY */
  $interval(function(){
    if ($scope.isProfile) {
      getFluts($scope.profile.username);
    } else {
      getFluts();
    }
    /* $scope.errMsg = null;
    $scope.succMsg = null;
    $scope.infoMsg = null; */
  }, 10000);

}]); /* Timeline Controller */

