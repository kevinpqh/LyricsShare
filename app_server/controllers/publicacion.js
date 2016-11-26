var request = require('request');
var apiOptions = {
    server : "http://localhost:3000"
};
if (process.env.NODE_ENV === 'production') {
    apiOptions.server = "https://lyricsshare.herokuapp.com";
}
var renderCreatePublish = function(req, res, responseBody){
    console.log(responseBody);
    console.log("letra detalblea");
    res.render('letra-detalle', {
            title:responseBody.song.titulo,
            song: responseBody.song,
            publish:responseBody
    });
};

var renderHomepage = function(req, res, responseBody){
    res.render('index', {
        allpublish: responseBody
    });
};


module.exports.home = function(req, res){
    var requestOptions, path;
    path = '/api/publish';
    requestOptions = {
        url : apiOptions.server + path,
        method : "GET",
        json : {}
    };
    request(requestOptions,function(err, response, body) {
        renderHomepage(req, res, body);
        }
    );
};

module.exports.createPublish = function(req, res){
    var requestOptions, path;
    path = '/api/publish';
    requestOptions = {
        url : apiOptions.server + path,
        method : "POST",
        json : {
                user_name: req.body.user_name,
                titulo: req.body.titulo,
                genres: req.body.genres.split(","),
                album: req.body.album,
                autor: req.body.autor,
                lyrics: req.body.lyrics,
                track: req.body.track,
                image: req.body.image
                }
    };
    
    request(requestOptions,function(err, response, body) {
        console.log("entroooooooo");
        renderCreatePublish(req, res, body);
        }
    );
};

module.exports.uploadPublish = function(req, res){
    res.render('letra-subir', {});
};