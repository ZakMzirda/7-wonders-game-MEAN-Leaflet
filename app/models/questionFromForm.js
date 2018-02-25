//collection pour des questions questions personnalisées a partir d'un formulaire
var mongoose = require('mongoose'); // Import Mongoose Package
var Schema = mongoose.Schema; 

var QuestionSchema = new Schema({
    laquestion : {type : String, required:true, unique:true},
    coordonnee_x : {type : Number, required:true},
    coordonnee_y : {type : Number, required:true},
    les_scores : {type : [Number]}
});
var mongooseModel= mongoose.model('Custom-Questions', QuestionSchema, 'Custom-Questions');
module.exports = mongooseModel//pour l'exporter vers le serveur
