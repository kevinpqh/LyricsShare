var mongoose = require( 'mongoose' );

var UserSchema = new mongoose.Schema({
    _id: Number,
    name: String,
    user_name: String,
    password: String
});

var CommentarySchema = new mongoose.Schema({
    _id: Number,
    user: UserSchema,
    post: String,
    date: Date
});

var GenreSchema = new mongoose.Schema({
    _id: Number,
    name: String
});

var SongSchema = new mongoose.Schema({
    _id: Number,
    titulo: String, 
    album: String,
    autor: String,
    genres: [GenreSchema]
});

var LyricSchema = new mongoose.Schema({
    _id: Number,
    song:SongSchema,
    likes: Number, 
    comments: [CommentarySchema]
});
