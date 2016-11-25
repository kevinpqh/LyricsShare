/*Pagina de INICIO*/
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



var getPublishInfo = function (req, res, callback) {
  var requestOptions, path;
  path = "/api/publish/" + req.params.publishid;
  requestOptions = {
    url : apiOptions.server + path,
    method : "GET",
    json : {}
  };
  request(
    requestOptions,
    function(err, response, body) {
      var data = body;
      if (response.statusCode === 200) {

        callback(req, res, data);
      } else {
        _showError(req, res, response.statusCode);
      }
    }
  );
};

var renderDetailPage = function (req, res, data) {
  res.render('letra-detalle', {
    title:data.song.titulo,
    song: data.song,
    publish:data
  });
};

/* GET 'Location info' page */
module.exports.MostrarLetra = function(req, res){
  getPublishInfo(req, res, function(req, res, responseData) {
    renderDetailPage(req, res, responseData);
  });
};


module.exports.listaLetras = function(req, res){
    res.render('index',{
        title: 'lyricsShare',
        usuario:{
            nombre: 'Luis',
            apellido: 'Yanque'
        },
        fecha: {
            dia: 'Hoy',
            hora: '7:30 AM'
        },
        tituloCancion: 'DUELE EL CORAZON',
        letraCancion: 'Si te vas yo también me voy Si me das yo también te doy Mi amor Bailamos hasta las diez Hasta que duelan los pies',
        megusta: 5,
        comentarios: 8
     });
};
/*module.exports.MostrarLetra = function(req, res){
    res.render('letra-detalle',{
    title: 'Local',
    music:{
        _id: 560,
        song:{
            _id: 35,
            titulo: 'Amor de verano',
            album: 'Airbag',
            autor: 'Airbag',
            genres:{
                _id: 2,
                name: 'Rock'
                }
            },
        likes: 10,
        comments: [{
                    _id: 1,
                    user: {
                            _id: 456,
                            name: 'Pablo Guzman',
                            user_name: 'pguzman',
                            password: 'xxxxxx'
                            },
                    post: 'Buenaza',
                    date: '16 July 2013'
                },{
                    _id: 2,
                    user:  {
                            _id: 246,
                            name: 'Calvin Clain',
                            user_name: 'cclain',
                            password: 'xxx'
                            },
                    post: 'Muy buena',
                    date: '15 July 2013'
                },{
                    _id: 3,
                    user:  {
                            _id: 158,
                            name: 'Alberto Casa',
                            user_name: 'acasa',
                            password: 'xxxxxxx'
                            },
                    post: 'Unica',
                    date: '14   July 2013'
                }]
    }
    });
};
*/
module.exports.uploadLetra = function(req,res){
    res.render('letra-subir',{ title :'lyricsShare' });
};
