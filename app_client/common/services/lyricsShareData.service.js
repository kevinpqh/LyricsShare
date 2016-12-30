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

        var createComment = function (publishid, data) {
            return $http.post('/api/publish/' + publishid + '/comment', data);
        };

       var updateComment = function (publishid, commentid ,data) {
            return $http.put('/api/publish/' + publishid + '/comment/' + commentid , data);
        };
       var deleteComment = function (publishid, commentid) {
            return $http.delete('/api/publish/' + publishid + '/comment/' + commentid);
        };


        return {
            listPublishById : listPublishById,
            publishById : publishById,
            createComment : createComment,
            updateComment : updateComment,
            deleteComment : deleteComment
            //updateCommentById : updateCommentById
        };
    };
})();
