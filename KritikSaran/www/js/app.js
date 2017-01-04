// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
  $ionicConfigProvider.views.maxCache(0);

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  
    $stateProvider
      .state('login', {
        url: '/login',
        templateUrl: 'templates/login.html',
        controller: 'loginCtrl'
      })
      .state('tab', {
        url: '/tab',
        abstract: true,
        controller: 'tabCtrl',
        templateUrl: 'templates/tab.html'
      })
      .state('tab.home', {
      url: '/home',
      views: {
        'tab-home': {
          templateUrl: 'templates/home.html',
          controller: 'homeCtrl'
        }
      }
    })
    .state('tab.akun', {
      url: '/akun/:nimnya',
      views: {
        'tab-akun': {
          templateUrl: 'templates/akun.html',
          controller: 'akunCtrl'
        }
      }
    })
    .state('tab.tambah-detail', {
        url: '/tambah/:pesanId',
        views: {
          'tab-tambah': {
            templateUrl: 'templates/pesanDetail.html',
            controller: 'pesanDetailCtrl'
          }
        }
      })
    .state('tab.tambah', {
      url: '/tambah',
      views: {
        'tab-tambah': {
          templateUrl: 'templates/tambahPesan.html',
          controller: 'tambahPesanCtrl'
        }
      }
    });
    $urlRouterProvider.otherwise('/login');
})

.directive("initFromForm", function ($parse) {
    return {
        link: function (scope, element, attrs) {
            var attr = attrs.initFromForm || attrs.ngModel || element.attrs('name'),
            val = attrs.value;
            $parse(attr).assign(scope, val);
        }
    };
});