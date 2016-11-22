var mongoose = require( 'mongoose' );
var publish= require('./publicacion');

var UserSchema = new mongoose.Schema({
    name: String, // no requerido para el registro
    user_name: { type: String, required: true, index: { unique: true } },
    email: { type: String, required: true },
    password: { type: String, required: true },
    date: { type: Date,"default":Date.now  },
    publish:[publish.Publish],
    favorites:[publish.Publish]
});

mongoose.model('Usuario', UserSchema);
