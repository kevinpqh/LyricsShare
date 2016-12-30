(function () {

    angular
        .module('lyricsShareApp')
        .controller('publishCreateCtrl', publishCreateCtrl);
    
    publishCreateCtrl.$inject = ['$location','publishCreate','authentication'];
    function publishCreateCtrl ($location,publishCreate,authentication) {
       var vm = this;

        vm.pageHeader = {
            title: 'Create a new Publish'
        };

        vm.body = {
            user_name : authentication.currentUser().name,
            titulo : "",
            genres : "",
            autor : "",
            album : "",
            track : "",
            lyrics : ""
        };
        
        vm.returnPage = '/';

        vm.onSubmit = function () {
            vm.formError = "";
            if (!vm.body.user_name || !vm.body.titulo || !vm.body.lyrics || !vm.body.track) {
                vm.formError = "All fields required, please try again";
                return false;
            } else {
                vm.doCreate(vm.body);
            }
        };

        vm.doCreate = function(body) {
            vm.formError = "";
            publishCreate
                .create(body)
                .then(function(){
                    $location.path(vm.returnPage);
                });
        };

    }

})();