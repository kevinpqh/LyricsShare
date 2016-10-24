var mongoose = require( 'mongoose' );

var UserSchema = new mongoose.Schema({
    _id: Number,
    name: String, // no requerido para el registro
    user_name: String,
    email:String,
    password: String
});

var CommentarySchema = new mongoose.Schema({
    _id: Number,
    user: UserSchema,
    post: String,
    date: Date,
    hora: String //hora en 12 horas
});

//Genero de Musica
var GenreSchema = new mongoose.Schema({
    _id: Number,
    name: String
});

var SongSchema = new mongoose.Schema({
    _id: Number,
    titulo: String,
    genres: [GenreSchema],
    album: String,
    autor: String,
    lyrics: String,
    track: String // cancion mp3
});
//Publicacion de un usuario
var PublishSchema = new mongoose.Schema({
    _id: Number,
    user: UserSchema,
    song: SongSchema,
    likes: Number,
    date: Date,
    comments: [CommentarySchema]
});

var FavoriteSchema = new mongoose.Schema({
    _id: Number,
    user: UserSchema,
    favorites: [PublishSchema]
});
mongoose.model('Usuario', UserSchema);