angular.module('questionControllers', [])
.controller('ergQuestionCtrl',function($http, $location, $timeout){
    var app =this;//pour pouvoir acceder a this a l'interieur de function(data)
    
    this.enrgQuestion = function(enrgData){
       
        $http.get('api/GetQuestionsFromForm').success(function (response) {
            var taille = response.maquestion.length;
            
        });
            app.loading=true;
            app.errorMsg=false;
            //var taille = response.maquestion.length;
            /*if(taille>=3 && taille!=0){
                $location.path('/');
            }else{*/
                $http.post('/api/questions', this.enrgData).then(function(data){
                    /*console.log(data.data.success);
                    console.log(data.data.message);*/
                        //console.log('Taille de la collection Custom-Question '+taille);
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
            //}
        //});//httpget
    }
});