// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])

.constant('ApiEndpoint', {
  //url: "http://localhost:8100/api"
  url: "http://faceach.github.io/api"
})

.directive('videoLoad', function() {
  return {
    "link": function(scope, element, attrs) {
      scope.$on(attrs.videoLoad, function(e) {
        setTimeout(function() {
          console.log("Video load event trigged.")
          element[0].load();
        });
      })
    }
  }
})

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.config(['$stateProvider', '$urlRouterProvider', '$sceDelegateProvider',
  function($stateProvider, $urlRouterProvider, $sceDelegateProvider) {

    $sceDelegateProvider.resourceUrlWhitelist([
      // Allow same origin resource loads.
      'self',
      // Allow loading from out assets domain. Notice the difference between * and **.
      'http://api.microsofttranslator.com/**',
      'https://datamarket.accesscontrol.windows.net/**'
    ]);


    // Ionic uses AngularUI Router which uses the concept of states
    // Learn more here: https://github.com/angular-ui/ui-router
    // Set up the various states which the app can be in.
    // Each state's controller can be found in controllers.js
    $stateProvider

    // setup an abstract state for the tabs directive

      .state('tab', {
      url: "/tab",
      abstract: true,
      templateUrl: "templates/tabs.html"
    })

    // Each tab has its own nav history stack:

    .state('tab.talk', {
      url: '/talk',
      views: {
        'tab-talk': {
          templateUrl: 'templates/tab-talk.html',
          controller: 'TalkCtrl'
        }
      }
    })

    .state('tab.stars', {
      url: '/stars',
      views: {
        'tab-stars': {
          templateUrl: 'templates/tab-stars.html',
          controller: 'StarsCtrl'
        }
      }
    })

    .state('tab.setting', {
      url: '/setting',
      views: {
        'tab-setting': {
          templateUrl: 'templates/tab-setting.html',
          controller: 'SettingCtrl'
        }
      }
    });

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/tab/talk');

  }
]);