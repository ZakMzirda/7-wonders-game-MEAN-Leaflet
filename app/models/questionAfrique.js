//collection des 7 mervielles d'afrique a partir du fichier json
var mongoose = require('mongoose'); // Import Mongoose Package
var Schema = mongoose.Schema;

var QuestionSchema = new Schema({
    laquestion : {type : String, required:true, unique:true},
    coordonnee_x : {type : Number, required:true},
    coordonnee_y : {type : Number, required:true},
    les_scores : {type : [Number]},
    merveille_image : {type : Buffer},
    image_nom:{type : String},
    description:{type : String}

});
var mongooseModel= mongoose.model('Seven-Wonders-Afrique', QuestionSchema, 'Seven-Wonders-Afrique');
module.exports = mongooseModel//pour l'exporter vers le serveur