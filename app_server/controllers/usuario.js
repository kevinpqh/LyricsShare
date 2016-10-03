/*Pagina de PRE-INICIO*/
module.exports.iniciarSesion = function(req, res){
    res.render('iniciar-sesion',{ title: 'lyricsShare' });
};
module.exports.registrarUsuario = function(req, res){
    res.render('registrar-usuario',{title: 'lyricsShare'});
};

