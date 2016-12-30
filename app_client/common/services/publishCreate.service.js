(function () {

  angular
    .module('lyricsShareApp')
    .service('publishCreate', publishCreate);

  publishCreate.$inject = ['$http', '$window'];
  function publishCreate ($http, $window) {

    create = function(publish) {
      var retorno = $http.post('/api/publish', publish).success(function(data){
        console.log({image : publish.image , name : data._id});
      });
      return retorno;
    };
    return {
            create : create
    };
  }
})();