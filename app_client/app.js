(function () {

    angular.module('lyricsShareApp', ['ngRoute']); //ngRouter: se agrega la dependencia del modulo router

    function config ($routeProvider,$locationProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'home/home.view.html',
                controller: 'homeCtrl',
                controllerAs: 'vm'
            })
            .when('/detalle/:publishid', {
                templateUrl: '/publishDetail/publishDetail.view.html',
                controller: 'publishDetailCtrl',
                controllerAs: 'vm'
            })
            .when('/registro', {
                templateUrl: '/auth/register/register.view.html',
                controller: 'registroCtrl',
                controllerAs: 'vm'
            })
            .when('/login', {
                templateUrl: '/auth/login/login.view.html',
                controller: 'loginCtrl',
                controllerAs: 'vm'
            })
             .when('/crear', {
                templateUrl: '/publishCreate/publishCreate.view.html',
                controller: 'publishCreateCtrl',
                controllerAs: 'vm'
            })
            .otherwise({redirectTo: '/'});
        $locationProvider.html5Mode(true);//ENCENDEMOS CARACTERISTICAS DE HTML5
    
    };

    angular
        .module('lyricsShareApp')
        .config(['$routeProvider','$locationProvider', config]);

})();