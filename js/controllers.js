function mapController($scope) {

  $scope.setUpMap = function() {
    
    var width = 9;
    var height = 9;
    var map = new Array(8);
    var defaultTerrain = false;
    var defaultUnit = false;

    for (var x = 0; x < width; x++) {
      map[x] = new Array(height);
      for (var y = 0; y < height; y++) {
        map[x][y] = {
          'terrain':defaultTerrain,
          'unit':defaultUnit
        }
      }
    }

    return map;

  }


  $scope.map = $scope.setUpMap();



}

mapController.$inject = ['$scope'];