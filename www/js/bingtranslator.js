angular.module('bingTranslator', [])
  .factory('accessToken', ['$http', '$q', 'ApiEndpoint', function($http, $q, ApiEndpoint) {
    var DATA_MARKET_ACCESS_URI = ApiEndpoint.url + "/bingtranslator";
    var CLIENT_ID = "watermelon2014";
    var CLIENT_SECRET = "hiO/nuX1pjnk/m5+Ylwx8pBLavjoU09qc3Y2tY68CzQ=";
    var REQUEST_BODY = "grant_type=client_credentials" +
      "&client_id=" + encodeURIComponent(CLIENT_ID) +
      "&client_secret=" + encodeURIComponent(CLIENT_SECRET) +
      "&scope=http://api.microsofttranslator.com";
    var PRE_REFRESH_TOKEN_DURATION = 60; // In seconds

    var req = {
      method: 'POST',
      url: DATA_MARKET_ACCESS_URI,
      headers: {
        "Accept": "application/x-www-form-urlencoded",
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: REQUEST_BODY
    };

    var bingAccessToken;
    // fn().then(function(bingAccessToken){...})
    var obtainingAccessToken = $q(function(resolve, reject) {

      function fetchAccessToken() {
        var deferred = $q.defer();

        $http(req).success(function(data, status, headers, config) {
          if (!data) {
            deferred.reject("Obtaining access token failed.");
          }
          var expires_in = data.expires_in;
          var access_token = bingAccessToken = data.access_token;

          setTimeout(fetchAccessToken, (expires_in - PRE_REFRESH_TOKEN_DURATION) * 1000);

          deferred.resolve(access_token);
        }).error(function(data, status, headers, config) {
          deferred.reject("Obtaining access token failed. [" + status + "]");
        });

        return deferred.promise;
      }

      if (bingAccessToken) {
        resolve(bingAccessToken);
      } else {
        resolve(fetchAccessToken());
      }
    });

    return {
      "obtaining": obtainingAccessToken
    }
  }])
  //-----------------------------------------------------------------------------------
  .factory('translator', ['$http', '$q', 'accessToken', function($http, $q, accessToken) {

    function ajaxTranslateRequest(token, text, from, to) {
      if (!token) {
        return;
      }

      // Set defaults;
      from = from || "zh-CHS";
      to = to || "en";
      text = text || "";

      var url = "http://api.microsofttranslator.com/V2/Ajax.svc/Translate" +
        "?appId=Bearer " + encodeURIComponent(token) +
        "&from=" + encodeURIComponent(from) +
        "&to=" + encodeURIComponent(to) +
        "&text=" + encodeURIComponent(text) +
        "&oncomplete=JSON_CALLBACK";

      return $q(function(resolve, reject) {
        $http.jsonp(url).success(function(data) {
          console.log("Translation via JSONP: " + data);
          resolve(data);
        })
      });
    }

    var translate = function(text, from, to) {
      // Set defaults;
      from = from || "zh-CHS";
      to = to || "en";
      text = text || "";

      return accessToken.obtaining.then(function(token) {
        return ajaxTranslateRequest(token, text, from, to);
      });

    };

    return {
      "translate": translate
    }
  }])
  //-----------------------------------------------------------------------------------
  .factory('speaker', ['$http', '$q', 'accessToken', function($http, $q, accessToken) {

    function ajaxSpeakerRequest(token, text, language) {
      if (!token) {
        return;
      }

      // Set defaults;
      text = text || "";
      language = language || "en";

      var url = "http://api.microsofttranslator.com/V2/Ajax.svc/Speak" +
        "?appId=Bearer " + encodeURIComponent(token) +
        "&text=" + encodeURIComponent(text) +
        "&language=" + encodeURIComponent(language) +
        "&format=" + "audio/wav" +
        "&options=" + "MaxQuality" +
        "&oncomplete=JSON_CALLBACK";

      return $q(function(resolve, reject) {
        $http.jsonp(url).success(function(data) {
          console.log("Wave steam via JSPNP: " + data);
          resolve(data);
        })
      });
    }

    var speak = function(text, language) {
      // Set defaults;
      text = text || "";
      language = language || "en";

      return accessToken.obtaining.then(function(token) {
        return ajaxSpeakerRequest(token, text, language);
      });

    };

    return {
      "speak": speak
    }
  }]);