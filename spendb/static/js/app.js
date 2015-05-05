
var spendb = angular.module('spendb', ['ngCookies', 'ngRoute', 'duScroll', 'ngFileUpload', 'angularMoment', 'ui.bootstrap', 'localytics.directives']);


spendb.config(['$routeProvider', '$locationProvider',
    function($routeProvider, $locationProvider) {

  $routeProvider.when('/datasets/new', {
    templateUrl: 'new.html',
    controller: 'NewCtrl',
    resolve: {
      session: loadSession,
      reference: loadReferenceData
    }
  });

  $routeProvider.when('/datasets/:dataset/admin', {
    templateUrl: 'admin/index.html',
    controller: 'AdminIndexCtrl',
    resolve: {
      dataset: loadDataset
    }
  });

  $routeProvider.when('/datasets/:dataset/admin/runs/:run', {
    templateUrl: 'admin/run.html',
    controller: 'AdminRunCtrl',
    resolve: {
      dataset: loadDataset,
      run: loadRun
    }
  });

  $routeProvider.when('/datasets/:dataset/admin/metadata', {
    templateUrl: 'admin/metadata.html',
    controller: 'AdminMetadataCtrl',
    resolve: {
      dataset: loadDataset,
      reference: loadReferenceData
    }
  });

  $routeProvider.when('/datasets/:dataset/admin/model', {
    templateUrl: 'admin/model.html',
    controller: 'AdminModelCtrl',
    resolve: {
      dataset: loadDataset
    }
  });

  // Router hack to enable plain old links. 
  angular.element("a").prop("target", "_self");
  $locationProvider.html5Mode(true);

}]);


spendb.controller('AppCtrl', ['$scope', '$location', '$http', '$cookies', '$window', '$sce', 'flash', 'session',
  function($scope, $location, $http, $cookies, $window, $sce, flash, session) {
  
  $scope.flash = flash;
  $scope.session = {};

  // EU cookie warning
  $scope.showCookieWarning = !$cookies.neelieCookie;

  $scope.hideCookieWarning = function() {
    $cookies.neelieCookie = true;
    $scope.showCookieWarning = !$cookies.neelieCookie;
  };

  // Language selector
  $scope.setLocale = function(locale) {
    $http.post('/set-locale', {'locale': locale}).then(function(res) {
      $window.location.reload();
    });
    return false;
  };

  // Allow SCE escaping in the app
  $scope.trustAsHtml = function(text) {
    return $sce.trustAsHtml('' + text);
  };

  session.get(function(s) {
    $scope.session = s;
  });

}]);