function mapController($scope) {

  var terrainAssetPath = "img/terrains/"
  $scope.unitAssetPath = "img/units/blue/"

  $scope.selectedUnit = false;
  $scope.selectedTerrain = 'plain';


  // Master object holding all terrains
  // terrainVariant refers to the art asset currently selected in the tool bar.

  $scope.terrains = {
    dessert:{
      id:'dessert',
      art:[terrainAssetPath+"dessert_0.png", terrainAssetPath+"dessert_1.png"],
      terrainVariant:0,
      label:'dessert'
    },
    plain:{
      id:'plain',
      art:[terrainAssetPath+"plain_0.png", terrainAssetPath+"plain_1.png", terrainAssetPath+"plain_2.png"],
      terrainVariant:0,
      label:'plain'
    },
    deepWater:{
      id:'deepWater',
      art:[terrainAssetPath+"deepwater.png"],
      terrainVariant:0,
      label:'deep water'
    },
    shallowWater:{
      id:'shallowWater',
      art:[terrainAssetPath+"shallowwater.png"],
      terrainVariant:0,
      label:'shallow water'
    },
    mountain:{
      id:'mountain',
      art:[terrainAssetPath+"mountain_0.png",terrainAssetPath+"mountain_1.png"],
      terrainVariant:0,
      label:'mountain'
    },
    factory:{
      id:'factory', 
      art:[terrainAssetPath+"factory.png"],
      terrainVariant:0,
      label:'factory'
    },
    forrest:{
      id:'forrest', 
      art:[terrainAssetPath+"forrest_0.png", terrainAssetPath+"forrest_1.png", terrainAssetPath+"forrest_2.png"],
      terrainVariant:0,
      label:'forrest'
    }
  }

  // Master object holding all units
  // Orientations other than right are not supported, yet. 

  $scope.units = {
    mediumTank:{
      id:'mediumTank',
      art:{
        right:"mt_r.png",
        left:"mt_l.png",
        up:"mt_u.png",
        down:"mt_d.png"
      },
      label:'medium tank'
    },
    lightTank:{
      id:'lightTank',
      art:{
        right:"lt_r.png",
        left:"lt_l.png",
        up:"lt_u.png",
        down:"lt_d.png"
      },
      label:'light tank'
    },
    heavyTank:{
      id:'heavyTank',
      art:{
        right:"ht_r.png",
        left:"ht_l.png",
        up:"ht_u.png",
        down:"ht_d.png"
      },
      label:'heavy tank'
    },
    mediumArtillery:{
      id:'mediumArtillery',
      art:{
        right:"ma_r.png",
        left:"ma_l.png",
        up:"ma_u.png",
        down:"ma_d.png"
      },
      label:'medium artillery'
    },
    spiderBot:{
      id:'spiderBot',
      art:{
        right:"sb_r.png",
        left:"sb_l.png",
        up:"sb_u.png",
        down:"sb_d.png"
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
    var defaultTerrainVariation = '0';
    var defaultUnit = 'none';
    var defaultUnitOrientation = 'right';
    var defaultFaction = 'none'

    for (var x = 0; x < width; x++) {
      map[x] = new Array(height);
      for (var y = 0; y < height; y++) {
        map[x][y] = {
          'x':x,
          'y':y,
          'terrain':defaultTerrain,
          'faction':defaultFaction,
          'terrainVariant':defaultTerrainVariation,
          'unit':defaultUnit,
          'unitOrientation':'right',

        }
      }
    }
    return map;
  }

  // Called when the user selects a terrain in the toolbar
  // If the terrain is already selected it cycles through avaialable art variations

  $scope.selectTerrain = function(terrain) {
    $scope.selectedTerrain = terrain;
    $scope.terrains[terrain].terrainVariant = 0;
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
      if ($scope.map[x][y].terrain == $scope.selectedTerrain) {
        if ($scope.map[x][y].terrainVariant == $scope.terrains[$scope.selectedTerrain].art.length-1) {
          $scope.map[x][y].terrainVariant = 0;
        } else {
          $scope.map[x][y].terrainVariant++;
        }
      } else {
        $scope.map[x][y].terrain = $scope.selectedTerrain;
        $scope.map[x][y].terrainVariant = 0;
      }
    }

    if ($scope.selectedUnit) {
      if ($scope.map[x][y].unit == $scope.selectedUnit) {
        switch ($scope.map[x][y].unitOrientation) {
           case "right":
            $scope.map[x][y].unitOrientation = 'down';
            break;
           case "left":
            $scope.map[x][y].unitOrientation = 'up';
            break;
           case "up":
            $scope.map[x][y].unitOrientation = 'right';
            break;
           case "down":
            $scope.map[x][y].unitOrientation = 'left';
            break;
        }
      } else {
        $scope.map[x][y].unit = $scope.selectedUnit;
        $scope.map[x][y].unitOrientation = 'right';
      }
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