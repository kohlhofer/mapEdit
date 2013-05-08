function mapController($scope) {

  var terrainAssetPath = "img/terrains/"

  $scope.selectedUnit = true;
  $scope.selectedTerrain = 'dessert';


  $scope.terrains = {
      dessert:{
        id:'dessert',
        art:terrainAssetPath+"dessert.png",
        label:'dessert'
      },
      plain:{
        id:'plain',
        art:terrainAssetPath+"plain.png",
        label:'plain'
      },
      deepWater:{
        id:'deepWater',
        art:terrainAssetPath+"deepwater.png",
        label:'deep water'
      },
      shallowWater:{
        id:'shallowWater',
        art:terrainAssetPath+"shallowwater.png",
        label:'shallow water'
      },
      mountain:{
        id:'mountain',
        art:terrainAssetPath+"mountain.png",
        label:'mountain'
      },
      factory:{
        id:'factory', 
        art:terrainAssetPath+"factory.png",
        label:'factory'
      },
      forrest:{
        id:'forrest', 
        art:terrainAssetPath+"forrest.png",
        label:'forrest'
      }
    }

  $scope.setUpMap = function() {
    var width = 9;
    var height = 9;
    var map = new Array(8);
    var defaultTerrain = 'plain';
    var defaultUnit = false;

    for (var x = 0; x < width; x++) {
      map[x] = new Array(height);
      for (var y = 0; y < height; y++) {
        map[x][y] = {
          'x':x,
          'y':y,
          'terrain':defaultTerrain,
          'unit':defaultUnit
        }
      }
    }
    return map;
  }

  $scope.selectTerrain = function(terrain) {
    $scope.selectedTerrain = terrain;
  }


  $scope.clickMapCell = function(x,y) {
    $scope.map[x][y].terrain = $scope.selectedTerrain;
    $scope.map[x][y].unit = $scope.selectedUnit;
  }



  $scope.map = $scope.setUpMap();



}

mapController.$inject = ['$scope'];