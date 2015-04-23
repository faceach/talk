angular.module('talk.controllers', [])

.controller('TalkCtrl', function($scope, Talk) {
	$scope.oldWord = "";
	$scope.newWordTranslation = "";
	$scope.newWordTranslationWav = "";

	function renderTranslation(text) {
		var me = $scope;
		if (!text) {
			return;
		}
		text = text.trim();

		if (text === me.oldWord) {
			return;
		}
		me.oldWord = text;

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
		var keyChars = " ;,.?!~"

		if (!inputs) {
			me.newWordTranslation = "";
			return;
		}

		var lastChar = inputs.slice(-1);
		// type a space
		if (keyChars.indexOf(lastChar) >= 0) {
			renderTranslation(inputs);
		}
	};
	$scope.speak = function() {
		var me = $scope;

		Talk.speak(me.newWordTranslation).then(function(waveStream) {
			console.log("Speaker callback: " + waveStream);

			setTimeout(function() {
				playAudio(waveStream);
			}, 1000);
		});
	};

	// Play audio
	//
	function playAudio(url) {
		var me = $scope;

		// Web browser compatibility
		if (typeof Media === "undefined") {
			me.newWordTranslationWav = url;
			// Play in web browser
			me.$broadcast('load');
			return;
		}
		/*$ionicPlatform.ready(function() {
			// Play the audio file at url
			// Play in Apps
			var my_media = $cordovaMedia.newMedia(url).then(function() {
				// success
			}, function() {
				// error
			});

			my_media.play();
		});*/

		// Play the audio file at url
		// Play in Apps
		var my_media = new Media(url,
			function(success) {},
			function(error) {},
			function(status) {});

		my_media.play();
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