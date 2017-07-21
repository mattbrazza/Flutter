// TIMELINE CONTROLLER
anApp.controller('timelineCtrl',
['$scope','$http','$interval','$routeParams','$location',
function($scope,$http,$interval,$routeParams,$location){

  // TODO: do this way better
  let locUser = JSON.parse(localStorage.getItem('User-Data'))
  if (!locUser) {
    console.log('NO GO USER');
    $scope.errMsg = 'Please log in to view Timeline';
    $location.path('/');
  } else { $scope.user = locUser; }

  // CREATE FLUT
  $scope.submitFlut = function(){
    if (!$scope.flutText) { return; }
    let flutData = {
      username: $scope.user.username,
//      user: $scope.user.id,
      text: $scope.flutText
    };
    $http.post('flut/add', flutData).then(
      function(response){
        if (response) {
          $scope.flutText = "";
          readFluts();
        }
      },
      function(err){ console.error(err); }
    );
  };

  // READ FLUTS
  function readFluts(){
    $http.get('timeline').then(
      function(response){
        $scope.fluts = response.data;
      },
      function(err){ console.error(err); }
    );
  };

  function readFlutById(){
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


