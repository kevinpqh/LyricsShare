var mongoose = require('mongoose');
var Loc = mongoose.model('Usuario');

var sendJsonResponse = function(res, status, content) {
    res.status(status);
    res.json(content);
};


//GET POST DELETE Y PUT de usuario
module.exports.UserListById = function(req, res){//obtenemos la lista de ususrios
    sendJsonResponse(res, 200, {"status" : "success"});
};
module.exports.UserCreate = function(req, res){//creaar ususrios
    sendJsonResponse(res, 200, {"status" : "success"});
};
module.exports.UserReadOne = function(req, res){//motrar un ususrios en especifico
    sendJsonResponse(res, 200, {"status" : "success"});
};
module.exports.UserUpdateOne = function(req, res){// actualizar un ususrios en especifico
    sendJsonResponse(res, 200, {"status" : "success"});
};
module.exports.UserDeleteOne = function(req, res){ //deliminar  un ususrios en especifico
    sendJsonResponse(res, 200, {"status" : "success"});
};

module.exports.UserLogin = function(req, res){ //deliminar  un ususrios en especifico
    if(req.params && req.params.userid){
        Loc
            .findById(req.params.userid)
            .exec(function(err,location){
                if(!location){
                    sendJsonResponse(res, 404, {"message": "locationid no encontrado"});
                    return;
                }
                else if(err){
                    sendJsonResponse(res, 404, err);
                    return;
                }
                sendJsonResponse(res, 200, location);
        }); 
    }else {
        sendJsonResponse(res, 404, {"message": "no locationid en request"});
    }
};
