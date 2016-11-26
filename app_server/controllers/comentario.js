var request = require('request');

var apiOptions = {
    server : "http://localhost:3000"
};
if (process.env.NODE_ENV === 'production') {
    apiOptions.server = "https://lyricsshare.herokuapp.com";
}


var _showError = function (req, res, status) {
  var title, content;
  if (status === 404) {
    title = "404, page not found";
    content = "Oh dear. Looks like we can't find this page. Sorry.";
  } else if (status === 500) {
    title = "500, internal server error";
    content = "How embarrassing. There's a problem with our server.";
  } else {
    title = status + ", something's gone wrong";
    content = "Something, somewhere, has gone just a little bit wrong.";
  }
  res.status(status);
  res.render('generic-text', {
    title : title,
    content : content
  });
};

//ALL comentarios
module.exports.CommentListById = function(req, res){
  var requestOptions, path,publishid;
  publishid= req.params.publishid;
  path = "/api/publish/" + publishid + '/comment';
  requestOptions = {
    url : apiOptions.server + path,
    method : "GET",
    json : {}
  };
  request(
    requestOptions,
      function(err, response, body) {
          if (response.statusCode === 200) {
                console.log("comentarios listos");
              //res.redirect('/');
          } else if (response.statusCode === 400 && body.user_post && body.post === "ValidationError" ) {
              res.redirect('/registro?err=val');
          } else {
              console.log(body);
              _showError(req, res, response.statusCode);
          }
        }
  );
};



//Crear un comentario
module.exports.CommentCreate = function(req,res){
  var requestOptions, path, publishid, postdata;
  publishid= req.params.publishid;
  path = "/api/publish/" + publishid + '/comment';
  postdata = {
     user_name: req.body.user_name,
     post: req.body.post
 };
 //retype_pass= req.body.retypepassword;

 requestOptions = {
     url : apiOptions.server + path,
     method : "POST",
     json : postdata
 };
 if (!postdata.user_name || !postdata.post ) {
       res.redirect('/publish/' + publishid + '/comment/commentid?err=val');
 }
 else{
     request(
         requestOptions,
         function(err, response, body) {
             if (response.statusCode === 201) {
                   console.log("comentario realizado");
                   var ruta = '/detalle/' + publishid;
                   res.redirect(ruta);
             } else if (response.statusCode === 400 && body.user_name && body.post === "ValidationError" ) {
                 res.redirect('/registro?err=val');
             } else {
                 console.log(body);
                 _showError(req, res, response.statusCode);
             }
         }
     );


 }

};
//Actualizar o editar comentario
module.exports.CommentUpdateOne = function(req,res){
/*
  var requestOptions, path, publishid, commentid,postdata;
  publishid= req.params.publishid;
  commentid= req. params.commentid;
  path = "/api/publish/" + publishid+ "/comment/" + commentid;

  postdata = {
    user_name: req.body.username,
    post: req.body.post,
    date: req.body.date
};


 requestOptions = {
     url : apiOptions.server + path,
     method : "PUT",
     json : postdata
 };
 if (!postdata.post ) {
       res.redirect('/publish/' + publishid + '/comment/commentid?err=val');
 }
 else{
     request(
         requestOptions,
         function(err, response, body) {
             if (response.statusCode === 200) {
                    console.log("comentario actualizado");
                 //res.redirect('/');
             } else if (response.statusCode === 400 && body.post && body.post === "ValidationError" ) {
                 res.redirect('/registro?err=val');
             } else {
                 console.log(body);
                 _showError(req, res, response.statusCode);
             }
         }
     );

 }
*/
};

//delete comentario
module.exports.CommentDeleteOne = function(req,res){
  /*var requestOptions, path,publishid,commentid,postdata;

  publishid= req.params.publishid;
  commentid= req. params.commentid;
  path = "/api/publish/" + publishid+ "/comment/" + commentid;
  postdata = {
    user_name: req.body.username,
    post: req.body.post,
    date: req.body.date,
    hora: req.body.hora
 };
 //retype_pass= req.body.retypepassword;

 requestOptions = {
     url : apiOptions.server + path,
     method : "DELETE",
     json : postdata
 };
 if (!postdata.user_name || !postdata.post ) {
       res.redirect('/publish/' + publishid + '/comment/commentid?err=val');
 }
 else{
     request(
         requestOptions,
         function(err, response, body) {
             if (response.statusCode === 204) {
                 console.log("comentario borrado"); //duda en codigo de error
             } else if (response.statusCode === 400 && body.post && body.post  === "ValidationError" ) {
                 res.redirect('/registro?err=val');
             } else {
                 console.log(body);
                 _showError(req, res, response.statusCode);
             }
         }
     );

 }
*/
};
