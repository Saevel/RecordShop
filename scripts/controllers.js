var controllers = angular.module('Controllers', ['Services']);

function isCorrect($scope) {
    return ($scope.errors["name"] == null && $scope.errors["surname"] == null && $scope.errors["username"] == null
    && $scope.errors["password"] == null && $scope.errors["contact"] == []);
}

function nullOrEmpty(string) {
    return (string == null || string.trim() == "")
}

//TODO: Actual validation.
function properPhoneNumber(number) {
    return false;
}

//TODO: Actual validation
function properEmail(text) {
    return false;
}

controllers.controller('ContactController', function($scope, InformationService){
    InformationService.getContactInfo(function(data){
        $scope.contactData = data;
    }, function(){
        alert("Error getting contact data");
    });
});

controllers.controller('RegistrationController', function($scope, LoginService){

    $scope.errors = [];

    $scope.login = "";
    $scope.password = "";

    $scope.personalData = new Object();
    $scope.personalData.name = "";
    $scope.personalData.surname = "";

    $scope.contactData = new Object();
    $scope.contactData.phoneNumber = "";
    $scope.contactData.email = "";
    $scope.contactData.address = "";

    //TODO: Actual behavior!
    $scope.onSubmit = function() {

        if(nullOrEmpty($scope.username)) {
            $scope.errors["username"] = "Empty username";
        }
        else {
            $scope.errors["username"] = null;
        }

        if(nullOrEmpty($scope.password)) {
            $scope.errors["password"] = "Empty password";
        }
        else {
            $scope.errors["password"] = null;
        }

        if(nullOrEmpty($scope.personalData.name)) {
            $scope.errors["name"] = "Empty name";
        }
        else {
            $scope.errors["name"] = null;
        }

        if(nullOrEmpty($scope.personalData.surname)) {
            $scope.errors["surname"] = "Empty surname";
        }
        else {
            $scope.errors["surname"] = null;
        }

        if(nullOrEmpty($scope.contactData.phoneNumber) && nullOrEmpty($scope.contactData.email) &&
            nullOrEmpty($scope.contactData.address)) {
            $scope.errors["contact"] = "No contact data provided";
        }
        else if (!nullOrEmpty($scope.contactData.email) && !properEmail($scope.contactData.email)) {
            $scope.errors["contact"].push("Incorrect Email");
        }
        else if(!nullOrEmpty($scope.contactData.phoneNumber) && !properPhoneNumber($scope.contactData.phoneNumber)) {
            $scope.errors["contact"].push("Incorrect phone number");
        }
        else {
            $scope.errors["contact"] = [];
        }

        if(isCorrect($scope)) {
            LoginService.register({
                username: $scope.username,
                password: $scope.password,
                contactData: $scope.contactData,
                personalData: $scope.personalData
            }, function(data){
                $scope.loginData = data;
            }, function(){
                alert("Error while registering");
            });

            $scope.errors = [];
        }
    };
});

controllers.controller('RulesController', function($scope, InformationService) {
    InformationService.getRules(function(data){
        $scope.text = data;
    }, function(){
        alert("Error fetching rules");
    });
});

controllers.controller('CategoriesController', function($scope, CategoriesService){
    CategoriesService.findAll(function(data){
        $scope.categories = data;
    }, function(){
        alert("Error fetching categories");
    });
});

controllers.controller('MainController', function($scope, ItemsService){
    ItemsService.findAll(function(data){
        $scope.items = data;
    }, function(){
        alert("Error fetching items");
    });

    $scope.activeState = function(index){
        if(index == 0){
            return "active";
        }
        else {
            return "";
        }
    };
});

controllers.controller('ItemController', function($scope, $routeParams, ItemsService, CartService){
    var id = parseInt($routeParams.id);
    ItemsService.findById(id, function(data){
        $scope.item = data;
    }, function(){
        alert("Error fetching item");
    });

    $scope.addToCart = function(){
        CartService.lockItems($scope.item.id, 1, function(){
            ItemsService.findById(id, function(data){
                $scope.item = data;
            }, function(){
                alert("Error fetching item");
            });
        }, function(){alert("Error adding to cart");});
    };
});

controllers.controller('CategoryController', function($scope, $routeParams, ItemsService){
   $scope.category = $routeParams.name

    ItemsService.findByCategory($scope.category, function(data){
       $scope.items = data;
   }, function(){
        alert("Error fetching items by category");
    });
});

controllers.controller('CartController', function($scope, CartService, ItemsService){

    var controller = this;

    $scope.items = CartService.getCart();

    $scope.totalPrice = function(){
        var items = $scope.items;
        var price = 0;
        for(var i = 0; i < items.length; i++) {
            price += items[i].price;
        }
        return price;
    };

    $scope.removeFromCart = function(removedItem) {
        CartService.unlockItems(removedItem.id, removedItem.count, function(){
            $scope.items = CartService.getCart();
        }, function(){
            alert("Error removing item from the cart");
        });
    }
});