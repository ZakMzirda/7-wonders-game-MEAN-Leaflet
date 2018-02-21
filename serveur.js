var express = require('express'); //demande d'inclusion d'Express 
var app = express();//creation d'un objet app
var port = process.env.PORT || 8080; // Définir le port par défaut
var morgan = require('morgan'); // Charge le middleware de logging
var mongoose = require('mongoose'); // HTTP request logger middleware pour Node.js
var bodyParser = require('body-parser'); // Charge le middleware de gestion des paramètres
var router = express.Router(); // Invoque le routeur express
var appRoutes = require('./app/routes/api')(router); // Importer les points de terminaison
var path = require('path'); // Import du module path
var fs = require('fs');//charger le fichier json


var Question = require('./app/models/questionFromFile');
var imgPath = __dirname+'/public/outils/images/Colisee-Rome.jpg';

app.use(morgan('dev')); // Active le middleware de logging
app.use(bodyParser.json()); // Active le Body-parser middleware
app.use(bodyParser.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded
app.use(express.static(__dirname + '/public')); // Autoriser le front end à accéder au dossier public
app.use('/api', appRoutes); // Assign name to end points (e.g., '/api/management/', '/api/users' ,etc. )


mongoose.connect('mongodb://localhost:27017/MeanDB', function(err) {
    if (err) {
        console.log('Non connecté à la base de données: ' + err); 
    } else {

        fs.readFile(__dirname+'/public/outils/files/7-merveilles-du-monde.json',

        // callback function that is called when reading file is done
        function(err, data) {		
            if(err){
                console.log('ERREUR (!)'+err);
            }else{
                Question.remove({}, function(err) {
                    if(err) {
                        console.log('ERREUR (!)'+err)
                    }else{
                        var jsonData = data;
                        var jsonParsed = JSON.parse(jsonData);
                        var compteur=0;
                        for(var i =0; i<jsonParsed.Questions.length;i++){
                            
                            var question = new Question();
                            question.merveille_image=fs.readFileSync(imgPath);
                            question.laquestion = jsonParsed.Questions[i].laquestion; 
                            question.coordonnee_x = jsonParsed.Questions[i].coordonnee_x;
                            question.coordonnee_y = jsonParsed.Questions[i].coordonnee_y;  
                            question.les_scores=0;
                            question.save(function(err){
                                if(err){
                                    console.log('############### Question non chargée! ###############');
                
                                }else{
                                    console.log('>>>> Question ajoutée! <<<<');
                                }
                                if(compteur==jsonParsed.Questions.length-1){
                                    console.log('\nFin de chargement!');
                                }
                                compteur++;

                            });
                        }
                        console.log('\nChargement...\n');
                    }
                 }); 
            }
            
    });



        console.log('Connecté avec succès à MongoDB'); 
    }
});

// Set Application Static Layout
app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname + '/public/app/views/index.html')); // Definition de index.html comme page de disposition
});

// Start Server
app.listen(port, function() {
    console.log('Exécution du serveur sur le port ' + port); // Ecoute sur le port qu'on a configuré
});
//popup style leaflet
//les scores
//back end images
//photo/description https://fr.wikipedia.org/wiki/Sept_Merveilles_du_monde#Le_Phare
