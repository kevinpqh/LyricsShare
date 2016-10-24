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
module.exports.uploadLetra = function(req,res){
    res.render('letra-subir',{ title :'lyricsShare' });
};