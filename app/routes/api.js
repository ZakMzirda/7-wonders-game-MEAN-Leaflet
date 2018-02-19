var Question = require('../models/question'); // Import User Model

module.exports = function(router) {

    //creation d'une route http://localhost:8080/users on peut tester le fonctionnement de notre route avec postman  
    router.post('/questions', function(req, res) {
        var question = new Question(); // Create new User object
        question.laquestion = req.body.laquestion; 
        question.coordonnee_x = req.body.coordonnee_x; 
        question.coordonnee_y = req.body.coordonnee_y; 
        question.les_scores=0;
        
            if(req.body.laquestion==null || req.body.laquestion=='' || req.body.coordonnee_x==null || req.body.coordonnee_x=='' || req.body.coordonnee_y==null || req.body.coordonnee_y==''){
                res.json({success: false, message :'Vous avez oublié un champ'});
            }else{
                question.save(function(err){
                if(err){
                    res.json({success: false, message :'Cette question existe déjà!'});

                }else{
                    res.json({success: true, message :'Question ajoutée!'});

                }
            });
        }
    });
    router.get('/addScore/:id', function(req, res) {
        var id = req.params.id;
        //res.send('jai reçu : ' +req.score);
        Question.findOne({_id: id}, function(err, objectTrouve){
           if(err){
               console.log(err);
               res.json({success: false, message :'Erreur(!) donnée non trouvée'});
           }else{
               if(!objectTrouve){
                    res.json({success: false, message :'Erreur(!) donnée non trouvée'});
               }else{
                   
                   if(req.body.les_scores){
                       objectTrouve.les_scores=req.body.les_scores;
                   }
                   objectTrouve.save(function(err, updatescore){
                       if(err){
                           console.log(err);
                           res.json({success: false, message :'Erreur(!) donnée non sauvegarder'});
                       }else{
                           res.send(updatescore);
                       }
                   });

               }
           }
        });
            
    });
   router.put('/addScore/:id', function(req, res){
       var id = req.params.id;
       console.log(req.body.laquestion);
        //console.log(req);
       Question.findOne({_id: id}, function(err, objectTrouve){
           objectTrouve.les_scores=req.body.les_scores;
           objectTrouve.save();
           //res.send(objectTrouve);
           console.log(objectTrouve);
       });
        
   });

    router.get('/GetQuestion', function(req, res) {
        Question.find({}, function(err, maquestion){


            if(err){
                res.json({success: false, message :'Erreur(!) sur la recuperation des données'});

            }else{
                res.json({success: true, message :'Recuperation des données avec succès', maquestion});

            }
     
        });
    });


    return router;
}
    