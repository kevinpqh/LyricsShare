var mongoose = require( 'mongoose' );

var UserSchema = new mongoose.Schema({
    name: String, // no requerido para el registro
    user_name: String,
    email:String,
    password: String,
    publish:[PublishSchema],
    favorites:[FavoriteSchema]
});

//Publicacion de un usuario
var PublishSchema = new mongoose.Schema({
    song: SongSchema,
    likes: Number,
    date: Date,
    comments: [CommentarySchema]
});

var CommentarySchema = new mongoose.Schema({
    user_name: String,
    post: String,
    date: Date,
    hora: String //hora en 12 horas
});

var SongSchema = new mongoose.Schema({
    titulo: String,
    genres: [GenreSchema],
    album: String,
    autor: String,
    lyrics: String,
    track: String, // cancion mp3
    image: Binary 
});

//Genero de Musica
var GenreSchema = new mongoose.Schema({
    name: String
});


var FavoriteSchema = new mongoose.Schema({
    user_name:String,
    favorites: [PublishSchema]
})

mongoose.model('Usuario', UserSchema);