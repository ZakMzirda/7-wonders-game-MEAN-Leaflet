
var mongoose = require('mongoose'); // Import Mongoose Package
var Schema = mongoose.Schema; // Assign Mongoose Schema function to variable

var QuestionSchema = new Schema({
    laquestion : {type : String, lowercase:true, required:true},
    coordonnee_x : {type : Number, required:true},
    coordonnee_y : {type : Number, required:true}
});
module.exports = mongoose.model('Question', QuestionSchema);//pour l'exporter vers le serveur