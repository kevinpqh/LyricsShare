(function () {
    angular
        .module('lyricsShareApp')
        .controller('registroCtrl', registroCtrl);

    registroCtrl.$inject = ['$location','authentication'];
    function registroCtrl($location, authentication) {
        var vm = this;

        vm.pageHeader = {
            title: 'Create a new Loc8r account'
        };

        vm.credentials = {
            user_name : "",
            email : "",
            password : ""
        };
        
        vm.returnPage = $location.search().page || '/';

        vm.onSubmit = function () {
            vm.formError = "";
            if (!vm.credentials.user_name || !vm.credentials.email || !vm.credentials.password) {
                vm.formError = "All fields required, please try again";
                return false;
            } else {
                vm.doRegister();
            }
        };

        vm.doRegister = function() {
            vm.formError = "";
            authentication
                .register(vm.credentials)
                .error(function(err){
                    vm.formError = err;
                })
                .then(function(){
                    $location.search('page', null);
                    $location.path(vm.returnPage);
                });
        };

        vm.facebook = {
                user_name: "",
                email: "",
                password: "",
                image: ""
            };

        vm.doLoginFB = function(){
            var a,b,c,d;

            FB.login(function(response){
                    if(response.authResponse){
                FB.api('/me','GET',{fields: 'email, first_name,name,id,picture'},function(response){
                    $scope.$apply(function(){
                        
                        a = response.name;
                        b = response.email;
                        c= response.id;
                        d= response.picture.data.url;

                        vm.credentials = {
            user_name : a,
            email : b,
            password : c,
            image : d,
        };

        //console.log();
        authentication
                   .fbLogin(vm.credentials)
                   .error(function(err){
                    vm.formError = err;
                })
                .then(function(){
                    $location.search('page', null);
                    $location.path(vm.returnPage);
                });

                        
                      
                    });
                });
            } else {
                //errr
            }
            },{
                scope: 'email, user_likes',
                return_scopes: true
            });
    
            
        
    

        };

    }
    
})();