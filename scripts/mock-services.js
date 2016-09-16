var items = [
    {
        id: 0,
        name: 'Pink Floyd - Dark Side of the Moon',
        description: 'Progressive rock masterpiece by Pink Floyd',
        img: 'img/Dark_Side_of_the_Moon.png',
        count: 10,
        price: 40,
        categories: ['rock', 'progressive']
    },
    {
        id: 1,
        name: 'Black Sabbath - Paranoid',
        description: 'Groundbreaking album for hard rock/heavy metal music',
        img: 'img/Paranoid.jpg',
        count: 7,
        price: 23,
        categories: ['rock', 'metal']
    },
    {
        id: 2,
        name: 'Iron Maiden - The Number of The Beast',
        description: 'A first entry in the rich history of the New Wave of British Heavy Metal',
        img: 'img/The_Number_Of_The_Beast.jpg',
        count: 14,
        price: 34,
        categories: ['rock', 'metal']
    },
    {
        id: 3,
        name: 'Michael Jackson - Thriller',
        description: 'Classic pop album for the 1980s',
        img: 'img/Thriller.png',
        count: 3,
        price: 41,
        categories: ['pop']
    }
];

var services = angular.module('Services', []);

function contains(array, value) {
    for(var i = 0; i < array.length; i++) {
        if(value == array[i]) {
            return true;
        }
    }
    return false;
}

function ItemsService(){

    var service = this;

    service.findById = function(id, onSuccess, onError) {
        for(var i = 0; i < items.length; i++) {
            if(items[i].id == id) {
                onSuccess(Object.create(items[i]));
                return;
            }
        }
        onError();
    };

    service.findByCategory = function(category, onSuccess, onError) {
        var results = [];
        var item = new Object();
        for(var i = 0; i < items.length; i++) {
            item = items[i];
            for(var j = 0; j < item.categories.length; j++) {
                if(item.categories[j] == category) {
                    results.push(Object.create(item));
                }
            }
        }
        onSuccess(results);
    };

    service.findAll = function(onSuccess, onError) {
        onSuccess(Object.create(items));
    };


}

services.service('ItemsService', ItemsService);

function CategoriesService(){

    var service = this;

    service.findAll = function(onSuccess, onError) {
        var categories = [];
        var item = new Object();
        var category = new Object();
        for(var i = 0; i < items.length; i++) {
            item = items[i];
            for (var j = 0; j < item.categories.length; j++) {
                category = item.categories[j];
                if (!contains(categories, category)) {
                    categories.push(category);
                }
            }
        }
        onSuccess(categories);
    };
}

services.service('CategoriesService', CategoriesService);

function InformationService(){

    var service = this;

    service.getRules = function(onSuccess, onError) {
        onSuccess("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut libero iaculis, blandit tortor eu," +
            " sagittis massa. Aliquam ac nunc sed nibh auctor tempor. Fusce varius pretium orci, ac finibus metus. Pellentesque" +
            " non erat augue. Cras imperdiet tincidunt dolor a auctor. Mauris congue consequat diam, in commodo diam volutpat" +
            " ut. Nam quis rhoncus augue, nec cursus tellus. Nunc dapibus, mauris vitae tincidunt mollis, risus nisi fringilla" +
            " dui, gravida tincidunt lectus dolor in turpis. Mauris non dapibus ipsum. Suspendisse leo urna, varius sit amet" +
            " elementum quis, suscipit nec enim. In commodo ornare diam, in porta sapien tristique non. Phasellus cursus neque" +
            " in urna viverra efficitur consectetur nec urna. Curabitur id nulla aliquet, aliquam libero eget, scelerisque est." +
            " Nam sed laoreet lorem.");
    };

    service.getContactInfo = function(onSuccess, onError) {
        onSuccess({
            name: 'Record Shop Inc.',
            address: '21, Zagloby Street, 92-432 Lodz, Poland',
            phoneNumber: '+48 605 315 345',
            email: 'kamil@dim.pl'
        });
    };
}

services.service('InformationService', InformationService);

function LoginService(){

    var service = this;

    service.logIn = function(username, password, onSuccess, onError) {
        if(service.isLoggedIn()) {
            onSuccess();
        }
        else {
            var registrations = window.localStorage.getItem("registrations")
            var  registration = new Object();
            for(var i = 0; i < registrations; i++) {
                registration = registations[i];
                if(registration.username == username && restiration.password == password) {
                    window.localStorage.setItem("login", registration);
                    onSuccess();
                    return;
                }
            }

            onError();
        }
    };

    service.logOut = function(onSuccess, onError){
        window.localStorage.removeItem("login");
        onSuccess();
    }

    service.isLoggedIn = function(onSuccess, onError){
        if(window.localStorage.getItem("login") != null){
            onSuccess();
        }
        else{
            onError();
        }
    }

    service.register = function(registration, onSuccess, onError){
        var registrations = window.localStorage.getItem("registrations");
        registrations.push(registration);
        window.localStorage.setItem("registrations", registrations);
        service.logIn(registration.username, registration.password, onSuccess, onError);
    }
}

services.service('LoginService', LoginService);

function CartService(ItemsService){

    var service = this;

    service.getCart = function(){
        return JSON.parse(sessionStorage.getItem("cart"));
    };

    service.setCart = function(cart){
        sessionStorage.setItem("cart", JSON.stringify(cart));
    };

    service.lockItems = function(id, count, onSuccess, onError) {
        var item = new Object();
        for(var i = 0; i < items.length; i++) {
            item = items[i];
            if(item.id == id && item.count >= count) {
                item.count -= count;
                items[i] = item;

                var data = {
                    id: item.id,
                    name: item.name,
                    description: item.description,
                    img: item.img,
                    count: count,
                    price: item.price,
                    categories: item.categories
                };

                var cart = service.getCart();
                cart.push(data);
                service.setCart(cart);

                onSuccess();
                return;
            }
        }
        onError();
    };

    service.unlockItems = function(id, count, onSuccess, onError) {
        var item = new Object();
        for(var i = 0; i < items.length; i++) {
            item = items[i];
            if(item.id == id) {
                item.count += count;
                var cart = service.getCart();
                var cartItem = new Object();
                for(var j = 0; j < cart.length; j++) {
                    cartItem = cart[j];
                    if(cartItem.id == id && cartItem.count == count) {
                        if(cart.length == 1) {
                            cart = [];
                        }
                        else {
                            cart.splice(j,1);
                        }
                        service.setCart(cart);
                        onSuccess();
                        return;
                    }
                }
            }
        }
        onError();
    };
}

services.service('CartService', CartService);