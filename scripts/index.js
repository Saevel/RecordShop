var mainModule = angular.module('MainModule', ['ngRoute']);

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
        .when("/basket", {
            templateUrl: 'views/basket.html'
        })
        .when("/registration", {
            templateUrl: 'views/registration.html',
            controller: 'RegistrationController'
        })
        .otherwise({
            templateUrl: 'views/page_not_found.html'
        });
});

//TODO: Separate Controllers module (Main depends on Controllers?)
//TODO: Also a services module! Controllers relate to services.

mainModule.controller('ContactController', function($scope){
    //TODO: Download from backend & cache here

    $scope.name = 'Record Shop Inc.';
    $scope.address = '21, Zagloby Street, 92-432 Lodz, Poland';
    $scope.phoneNumber = '+48 605 315 345';
    $scope.email = 'kamil@dim.pl';
});

mainModule.controller('RegistrationController', function($scope){

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

        //TODO: Actual behavior
        if(nullOrEmpty($scope.personalData.name)) {
           alert("Empty name");
        }
        if(nullOrEmpty($scope.personalData.surname)) {
            alert("Empty surname");
        }
        if(nullOrEmpty($scope.contactData.phoneNumber) && nullOrEmpty($scope.contactData.email) &&
            nullOrEmpty($scope.contactData.address)) {
            alert("No contact data given");
        }
        else {
            if (!nullOrEmpty($scope.contactData.email) && !properEmail($scope.contactData.email)) {
                alert("Incorrect email");
            }
            if(!nullOrEmpty($scope.contactData.phoneNumber) && !properPhoneNumber($scope.contactData.phoneNumber)) {
                alert("Incorrect phone number");
            }
        }

            //TODO: If correct, send to backend via HTTP
    };

    //TODO: Registration validation method
});

mainModule.controller('RulesController', function($scope) {

    //TODO: Get actual text from backend

    $scope.text = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut libero iaculis, blandit tortor eu," +
    " sagittis massa. Aliquam ac nunc sed nibh auctor tempor. Fusce varius pretium orci, ac finibus metus. Pellentesque" +
    " non erat augue. Cras imperdiet tincidunt dolor a auctor. Mauris congue consequat diam, in commodo diam volutpat" +
    " ut. Nam quis rhoncus augue, nec cursus tellus. Nunc dapibus, mauris vitae tincidunt mollis, risus nisi fringilla" +
    " dui, gravida tincidunt lectus dolor in turpis. Mauris non dapibus ipsum. Suspendisse leo urna, varius sit amet" +
    " elementum quis, suscipit nec enim. In commodo ornare diam, in porta sapien tristique non. Phasellus cursus neque" +
    " in urna viverra efficitur consectetur nec urna. Curabitur id nulla aliquet, aliquam libero eget, scelerisque est." +
    " Nam sed laoreet lorem."
});

mainModule.controller('CategoriesController', function($scope){
    //TODO: Get actual categories from backend

    $scope.categories = [
        {name: 'Rock'},
        {name: 'Pop'},
        {name: 'Metal'},
        {name: 'Techno'}
    ];
});

mainModule.controller('MainController', function($scope){

    //TODO: Get actual random products from backend
    $scope.items = [
        {name: 'Storm', src: 'sample/storm.jpg', id: 0},
        {name: 'Volcano', src: 'sample/volcano.jpg', id: 1},
        {name: 'Storm', src: 'sample/waterfalls.jpg', id: 2}
    ];

    $scope.activeState = function(index){
        if(index == 0){
            return "active";
        }
        else {
            return "";
        }
    };
});

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