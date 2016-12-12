(function () {

    angular.module('lyricsShareApp', ['ngRoute']); //ngRouter: se agrega la dependencia del modulo router

    function config ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'home/home.view.html',
                controller: 'homeCtrl',
                controllerAs: 'vm'
            })
            .otherwise({redirectTo: '/'});
    };

    angular
        .module('lyricsShareApp')
        .config(['$routeProvider', config]);

})();