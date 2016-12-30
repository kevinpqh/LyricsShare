(function () {

    angular
        .module('lyricsShareApp')
        .controller('loginCtrl', loginCtrl);

    loginCtrl.$inject = ['$scope','$location','authentication'];
    function loginCtrl($scope,$location, authentication) {
        var vm = this;

        vm.pageHeader = {
            title: 'Sign in to Loc8r'
        };
        
        vm.credentials = {
            email : "",
            password : ""
        };
        
        vm.returnPage = $location.search().page || '/';

        vm.onSubmit = function () {
            vm.formError = "";
            if (!vm.credentials.email || !vm.credentials.password) {
                vm.formError = "All fields required, please try again";
                return false;
            } else {
                vm.doLogin();
            }
        };

        vm.doLogin = function() {
            vm.formError = "";
            authentication
                .login(vm.credentials)
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