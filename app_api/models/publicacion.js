var mongoose = require( 'mongoose' );

var CommentarySchema = new mongoose.Schema({
    user_name: String,
    post: String,
    date: Date,
    hora: String //hora en 12 horas
});

//Genero de Musica
var GenreSchema = new mongoose.Schema({
    name: String
});

var SongSchema = new mongoose.Schema({
    titulo: String,
    genres: [GenreSchema],
    album: String,
    autor: String,
    lyrics: String,
    track: String, // cancion mp3
    image: String //El Binary no funciona 
});


//Publicacion de un usuario
var PublishSchema = new mongoose.Schema({
    song: SongSchema,
    likes: Number,
    date: Date,
    comments: [CommentarySchema]
});

var FavoriteSchema = new mongoose.Schema({
    user_name:String,
    favorites: [PublishSchema]
});

var UserSchema = new mongoose.Schema({
    name: String, // no requerido para el registro
    user_name: { type: String, required: true, index: { unique: true } },
    email: { type: String, required: true },
    password: { type: String, required: true },
    publish:[PublishSchema],
    favorites:[FavoriteSchema]
});

mongoose.model('Usuario', UserSchema);