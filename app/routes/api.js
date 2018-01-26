var User = require('../models/user'); // Import User Model

module.exports = function(router) {

    //creation d'une route http://localhost:8080/users on peut tester le fonctionnement de notre route avec postman  
    router.post('/users', function(req, res) {
        var user = new User(); // Create new User object
        user.username = req.body.username; // Save username from request to User object
        user.password = req.body.password; // Save password from request to User object
        user.email = req.body.email; // Save email from request to User object
            if(req.body.username==null || req.body.username=='' || req.body.password==null || req.body.password=='' || req.body.email==null || req.body.email==''){
                res.send('vous avez oublié un champ');
            }else{
            user.save(function(err){
                if(err){
                    res.send('Username or email exist');
                }else{
                    res.send('utilisateur creer');
                }
            });
        }
    });
    return router;
}
    