var Question = require('../models/question'); // Import User Model

module.exports = function(router) {

    //creation d'une route http://localhost:8080/users on peut tester le fonctionnement de notre route avec postman  
    router.post('/questions', function(req, res) {
        var question = new Question(); // Create new User object
        question.laquestion = req.body.laquestion; // Save username from request to User object
        question.coordonnee_x = req.body.coordonnee_x; // Save password from request to User object
        question.coordonnee_y = req.body.coordonnee_y; // Save email from request to User object
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
    return router;
}
    