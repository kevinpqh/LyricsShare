/*Pagina de INICIO*/
module.exports.listaLetras = function(req, res){
    res.render('index',{ title: 'lyricsShare' });
};
module.exports.MostrarLetra = function(req, res){
    res.render('letra-detalle',{title: 'lyricsShare'});
};
module.exports.uploadLetra = function(req,res){
    res.render('letra-subir',{ title :'lyricsShare' });
};