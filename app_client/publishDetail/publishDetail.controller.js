(function () {

    angular
        .module('lyricsShareApp')
        .controller('publishDetailCtrl', publishDetailCtrl);
    
    publishDetailCtrl.$inject = ['$routeParams','lyricsShareData'];
    function publishDetailCtrl ($routeParams,lyricsShareData) {
        var vm = this;
        vm.publishid = $routeParams.publishid;

        //vm.isLoggedIn = authentication.isLoggedIn();
        
        //vm.currentPath = $location.path();

        lyricsShareData.publishById(vm.publishid)
            .success(function(data) {
                vm.data = { publish: data };
                vm.pageHeader = {
                    title: vm.data.publish.song.titulo
                };
            })
            .error(function (e) {
                console.log(e);
            });

        /*vm.popupReviewForm = function () {
            var modalInstance = $modal.open({
                templateUrl: '/reviewModal/reviewModal.view.html',
                controller: 'reviewModalCtrl as vm',
                resolve : {
                    locationData : function () {
                        return {
                            locationid : vm.locationid,
                            locationName : vm.data.location.name
                        };
                    }
                }
            });

            modalInstance.result.then(function (data) {
                vm.data.location.reviews.push(data);
            });
        };*/
        
    }

})();