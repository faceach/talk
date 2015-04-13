angular.module('starter.controllers', [])

.controller('TalkCtrl', function($scope) {
	//
})

.controller('StarsCtrl', function($scope, Stars) {
  $scope.stars = Stars.all();
  $scope.remove = function(star) {
    Stars.remove(star);
  }
})

.controller('SettingCtrl', function($scope) {
  $scope.settings = {
    enableVoice: true
  };
});
