var Question = require('../models/question'); // Import User Model

module.exports = function(router) {

    //creation d'une route http://localhost:8080/users on peut tester le fonctionnement de notre route avec postman  
    router.post('/questions', function(req, res) {
        var question = new Question(); // Create new User object
        question.laquestion = req.body.laquestion; // Save username from request to User object
        question.coordonnee_x = req.body.coordonnee_x; // Save password from request to User object
        question.coordonnee_y = req.body.coordonnee_y; // Save email from request to User object
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
    router.put('/addScore/:id', function(req, res) {
        var id = req.params.id;
        Question.findOne({_id: id}, function(err, objectTrouve){
           if(err){
               console.log(err);
               res.status(500).send();
           }else{
               if(!objectTrouve){
                    res.status(404).send();
               }else{
                   if(req.body.laquestion){
                       objectTrouve.laquestion=req.body.laquestion;
                   }
                   if(req.body.coordonnee_x){
                       objectTrouve.coordonnee_x=req.body.coordonnee_x;
                   }
                   if(req.body.coordonnee_y){
                       objectTrouve.coordonnee_y=req.body.coordonnee_y;
                   }
                   if(req.body.les_scores){
                       objectTrouve.les_scores=req.body.les_scores;
                   }
                   objectTrouve.save(function(err, updatescore){
                       if(err){
                           console.log(err);
                           res.status(500).send();
                       }else{
                           res.send(updatescore);
                       }
                   });



               }
           }
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
    