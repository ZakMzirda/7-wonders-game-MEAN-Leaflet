
var mongoose = require('mongoose'); // Import Mongoose Package
var Schema = mongoose.Schema; // Assign Mongoose Schema function to variable

var QuestionSchema = new Schema({
    laquestion : {type : String, required:true},
    coordonnee_x : {type : Number, required:true},
    coordonnee_y : {type : Number, required:true},
    les_scores : {type : [Number]}
});
module.exports = mongoose.model('Questions', QuestionSchema, 'Questions');//pour l'exporter vers le serveur