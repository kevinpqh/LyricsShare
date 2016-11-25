var mongoose = require( 'mongoose' );

var CommentarySchema = new mongoose.Schema({
    user_name: { type: String, required: true },
    post: { type: String, required: true },
    date: { type: Date,"default":Date.now  },
    //hora: String //hora en 12 horas
});

var SongSchema = new mongoose.Schema({
    titulo: { type: String, required: true },
    genres: [String],//Genero de Music
    album: String,
    autor: { type: String, required: true },
    lyrics: { type: String, required: true },
    track: String, // cancion mp3
    image: { type: String, required: true } //El Binary no funciona
});


//Publicacion de un usuario
var PublishSchema = new mongoose.Schema({
    song: SongSchema,
    likes: {type: Number,"default":0  },
    date: { type: Date,"default":Date.now  },
    comments: [CommentarySchema],
    user_name: { type: String, required: true }
});

//mongoose.model('Favoritos', FavoriteSchema);
module.exports.modelpublish = mongoose.model('Publicacion', PublishSchema);
module.exports.Publish = PublishSchema;
