angular.module('starter.controllers', [])

.controller('TalkCtrl', function($scope, Talk) {
	$scope.newWordTranslation = {
		"text": ""
	};

	$scope.input = function(){
		var me = $scope;

		function callback(translation){
			console.log("Callback: " + translation);
			me.newWordTranslation.text = translation;
		}
		Talk.translator(me.$$childHead.newWord, callback);
	}
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
