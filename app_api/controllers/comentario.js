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
    sendJsonResponse(res, 404, "publishid not found");
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


module.exports.CommentReadOne = function(req, res) {
  //console.log("Getting single review");
  if (req.params && req.params.publishid && req.params.commentid) {
    Loc
      .findById(req.params.publishid)
      .select(' comments')
      .exec(
        function(err, publish) {
          console.log(publish);
          var response, comment;
          if (!publish) {
            sendJsonResponse(res, 404, {
              "message": "locationid not found"
            });
            return;
          } else if (err) {
            sendJsonResponse(res, 400, err);
            return;
          }
          if (publish.comments && publish.comments.length > 0) {
            comment = publish.comments.id(req.params.commentid);
            if (!comment) {
              sendJsonResponse(res, 404, {
                "message": "reviewid not found"
              });
            } else {
              response = {

                comment: comment
              };
              sendJsonResponse(res, 200, response);
            }
          } else {
            sendJsonResponse(res, 404, {
              "message": "No reviews found"
            });
          }
        }
    );
  } else {
    sendJsonResponse(res, 404, {
      "message": "Not found, locationid and reviewid are both required"
    });
  }
};



module.exports.CommentUpdateOne = function(req, res){// actualizar un comentario en especifico
  if (!req.params.publishid || !req.params.commentid) {
  sendJsonResponse(res, 404, {
    "message": "Not found, locationid and reviewid are both required"
  });
  return;
}
Loc
  .findById(req.params.publishid)
  .select('comments')
  .exec(
    function(err, publish) {
      var thisComment;
      if (!publish) {
        sendJsonResponse(res, 404, {
          "message": "locationid not found"
        });
        return;
      } else if (err) {
        sendJsonResponse(res, 400, err);
        return;
      }
      if (publish.comments && publish.comments.length > 0) {
        thisComment = publish.comments.id(req.params.commentid);
        if (!thisComment) {
          sendJsonResponse(res, 404, {
            "message": "reviewid not found"
          });
        } else {
          thisComment.user_name = req.body.user_name;
          thisComment.post = req.body.post;

          publish.save(function(err, publish) {
            if (err) {
              sendJsonResponse(res, 404, err);
            } else {
            //  updateAverageRating(location._id);
              sendJsonResponse(res, 200, thisComment);
            }
          });
        }
      } else {
        sendJsonResponse(res, 404, {
          "message": "No review to update"
        });
      }
    }
);
};

module.exports.CommentDeleteOne = function(req, res){ //deliminar  un ususrios en especifico
  if (!req.params.publishid || !req.params.commentid) {
    sendJsonResponse(res, 404, {
      "message": "Not found, locationid and reviewid are both required"
    });
    return;
  }
  Loc
    .findById(req.params.publishid)
    .select('comments')
    .exec(
      function(err, publish) {
        if (!publish) {
          sendJsonResponse(res, 404, {
            "message": "locationid not found"
          });
          return;
        } else if (err) {
          sendJsonResponse(res, 400, err);
          return;
        }
        if (publish.comments && publish.comments.length > 0) {
          if (!publish.comments.id(req.params.commentid)) {
              sendJsonResponse(res, 404, {
              "message": "comment not found"
            });
          } else {
            console.log("eliminado");
            publish.comments.id(req.params.commentid).remove();
            //sendJsonResponse(res, 204, {"success": "Eliminado"});
           publish.save(function(err) {
              if (err) {
              console.log("eliminao erro");
                sendJsonResponse(res, 404, err);
              } else {
                console.log("eliminao happy");
                sendJsonResponse(res, 204, null);
              }
              console.log("eliminao");
            });


          }
        } else {
          sendJsonResponse(res, 404, {
            "message": "No review to delete"
          });
        }
      }
  );
};
