(function () {

    angular
        .module('lyricsShareApp')
        .service('lyricsShareData', lyricsShareData);
        
    lyricsShareData.$inject = ['$http'];   
    function lyricsShareData ($http) {
        var listPublishById = function (){
            return $http.get('/api/publish');
        };
        var publishById = function (publishid){
            return $http.get('/api/publish/'+publishid);
        };//Para Obtener el detalle de Location
        return {
            listPublishById : listPublishById,
            publishById : publishById
        };
    };
})();