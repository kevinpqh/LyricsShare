var request = require('request');
var apiOptions = {
    server : "http://localhost:3000"
};
if (process.env.NODE_ENV === 'production') {
    apiOptions.server = "https://lyricsshare.herokuapp.com";
}
/**FUNCIONES QUE AYUDAN */
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

var renderIniciarUsuario = function (req,res){
    res.render('iniciar-sesion',{ title: 'lyricsShare' });

}
/*Pagina de PRE-INICIO*/
module.exports.iniciarSesion = function(req, res){
    renderIniciarUsuario(req,res);
};
module.exports.doIniciarSesion = function (req, res){
    var requestOptions, path;
    path = "/api/user/login/";
    var username = req.body.username;
    var password = req.body.password;
    requestOptions = {
        url : apiOptions.server + path,
        method : "GET",
        json : {},
        qs : {
            user : username,
            pass : password
        }
    };
    request(
        requestOptions,
        function(err, response, body) {
            var data = body;
            if (response.statusCode === 200) {
                res.redirect('/');
                //console.log(body);
            } else {
                _showError(req, res, response.statusCode);
            }
        }
    );
}

var renderRegistrarUsuario =  function (req,res){
    res.render('registrar-usuario',{title: 'lyricsShare'});
}

module.exports.registrarUsuario = function(req, res){
    renderRegistrarUsuario(req,res);
};
module.exports.addRegistrarUsuario = function(req,res){
     var requestOptions, path, postdata,retype_pass;

     path = "/api/user";
     postdata = {
        name: req.body.username,
        user_name: req.body.username,
        email: req.body.email,
        password: req.body.password
    };
    retype_pass= req.body.retypepassword;
    
    requestOptions = {
        url : apiOptions.server + path,
        method : "POST",
        json : postdata
    };
    if (!postdata.user_name || !postdata.email || !postdata.password || postdata.password != retype_pass) {
        res.redirect('/registro');
        console.log("no ingreso ");
    }
    else{
        request(
            requestOptions,
            function(err, response, body) {
                if (response.statusCode === 201) {
                    res.redirect('/');
                } else if (response.statusCode === 400 && body.user_name && body.user_name === "ValidationError" ) {
                    res.redirect('/registro?err=val');
                } else {
                    console.log(body);
                    _showError(req, res, response.statusCode);
                }
            }
        );
        console.log(postdata.user_name);
        console.log(postdata.email);
        console.log(postdata.password);
        console.log(retype_pass);

    }
};
