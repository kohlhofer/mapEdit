function mapController($scope, angularFire) {

  var terrainAssetPath = "img/terrains/"
  $scope.unitAssetPath = "img/units"
  var buildingAssetPath = "img/buildings/"

  $scope.selectedUnit = false;
  $scope.selectedTerrain = 'plain';
  $scope.selectedFaction = 0;


  // Master object holding all terrains
  // terrainVariant refers to the art asset currently selected in the tool bar.

  $scope.terrains = {
    dessert:{
      id:'dessert',
      art:[terrainAssetPath+"dessert_0.png", terrainAssetPath+"dessert_1.png", terrainAssetPath+"dessert_2.png"],
      terrainVariant:0,
      label:'dessert'
    },
    plain:{
      id:'plain',
      art:[terrainAssetPath+"plain_0.png", terrainAssetPath+"plain_1.png"],
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
      art:[terrainAssetPath+"mountain_0.png", terrainAssetPath+"mountain_3.png", terrainAssetPath+"mountain_2.png", terrainAssetPath+"mountain_1.png"],
      terrainVariant:0,
      label:'mountain'
    },
    forrest:{
      id:'forrest',
      art:[terrainAssetPath+"forrest_0.png", terrainAssetPath+"forrest_1.png", terrainAssetPath+"forrest_2.png"],
      terrainVariant:0,
      label:'forrest'
    },
    pineForrest:{
      id:'pineForrest',
      art:[terrainAssetPath+"needle_0.png", terrainAssetPath+"needle_1.png", terrainAssetPath+"needle_2.png"],
      terrainVariant:0,
      label:'pine forrest'
    },
    road:{
      id:'road',
      art:[terrainAssetPath+"road_horizontal.png",terrainAssetPath+"road_vertical.png",terrainAssetPath+"road_left_down.png",terrainAssetPath+"road_left_up.png",terrainAssetPath+"road_right_up.png",terrainAssetPath+"road_right_down.png",terrainAssetPath+"road_cross.png"],
      terrainVariant:0,
      label:'road'
    }
  }


  // Master object holding all buidlings
  // terrainVariant refers to the art asset currently selected in the tool bar.

  $scope.buildings = {
    dropzone:{
      id:'dropzone',
      art:[buildingAssetPath+"dropzone_neutral.png",buildingAssetPath+"dropzone_faction_0.png",buildingAssetPath+"dropzone_faction_1.png"],
      label:'dropzone',
      ownable:true,
      faction:false
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
    var width = 5;
    var height = 5;
    var map = new Array(width);

    for (var x = 0; x < width; x++) {
      map[x] = new Array(height);
      for (var y = 0; y < height; y++) {
        map[x][y] = {
          'x':x,
          'y':y,
          'terrain':'none',
          'building':'none',
          'unit':'none'
        }
      }
    }
    return map;
  }

  // Called when the user selects a terrain in the toolbar
  // If the terrain is already selected it cycles through avaialable art variations

  $scope.selectTerrain = function(terrain) {
    $scope.selectedTerrain = terrain;

    $scope.selectedUnit = false;
    $scope.selectedBuilding = false;
  }

  // Called when the user selects a terrain in the toolbar

  $scope.selectUnit = function(unit) {
    $scope.selectedUnit = unit;
    $scope.selectedTerrain = false;
    $scope.selectedBuilding = false;
  }

   // Called when the user selects a terrain in the toolbar

  $scope.selectBuilding = function(building) {
    $scope.selectedBuilding = building;
    $scope.selectedTerrain = false;
    $scope.selectedUnit = false;
  }

  // Calles when the user clicks on a cell in the map
  // Depending on which tool is selected modifies either terrain or unit property of the map cell

  $scope.clickMapCell = function(x,y) {

    if ($scope.selectedTerrain) {
      if ($scope.map.data[x][y].terrain == $scope.selectedTerrain) {
        if ($scope.map.data[x][y].terrainVariant == $scope.terrains[$scope.selectedTerrain].art.length-1) {
          $scope.map.data[x][y].terrainVariant = 0;
        } else {
          $scope.map.data[x][y].terrainVariant++;
        }
      } else {
        $scope.map.data[x][y].terrain = $scope.selectedTerrain;
        $scope.map.data[x][y].terrainVariant = 0;
      }
    } else if ($scope.selectedUnit) {
      $scope.map.data[x][y].unitFaction = $scope.selectedFaction;
      if ($scope.map.data[x][y].unit == $scope.selectedUnit) {
        switch ($scope.map.data[x][y].unitOrientation) {
           case "right":
            $scope.map.data[x][y].unitOrientation = 'down';
            break;
           case "left":
            $scope.map.data[x][y].unitOrientation = 'up';
            break;
           case "up":
            $scope.map.data[x][y].unitOrientation = 'right';
            break;
           case "down":
            $scope.map.data[x][y].unitOrientation = 'left';
            break;
        }
      } else {
        $scope.map.data[x][y].unit = $scope.selectedUnit;
        $scope.map.data[x][y].unitOrientation = 'right';
      }
    } else if ($scope.selectedBuilding) {
      if ($scope.map.data[x][y].building == $scope.selectedBuilding) {
        if ($scope.map.data[x][y].buildingVariant == $scope.buildings[$scope.selectedBuilding].art.length-1) {
          $scope.map.data[x][y].buildingVariant = 0;
          $scope.map.data[x][y].buildingFaction = 'neutral';
        } else {
          $scope.map.data[x][y].buildingVariant++;
          $scope.map.data[x][y].buildingFaction = $scope.map.data[x][y].buildingVariant;
        }
      } else {
        $scope.map.data[x][y].building = $scope.selectedBuilding;
        $scope.map.data[x][y].buildingVariant = 0;
        $scope.map.data[x][y].buildingFaction = 'neutral';
      }
      
    }
  }


  $scope.addCollumn = function() {
    var height = $scope.map.data[0].length;
    var collumnNumber = $scope.map.data.length;
    var newCollumn = new Array(height);
    for (var y = 0; y < height; y++) {
      newCollumn[y] = {
        'x':collumnNumber,
        'y':y,
        'terrain':'none',
        'building':'none',
        'unit':'none'
      }
    }
    $scope.map.data.push(newCollumn);
  }

  $scope.deletedCollumn = function() {
    var width = $scope.map.data.length-1;
    $scope.map.data.splice(width, 1);
  }

  $scope.addRow = function() {
    var height = $scope.map.data[0].length;
    var width = $scope.map.data.length;
    for (var x = 0; x < width; x++) {
      $scope.map.data[x].push({
        'x':x,
        'y':height,
        'terrain':'none',
        'building':'none',
        'unit':'none'
      })
    }
  }

  $scope.deleteRow = function() {
    var height = $scope.map.data[0].length;
    var width = $scope.map.data.length;
    for (var x = 0; x < width; x++) {
      $scope.map.data[x].splice(height-1, 1);
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

  var firebaseUrl = 'https://mapEdit.firebaseio.com';
  var promise;

  var firebaseRef = new Firebase(firebaseUrl);
  var authClient = new FirebaseAuthClient(firebaseRef, function(error, user) {
    if (error) {
    } else if (user) {
      $scope.user = user;
      console.log("loading...")
      var resourceUrl = firebaseUrl + '/maps/' + user.username;
      promise = angularFire(resourceUrl, $scope, 'maps', []);
      $scope.$apply();
    }
  });

  $scope.login = function() {
    authClient.login('github', {
      rememberMe: true
    });
  }

  $scope.logout = function() {
    authClient.logout();
    delete $scope.user;
  }

  $scope.saveCurrentMap = function() {
    $scope.maps.push({name: $scope.mapName, map: angular.fromJson(angular.toJson($scope.map))});
    delete $scope.mapName;
  }

  $scope.loadMap = function(map) {
    $scope.map = angular.fromJson(angular.toJson(map.map));
  }

  $scope.deleteMap = function(index) {
    $scope.maps.splice(index, 1);
  }

  // init the map
  $scope.map = {name:"untitled", description:"", data:$scope.setUpMap()};
}

mapController.$inject = ['$scope', 'angularFire'];