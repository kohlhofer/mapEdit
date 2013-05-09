function mapController($scope) {

  var terrainAssetPath = "img/terrains/"
  var unitAssetPath = "img/units/grey/"

  $scope.selectedUnit = false;
  $scope.selectedTerrain = 'plain';


  // Master object holding all terrains
  // artVariant refers to the art asset currently selected in the tool bar.

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

  // Master object holding all units
  // Orientations other than right are not supported, yet. 

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

  // Initializes the Map
  // Dimension can currently not be edited after the initalisation.

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

  // Called when the user selects a terrain in the toolbar
  // If the terrain is already selected it cycles through avaialable art variations

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

  // Called when the user selects a terrain in the toolbar

  $scope.selectUnit = function(unit) {
    $scope.selectedUnit = unit;
    $scope.selectedTerrain = false;
  }

  // Calles when the user clicks on a cell in the map
  // Depending on which tool is selected modifies either terrain or unit property of the map cell

  $scope.clickMapCell = function(x,y) {
    if ($scope.selectedTerrain) {
      $scope.map[x][y].terrain = $scope.selectedTerrain;
      $scope.map[x][y].artVariant = $scope.terrains[$scope.selectedTerrain].artVariant;
    }
    if ($scope.selectedUnit) {
      $scope.map[x][y].unit = $scope.selectedUnit;
    }
  }

  // Converts the map data to JSON.
  // JSON can be copy and pasted through textarea. Triggered thorugh Button in the UI.

  $scope.mapToJson = function() {
    $scope.mapJson = angular.toJson($scope.map);
  }

  // Overwrites the MAP from a JSON string
  // JSON entered through textarea. Triggered thorugh Button in the UI.

  $scope.JsonToMap = function() {
    $scope.map = angular.fromJson($scope.mapJson);
  }

  // called to init the map
  
  $scope.map = $scope.setUpMap();



}

mapController.$inject = ['$scope'];