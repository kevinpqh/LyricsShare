var mongoose = require('mongoose');
var Loc = mongoose.model('Publicacion');

var sendJsonResponse = function(res, status, content) {
    res.status(status);
    res.json(content);
};

module.exports.PublishListById = function(req,res){
    Loc
        .find({})
        .exec(function(err, location) {
            if (!location) {
                sendJsonResponse(res, 404, {
                    "message": "locationid not found"}
                    );
                return;
            } else if (err) {
                sendJsonResponse(res, 404, err);
                return;
            }
            sendJsonResponse(res, 200, location);
        });
}


module.exports.PublishReadOne = function(req, res) {
    if (req.params && req.params.publishid) {
        Loc
            .findById(req.params.publishid)
            .exec(function(err, location) {
                console.log("where is");
                if (!location) {
                    sendJsonResponse(res, 404, {
                        "message": "locationid not found"}
                        );
                    return;
                } else if (err) {
                    sendJsonResponse(res, 404, err);
                    return;
                }
                sendJsonResponse(res, 200, location);
            });
    } else {
        sendJsonResponse(res, 404, {
            "message": "No locationid in request"}
            );
    }
};

module.exports.PublishCreate = function(req, res) {
    
    Loc.create({
        song:{
            titulo: req.body.titulo,
            genres: req.body.genres.split(","),//Genero de Music
            album: req.body.album,
            autor: req.body.autor,
            lyrics: req.body.lyrics,
            track: req.body.track, // cancion mp3
            image: req.body.image //El Binary no funciona
        },
        user_name : req.body.user_name,
        
    }, function(err,publish){
        if(err){
            console.log(err);
            sendJsonResponse(res,400,err);
        }else {
            console.log(publish);
            sendJsonResponse(res,201,publish);
        }
    });    
};

module.exports.PublishUpdateOne = function(req, res) {
    if (!req.params.publishid) {
        sendJsonResponse(res, 404, {
            "message": "Not found, locationid is required"}
            );
        return;
    }

    Loc
        .findById(req.params.publishid)
        .select('-comments')
        .exec(
            function(err, publish) {
                if (!publish) {
                    sendJsonResponse(res, 404, {
                        "message": "publishid not found"}
                        );
                    return;
                } else if (err) {
                    sendJsonResponse(res, 400, err);
                    return;
                }
                publish.likes = req.body.likes;
                publish.user_name = req.body.user_name;
                publish.song = {
                                titulo: req.body.titulo,
                                genres: req.body.genres.split(","),//Genero de Music
                                album: req.body.album,
                                autor: req.body.autor,
                                lyrics: req.body.lyrics,
                                track: req.body.track, // cancion mp3
                                image: req.body.image //El Binary no funciona
                                }

                publish.save(function(err, publish) {
                    if (err) {
                        sendJsonResponse(res, 404, err);
                    } else {
                        sendJsonResponse(res, 200, publish);
                    }
                });
        }
    );
};


module.exports.PublishDeleteOne = function(req, res) {
    var publishid = req.params.publishid;

    if (publishid) {
        Loc
            .findByIdAndRemove(publishid)
            .exec(
                function(err, publish) {
                    if (err) {
                        sendJsonResponse(res, 404, err);
                        return;
                    }
                    sendJsonResponse(res, 204, null);
                }
            );
    } else {
        sendJsonResponse(res, 404, {
            "message": "No publishid"}
            );
    }
};