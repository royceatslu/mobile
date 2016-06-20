// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
var mobileApp = angular.module('starter', ['ionic', 'ionic.service.core', 'ngResource', 'ngStorage', 'ngCordova', 'base64','cb.x2js']);

var tabState ;

mobileApp
  .config(function ($stateProvider, $urlRouterProvider, $ionicConfigProvider) {

    // Ionic uses AngularUI Router which uses the concept of states
    // Learn more here: https://github.com/angular-ui/ui-router
    // Set up the various states which the app can be in.
    // Each state's controller can be found in controllers.js
    $ionicConfigProvider.tabs.position('bottom');
  
    $stateProvider

      //setup an abstract state for the tabs directive
      .state('auth', {
        url: '/auth',
        templateUrl: 'auth.html',
        controller: 'AuthCtrl'
      })
      .state('tab', {
        url: '/tab',
        abstract: true,
        templateUrl: 'templates/tabs.html',
        controller: 'TabCtlr'
      })
      .state('tab.dash', {
        url: '/dash',
        views: {
          'tab-dash': {
            templateUrl: 'templates/tab-dash.html',
            controller: 'DashCtrl'
          }
        }
      })
      .state('tab.apps', {
        url: '/apps',
        views: {
          'tab-apps': {
            templateUrl: 'templates/tab-apps.html',
            controller: 'AppsCtrl'
          }
        }
      })
   
      .state('tab.search', {
        url: '/search',
        views: {
          'tab-apps': {
            templateUrl: 'templates/tab-search.html',
            controller: 'SearchCtrl'
          }
        }
      })
         
      .state('tab.searches', {
        url: '/searches',
        views: {
          'tab-apps': {
            templateUrl: 'templates/tab-searches.html',
            controller: 'SearchesCtrl'
          }
        }
      })
      .state('tab.results', {
        url: '/results',
        views: {
          'tab-apps': {
            templateUrl: 'templates/tab-results.html',
            controller: 'ResultsCtrl'
          }
        }
      })
      .state('tab.details', {
        url: '/details',
        views: {
          'tab-apps': {
            templateUrl: 'templates/tab-details.html',
            controller: 'DetailsCtrl'
          }
        }
      })
      .state('tab.comp', {
        url: '/comp',
        views: {
          'tab-comp': {
            templateUrl: 'templates/tab-comp.html',
            controller: 'CompCtrl'
          }
        }  
      })
      
    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/auth');
  })
  .run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);
      }
      if (window.StatusBar) {
        // org.apache.cordova.statusbar required
        StatusBar.styleDefault();
      }
      
      
      window.requestFileSystem = window.requestFileSystem || window.webkitRequestFileSystem;   
      navigator.webkitPersistentStorage.requestQuota( 50*1024*1024, function (grantedBytes) {  
          window.requestFileSystem(LocalFileSystem.PERSISTENT, grantedBytes, onFileSystemSuccess, errorHandler);
      }, function (e) {
          console.log('Error', e);
      });
      
    });
  })
  .globals = {
    "fs" : ''
  };

function onFileSystemSuccess(fileSystem) {
  console.log(fileSystem.name);
  mobileApp.globals.fs = fileSystem ;  
  console.log('Opened file system: ' + mobileApp.globals.fs.name);
}
var errorHandler = function (fileName, e) {  
    var msg = '';

    switch (e.code) {
        case FileError.QUOTA_EXCEEDED_ERR:
            msg = 'Storage quota exceeded';
            break;
        case FileError.NOT_FOUND_ERR:
            msg = 'File not found';
            break;
        case FileError.SECURITY_ERR:
            msg = 'Security error';
            break;
        case FileError.INVALID_MODIFICATION_ERR:
            msg = 'Invalid modification';
            break;
        case FileError.INVALID_STATE_ERR:
            msg = 'Invalid state';
            break;
        default:
            msg = 'Unknown error';
            break;
    };

    console.log('Error (' + fileName + '): ' + msg);
}
