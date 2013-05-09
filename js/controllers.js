function mapController($scope) {

  var terrainAssetPath = "img/terrains/"
  var unitAssetPath = "img/units/grey/"

  $scope.selectedUnit = false;
  $scope.selectedTerrain = 'plain';
  $scope.selectedTerrainVariation = 0;


  $scope.terrains = {
    dessert:{
      id:'dessert',
      art:[terrainAssetPath+"dessert_0.png", terrainAssetPath+"dessert_1.png"],
      artVariant:0,
      label:'dessert'
    },
    plain:{
      id:'plain',
      art:[terrainAssetPath+"plain_0.png", terrainAssetPath+"plain_1.png"],
      artVariant:0,
      label:'plain'
    },
    deepWater:{
      id:'deepWater',
      art:[terrainAssetPath+"deepwater.png"],
      artVariant:0,
      label:'deep water'
    },
    shallowWater:{
      id:'shallowWater',
      art:[terrainAssetPath+"shallowwater.png"],
      artVariant:0,
      label:'shallow water'
    },
    mountain:{
      id:'mountain',
      art:[terrainAssetPath+"mountain.png"],
      artVariant:0,
      label:'mountain'
    },
    factory:{
      id:'factory', 
      art:[terrainAssetPath+"factory.png"],
      artVariant:0,
      label:'factory'
    },
    forrest:{
      id:'forrest', 
      art:[terrainAssetPath+"forrest_0.png", terrainAssetPath+"forrest_1.png"],
      artVariant:0,
      label:'forrest'
    }
  }


  $scope.units = {
    mediumTank:{
      id:'mediumTank',
      art:{
        right:unitAssetPath+"mediumtank.png"
      },
      label:'medium tank'
    },
    lightTank:{
      id:'lightTank',
      art:{
        right:unitAssetPath+"lighttank.png"
      },
      label:'light tank'
    },
    heavyTank:{
      id:'heavyTank',
      art:{
        right:unitAssetPath+"heavytank.png"
      },
      label:'heavy tank'
    },
    mediumArtillery:{
      id:'mediumArtillery',
      art:{
        right:unitAssetPath+"mediumartillery.png"
      },
      label:'medium artillery'
    },
    spiderBot:{
      id:'spiderBot',
      art:{
        right:unitAssetPath+"spiderbot.png"
      },
      label:'spider Bot'
    }
  }

  $scope.setUpMap = function() {
    var width = 16;
    var height = 12;
    var map = new Array(8);
    var defaultTerrain = 'none';
    var defaultArtVariation = '0';
    var defaultUnit = 'none';

    for (var x = 0; x < width; x++) {
      map[x] = new Array(height);
      for (var y = 0; y < height; y++) {
        map[x][y] = {
          'x':x,
          'y':y,
          'terrain':defaultTerrain,
          'artVariant':defaultArtVariation,
          'unit':defaultUnit
        }
      }
    }
    return map;
  }

  $scope.selectTerrain = function(terrain) {
    if ($scope.selectedTerrain == terrain) {
      if ($scope.terrains[terrain].artVariant == $scope.terrains[terrain].art.length-1) {
        $scope.terrains[terrain].artVariant = 0;
      } else {
        $scope.terrains[terrain].artVariant++;
      }
    } else {
      $scope.selectedTerrain = terrain;
    }
    $scope.selectedUnit = false;
  }

  $scope.selectUnit = function(unit) {
    $scope.selectedUnit = unit;
    $scope.selectedTerrain = false;
  }


  $scope.clickMapCell = function(x,y) {
    if ($scope.selectedTerrain) {
      $scope.map[x][y].terrain = $scope.selectedTerrain;
      $scope.map[x][y].artVariant = $scope.terrains[$scope.selectedTerrain].artVariant;
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