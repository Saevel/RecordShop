
var services = angular.module('Services', []);

function contains(array, value) {
    for(var i = 0; i < array.length; i++) {
        if(value == array[i]) {
            return true;
        }
    }
    return false;
}

function getJson($http, url, onSuccess, onError){
    $http
        .get(url)
        .success(function(data){JSON.parse(onSuccess(data));})
        .error(onError);
}

function ItemsService($http){

    var service = this;

    service.findById = function(id, onSuccess, onError) {
        getJson($http, "/items/" + id, onSuccess, onError);
    };

    service.findByCategory = function(category, onSuccess, onError) {
        getJson($http, "/items?category=" + category, onSuccess, onError);
    };

    service.findAll = function(onSuccess, onError) {
        getJson($http, "/items", onSuccess, onError);
    };
}

services.service('ItemsService', ItemsService);

function CategoriesService($http){

    var service = this;

    service.findAll = function(onSuccess, onError) {
        getJson($http, "/categories", onSuccess, onError);
    };
}

services.service('CategoriesService', CategoriesService);

function InformationService($http){

    var service = this;

    service.getRules = function(onSuccess, onError) {
        getJson($http, "/information/rules", onSuccess, onError);
    };

    service.getContactInfo = function(onSuccess, onError) {
        getJson($http, "/information/contact", onSuccess, onError);
    };
}

services.service('InformationService', InformationService);

function LoginService($http){

    var service = this;

    service.logIn = function(username, password, onSuccess, onError) {
        $http
            .post("/login", {'username': username, 'password': password})
            .success(function(data){
                var result = JSON.parse(data);
                sessionStorage.setItem("login", result);
                onSuccess(result);
            })
            .error(onError);
    };

    service.logOut = function(username, onSuccess, onError){
        $http
            .delete("/login/" + username)
            .success(function(){
                sessionStorage.removeItem("login");
                onSuccess();
            })
            .error(onError);
    };

    service.isLoggedIn = function(onSuccess, onError){
        if(window.localStorage.getItem("login") != null){
            onSuccess();
        }
        else{
            onError();
        }
    };

    service.register = function(registration, onSuccess, onError){
        $http
            .post("/registrations", registration)
            .success(onSuccess)
            .error(onError);
    }
}

services.service('LoginService', LoginService);

function CartService($http) {

    var service = this;

    service.getCart = function(){
        return JSON.parse(sessionStorage.getItem("cart"));
    };

    service.setCart = function(cart){
        sessionStorage.setItem("cart", JSON.stringify(cart));
    };

    service.lockItems = function(id, count, onSuccess, onError) {
        $http
            .post("/items/lock", {'id': id, 'count': count})
            .success(function(data){
                var cart = service.getCart();
                cart.push(JSON.parse(data));
                service.setCart(cart);

                onSuccess();
                return;
            })
            .error(onError);
    };

    service.unlockItems = function(id, count, onSuccess, onError) {
        var item = new Object();
        $http
            .delete("/items/lock", {'id': id, 'count': count})
            .success(function(){
                var cart = service.getCart();
                var cartItem = new Object();
                for(var j = 0; j < cart.length; j++) {
                    cartItem = cart[j];

                    if(cartItem.id == id && cartItem.count == count) {
                        if(cart.length == 1) {cart = [];}
                        else {cart.splice(j,1);}
                        service.setCart(cart);

                        onSuccess();
                        return;
                    }
                }
            })
            .error(onError);
    };
}

services.service('CartService', CartService);