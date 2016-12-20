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

    }
    
})();