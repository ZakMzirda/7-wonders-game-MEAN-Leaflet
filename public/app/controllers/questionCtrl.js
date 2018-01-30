angular.module('questionControllers', [])
.controller('ergQuestionCtrl',function($http){
    var app =this;//pour pouvoir acceder a this a l'interieur de function(data)
    
    this.enrgQuestion = function(enrgData){
        app.loading=true;
        app.errorMsg=false;
        $http.post('/api/questions', this.enrgData).then(function(data){
            console.log(data.data.success);
            console.log(data.data.message);
            if(data.data.success){
                app.loading=false;
                app.successMsg = data.data.message;

            }else{
                app.loading=false;
                app.errorMsg = data.data.message;
            }

        });
    }
});