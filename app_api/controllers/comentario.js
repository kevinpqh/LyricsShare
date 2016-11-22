var mongoose = require('mongoose');
var Loc = mongoose.model('Publicacion');

var sendJsonResponse = function(res, status, content) {
    res.status(status);
    res.json(content);
};

//GET POST DELETE Y PUT de usuario  CommentListById
module.exports.CommentListById = function(req, res){//obtenemos la lista de ususrios
    if(req.params && req.params.commentid){
        Loc
            .findById(req.params.commentid)
            .exec(function(err,comentario){
                if(!comentario){
                    sendJsonResponse(res, 404, {"message": "userid no encontrado"});
                    return;
                }else if (err){
                    sendJsonResponse(res, 404, {"message": "userid error no encontrado"});
                    return;
                }
                sendJsonResponse(res,200,comentario);
            });
    }else {
        sendJsonResponse(res, 404, {"message": "no userid en request"});
    }
};
/*module.exports.CommentCreate = function(req, res){//creaar ususrios
    console.log(req.body.post);
    Loc.create({
        user_name : req.body.user_name,
        post: req.body.post   
        
    }, function(err,comentario){
        if(err){
            console.log(err);
            sendJsonResponse(res,400,err);
        }else {
            console.log(comentario);
            sendJsonResponse(res,201,comentario);
        }
    });    
};*/
module.exports.CommentCreate = function(req, res){//crear un comenetario
    console.log('Bien');
    if (req.params.publishid) {
    Loc
      .findById(req.params.publishid)
      .select('comments')
      .exec(
        function(err, publish) {
          if (err) {
            sendJsonResponse(res, 400, err);
          } else {
            doAddComment(req, res, publish);
          }
        }
    );
  } else {
    sendJsonResponse(res, 404, {
      "message": "Not found, locationid required"
    });
  }
};


var doAddComment = function(req, res, publish) {
  if (!publish) {
    sendJsonResponse(res, 404, "locationid not found");
  } else {
    publish.comments.push({
        user_name : req.body.user_name,
        post: req.body.post
    });
    publish.save(function(err, publish) {
      var thisComment;
      if (err) {
        console.log(err);
        sendJsonResponse(res, 400, err);
      } else {

        sendJsonResponse(res, 201, {"success": "Bien"});
      }
    });
  }
};




module.exports.CommentUpdateOne = function(req, res){// actualizar un ususrios en especifico
    if (!req.params.commentid) {
        sendJsonResponse(res, 404, {"message": "Not found, userid is required"});
        return;
    }
    Loc
        .findById(req.params.commentid)
        .select('-favorites -publish')
        .exec(
            function(err,comentario){
                if (!comentario) {
                    sendJsonResponse(res, 404, {"message": "userid not found"});
                    return;
                } else if (err){
                    sendJsonResponse(res, 400, err);
                    return;
                }
                comentario.post = req.body.post;
                
                    if (err) {
                        sendJsonResponse(res, 404, err);
                    } else {
                        sendJsonResponse(res, 200, comentario);
                    }
                });
};
module.exports.CommentDeleteOne = function(req, res){ //deliminar  un ususrios en especifico
    var commentid = req.params.commentid;
    console.log(commentid);
    if (commentid) {
        Loc
            .findByIdAndRemove(commentid)
            .exec(
                function(err,comentario){
                    if (err){
                        console.log(err);
                        sendJsonResponse(res,404,err);
                        return;
                    }
                    console.log("comentario id "+commentid + "deleted");
                    sendJsonResponse(res,204,null);
                }
            );
    } else {
        sendJsonResponse(res,404,{"message":"no commentid"});
    }
};