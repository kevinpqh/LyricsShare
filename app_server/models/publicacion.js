var mongoose = require( 'mongoose' );

var UserSchema = new mongoose.Schema({
    _id: USER_ID,
    name: String,
    user_name: String,
    password: String
});

var CommentarySchema = new mongoose.Schema({
    _id: COMEN_ID,
    user: [UserSchema],
    post: String,
    date: Date
});

var GenreSchema = new mongoose.Schema({
    _id: GENRE_ID,
    name: String
});

var SongSchema = new mongoose.Schema({
    _id: SONG_ID,
    titulo: String, 
    album: String,
    autor: String,
    genres: [GenreSchema]
});

var LyricSchema = new mongoose.Schema({
    _id: LYRICS_ID,
    song:[SongSchema],
    likes: TOTAL_LIKES, 
    comments: [CommentarySchema]
});
