(function () {

    angular
        .module('lyricsShareApp')
        .service('lyricsShareData', lyricsShareData);
        
    lyricsShareData.$inject = ['$http'];   
    function lyricsShareData ($http) {
        var publishById = function (){
            return $http.get('/api/publish');
        };
        return {
            publishById : publishById
        };
    };
})();