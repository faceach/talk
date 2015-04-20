angular.module('starter.controllers', [])

.controller('TalkCtrl', function($scope, Talk) {
	$scope.newWord = "";
	$scope.newWordTranslation = "";
	$scope.newWordTranslationWav = "";

	function renderTranslation(text) {
		var me = $scope;
		text = text.trim();

		if(text === me.newWord){
			return;
		}
		me.newWord = text;

		Talk.translate(text).then(function(translation) {
			console.log("Translator callback: " + translation);
			me.newWordTranslation = translation;
		});
	}

	$scope.translate = function() {
		var me = $scope;
		var inputs = me.$$childHead.newWord;

		renderTranslation(inputs);
	};
	$scope.textChange = function() {
		var me = $scope;
		var inputs = me.$$childHead.newWord;

		if (!inputs) {
			me.newWordTranslation = "";
			return;
		}

		// type a space
		if (inputs.lastIndexOf(' ') + 1 === inputs.length) {
			renderTranslation(inputs);
		}
	};
	$scope.speak = function() {
		var me = $scope;

		Talk.speak(me.newWordTranslation).then(function(waveStream) {
			console.log("Speaker callback: " + waveStream);
			// Play
			me.newWordTranslationWav = waveStream;
		});
	};

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