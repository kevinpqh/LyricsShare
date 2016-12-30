var mongoose = require( 'mongoose' );
var publish= require('./publicacion');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');

var UserSchema = new mongoose.Schema({
    name: String, // no requerido para el registro
    user_name: { type: String, required: true },
    email: { type: String, required: true, index: { unique: true } },
    imagen: { type: String,"default":"kevin/kev"  },
    //password: { type: String, required: true },
    hash: String,
    salt: String,
    date: { type: Date,"default":Date.now  },
    publish:[publish.Publish],
    favorites:[publish.Publish]
});

UserSchema.methods.setPassword = function(password){
   this.salt = crypto.randomBytes(16).toString('hex');
   this.hash = crypto.pbkdf2Sync(password, this.salt, 1000,64).toString('hex');
};

UserSchema.methods.validPassword = function(password) {
    var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
    return this.hash === hash;
};

UserSchema.methods.generateJwt = function() {
    var expiry = new Date();
    expiry.setDate(expiry.getDate() + 7);
    
    return jwt.sign({
        _id: this._id,
        email: this.email,
        name: this.name,
        username: this.user_name,
        
        exp: parseInt(expiry.getTime() / 1000),
    }, process.env.JWT_SECRET );
};

mongoose.model('Usuario', UserSchema);
