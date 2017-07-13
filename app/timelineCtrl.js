// TIMELINE CONTROLLER
anApp.controller('timelineCtrl', ['$scope','$http','$interval','$routeParams',
function($scope,$http,$interval,$routeParams){

  // READ FLUTS
  function readFluts(){
    $http.get('timeline').then(
      function(response){
        $scope.fluts = response.data;
      },
      function(err){
        console.error(err);
      }
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


