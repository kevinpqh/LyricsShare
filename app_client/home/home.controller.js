(function () {
    angular 
        .module('lyricsShareApp')
        .controller('homeCtrl', homeCtrl);
        
    homeCtrl.$inject = ['$scope', 'lyricsShareData'];
    function homeCtrl ($scope, lyricsShareData) {
        var vm = this;
        vm.pageHeader = {
            title: 'Loc8r',
            strapline: 'Find places to work with wifi near you!'
        };
        vm.sidebar = {
            content: "Looking for wifi and a seat etc etc"
        };

        vm.message = "Checking your location";
        
        vm.message = "Searching for nearby places";
        
        lyricsShareData.listPublishById()
            .success(function(data) {
                vm.message = data.length > 0 ? "" : "No publish found nearby";
                vm.data = { publish: data };
            })
            .error(function (e) {
                vm.message = "Sorry, something's gone wrong";
            });

    };

})();