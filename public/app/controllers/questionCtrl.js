angular.module('questionControllers', [])
.controller('ergQuestionCtrl',function($http, $location, $timeout){
    var app =this;//pour pouvoir acceder a this a l'interieur de function(data)
    
    this.enrgQuestion = function(enrgData){
       
        $http.get('api/GetQuestionsFromForm').success(function (response) {
            var taille = response.maquestion.length;
            
        });
            app.loading=true;
            app.errorMsg=false;
            $http.post('/api/questions', this.enrgData).then(function(data){
                    if(data.data.success){
                        app.loading=false;
                        app.successMsg = data.data.message;
                        
                        $timeout(function(){
                            $location.path('/');//attendre 1.5ms avant de rediriger vers la page home
                        }, 1500);
        
                    }else{
                        app.loading=false;
                        app.errorMsg = data.data.message;
                    }
                        
            });
    }
});