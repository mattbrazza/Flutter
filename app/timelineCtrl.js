// TIMELINE CONTROLLER
anApp.controller('timelineCtrl', ['$scope','$http','$interval','$routeParams',
function($scope,$http,$interval,$routeParams){

  $scope.user = {
    username: 'user00',
    id: '596aa1b149a6b0ac8f10d17'
  };

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


