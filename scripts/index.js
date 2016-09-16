var mainModule = angular.module('MainModule', ['ngRoute', 'Controllers']);

sessionStorage.setItem("cart", JSON.stringify(new Array()));

mainModule.config(function($routeProvider){

    //TODO: Route patterns for browsing items and categories one-by-one
    //TODO: Routes for payment etc.

    $routeProvider
        .when("/",{
            templateUrl: 'views/main.html',
            controller: 'MainController'
        })
        .when("/main#carousel", {
            templateUrl: 'views/main.html'
        })
        .when("/main", {
            templateUrl: 'views/main.html',
            controller: 'MainController'
        })
        .when("/rules", {
            templateUrl: 'views/rules.html',
            controller: 'RulesController'
        })
        .when("/contact", {
            templateUrl: 'views/contact.html',
            controller: 'ContactController'
        })
        .when("/categories", {
            templateUrl: 'views/categories.html',
            controller: 'CategoriesController'
        })
        .when("/categories/:name", {
            templateUrl: 'views/category.html',
            controller: 'CategoryController'
        })
        .when("/items/:id", {
            templateUrl: 'views/item.html',
            controller: 'ItemController'
        })
        .when("/cart", {
            templateUrl: 'views/cart.html',
            controller: 'CartController'
        })
        .when("/payment", {
            templateUrl: 'views/payment.html'
            //TODO: Payment controller
        })
        .when("/registration", {
            templateUrl: 'views/registration.html',
            controller: 'RegistrationController'
        })
        .otherwise({
            templateUrl: 'views/page_not_found.html'
        });
});