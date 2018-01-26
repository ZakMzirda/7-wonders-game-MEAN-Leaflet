var mongoose = require('mongoose'); // Import Mongoose Package
var Schema = mongoose.Schema; // Assign Mongoose Schema function to variable

var UserSchema = new Schema({
    username : {type : String, lowercase:true, required:true, unique:true},
    password : {type : String, required:true},
    email : {type : String, required:true, lowercase:true, unique:true}
});
module.exports = mongoose.model('User', UserSchema);//pour l'exporter vers le serveur