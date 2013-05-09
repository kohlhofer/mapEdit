function mapController($scope) {

  var terrainAssetPath = "img/terrains/"
  var unitAssetPath = "img/units/grey/"

  $scope.selectedUnit = false;
  $scope.selectedTerrain = 'plain';


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


  $scope.units = {
    mediumTank:{
      id:'mediumTank',
      art:unitAssetPath+"mediumtank.png",
      label:'medium tank'
    },
    lightTank:{
      id:'lightTank',
      art:unitAssetPath+"lighttank.png",
      label:'light tank'
    },
    heavyTank:{
      id:'heavyTank',
      art:unitAssetPath+"heavytank.png",
      label:'heavy tank'
    },
    mediumArtillery:{
      id:'mediumArtillery',
      art:unitAssetPath+"mediumartillery.png",
      label:'medium artillery'
    },
    spiderBot:{
      id:'spiderBot',
      art:unitAssetPath+"spiderbot.png",
      label:'spider Bot'
    }
  }

  $scope.setUpMap = function() {
    var width = 16;
    var height = 12;
    var map = new Array(8);
    var defaultTerrain = 'none';
    var defaultUnit = 'none';

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
    $scope.selectedUnit = false;
  }

  $scope.selectUnit = function(unit) {
    $scope.selectedUnit = unit;
    $scope.selectedTerrain = false;
  }


  $scope.clickMapCell = function(x,y) {
    if ($scope.selectedTerrain) {
      $scope.map[x][y].terrain = $scope.selectedTerrain;
    }
    if ($scope.selectedUnit) {
      $scope.map[x][y].unit = $scope.selectedUnit;
    }
  }

  $scope.mapToJson = function() {
    $scope.mapJson = angular.toJson($scope.map);
  }

  $scope.JsonToMap = function() {
    $scope.map = angular.fromJson($scope.mapJson);
  }



  $scope.map = $scope.setUpMap();



}

mapController.$inject = ['$scope'];