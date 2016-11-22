var mongoose = require('mongoose');
var Loc = mongoose.model('Usuario');

var sendJsonResponse = function(res, status, content) {
    res.status(status);
    res.json(content);
};


//GET POST DELETE Y PUT de usuario
module.exports.UserListById = function(req, res){//obtenemos la lista de ususrios
    if(req.params && req.params.userid){
        Loc
            .findById(req.params.userid)
            .exec(function(err,usuario){
                if(!usuario){
                    sendJsonResponse(res, 404, {"message": "userid no encontrado"});
                    return;
                }else if (err){
                    sendJsonResponse(res, 404, {"message": "userid error no encontrado"});
                    return;
                }
                sendJsonResponse(res,200,usuario);
            });
    }else {
        sendJsonResponse(res, 404, {"message": "no userid en request"});
    }
};
module.exports.UserCreate = function(req, res){//creaar ususrios
    console.log(req.body.name);
    Loc.create({
        name: req.body.name,
        user_name: req.body.user_name,
        email: req.body.email,
        password: req.body.password
    }, function(err,usuario){
        if(err){
            console.log(err);
            sendJsonResponse(res,400,err);
        }else {
            console.log(usuario);
            sendJsonResponse(res,201,usuario);
        }
    });    
};
module.exports.UserReadOne = function(req, res){//motrar un ususrios en especifico
    var user = req.query.user;
    var pass = req.query.pass;

    if (!user || !pass) {
        console.log('UserReadOne no tiene parametros');
        sendJsonResponse(res, 404, {
            "message": "user y pass son parametros requidos"
        });
        return;
    }
    Loc
        .findOne({user_name: user, password: pass})
        .exec(function(err,usuario){
            if(!usuario){
                sendJsonResponse(res, 404, {"message": "userid no encontrado"});
                return;
            }else if (err){
                sendJsonResponse(res, 404, {"message": "userid error no encontrado"});
                return;
            }
            sendJsonResponse(res,200,usuario);
        });
};
module.exports.UserUpdateOne = function(req, res){// actualizar un ususrios en especifico
    if (!req.params.userid) {
        sendJsonResponse(res, 404, {"message": "Not found, userid is required"});
        return;
    }
    Loc
        .findById(req.params.userid)
        .select('-favorites -publish')
        .exec(
            function(err,usuario){
                if (!usuario) {
                    sendJsonResponse(res, 404, {"message": "userid not found"});
                    return;
                } else if (err){
                    sendJsonResponse(res, 400, err);
                    return;
                }
                usuario.name = req.body.name;
                usuario.user_name = req.body.user_name;
                usuario.email = req.body.email;
                usuario.password = req.body.password;
                usuario.save(function(err,usuario){
                    if (err) {
                        sendJsonResponse(res, 404, err);
                    } else {
                        sendJsonResponse(res, 200, location);
                    }
                });
            });
};
module.exports.UserDeleteOne = function(req, res){ //deliminar  un ususrios en especifico
    var userid = req.params.userid;
    console.log(userid);
    if (userid) {
        Loc
            .findByIdAndRemove(userid)
            .exec(
                function(err,usuario){
                    if (err){
                        console.log(err);
                        sendJsonResponse(res,404,err);
                        return;
                    }
                    console.log("usuario id "+userid + "deleted");
                    sendJsonResponse(res,204,null);
                }
            );
    } else {
        sendJsonResponse(res,404,{"message":"no userid"});
    }
};
