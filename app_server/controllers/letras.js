/*Pagina de INICIO*/
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
module.exports.MostrarLetra = function(req, res){
    res.render('letra-detalle',{title: 'lyricsShare'});
};
module.exports.uploadLetra = function(req,res){
    res.render('letra-subir',{ title :'lyricsShare' });
};