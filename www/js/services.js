angular.module('starter.services', [])

.factory('Stars', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var stars = [{
    id: 0,
    word: 'thereafter',
    translation: 'adv. 此后，在那之后；〈罕〉据此'
  }, {
    id: 1,
    word: 'opportunity',
    translation: 'n. 机会；适当的时机良机；有利的环境，条件 '
  }, {
    id: 2,
    word: 'disadvantages',
    translation: 'n. 不利，劣势，短处( disadvantage的名词复数 ) '
  }, {
    id: 3,
    word: 'pictograms',
    translation: 'n. 象形文字，古代石壁画( pictogram的名词复数 ) '
  }, {
    id: 4,
    word: 'gorgeous',
    translation: 'adj. 华丽的，艳丽的；极好的，称心的；美丽动人的，光彩夺目的；令人愉快的，令人享受的'
  }];

  return {
    all: function() {
      return stars;
    },
    remove: function(star) {
      stars.splice(stars.indexOf(star), 1);
    },
    get: function(starId) {
      for (var i = 0; i < stars.length; i++) {
        if (stars[i].id === parseInt(starId)) {
          return stars[i];
        }
      }
      return null;
    }
  };
});
