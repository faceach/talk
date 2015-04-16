angular.module('starter.services', [])

.factory('Talk', function() {

  var bingAccessToken = "http%3a%2f%2fschemas.xmlsoap.org%2fws%2f2005%2f05%2fidentity%2fclaims%2fnameidentifier=watermelon2014&http%3a%2f%2fschemas.microsoft.com%2faccesscontrolservice%2f2010%2f07%2fclaims%2fidentityprovider=https%3a%2f%2fdatamarket.accesscontrol.windows.net%2f&Audience=http%3a%2f%2fapi.microsofttranslator.com&ExpiresOn=1429187025&Issuer=https%3a%2f%2fdatamarket.accesscontrol.windows.net%2f&HMACSHA256=vj6uNCKaLf9EQgU1r7UjS5eC3bIN%2fKp3Ctog63tdC%2b8%3d";

  function scriptTranslateRequest(token, text) {
    var from = "en",
      to = "zh-CHS";
    text = text || "";
    token = encodeURIComponent(token); //.replace("%26", "&");
    console.log("scriptTranslateRequest: " + token);

    var url = "http://api.microsofttranslator.com/V2/Ajax.svc/Translate" +
      "?appId=Bearer " + token +
      "&from=" + encodeURIComponent(from) +
      "&to=" + encodeURIComponent(to) +
      "&text=" + encodeURIComponent(text) +
      "&oncomplete=mycallback";

    console.log("URL: " + url);

    var s = document.createElement("script");
    s.src = url;
    document.body.appendChild(s);
  }

  function ajaxTranslateRequest(token, text) {
    var from = "en",
      to = "zh-CHS";
    text = text || "";
    token = encodeURIComponent(token);

    var url = "http://api.microsofttranslator.com/V2/Ajax.svc/Translate" +
      "?appId=Bearer " + token +
      "&from=" + encodeURIComponent(from) +
      "&to=" + encodeURIComponent(to) +
      "&text=" + encodeURIComponent(text) +
      "&oncomplete=mycallback";

    ajax(url, "Bearer " + token);
  }

  return {
    translator: function(newWord, callback) {
      newWord = newWord || "anything";
      console.log("EN: " + newWord);

      window.mycallback = function(response) {
        console.log("CN: " + response);
        callback(response);
      }

      scriptTranslateRequest(bingAccessToken, newWord);
      //ajaxTranslateRequest(bingAccessToken, newWord);
    }
  };

})

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