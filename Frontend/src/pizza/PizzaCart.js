var API = require('../API');
var Templates = require('../Templates');


//Перелік розмірів піци
var PizzaSize = {
    Big: "big_size",
    Small: "small_size"
};

//Змінна в якій зберігаються перелік піц в кошику
var Cart = [];

//HTML едемент куди будуть додаватися піци
var $cart = $("#order");

function addToCart(pizza, size) {
    //Додавання однієї піци в кошик покупок
    for (var i = 0; i < Cart.length; i++) {
        if (Cart[i].pizza.id== pizza.id && Cart[i].size == size) {
            Cart[i].quantity++;
            updateCart();
            return;
        }
    }

    //Приклад реалізації, можна робити будь-яким іншим способом
    Cart.push({
        pizza: pizza,
        size: size,
        quantity: 1
    });

    if(Cart.length == 1)
        if(!$(".no-orders").hasClass('none')){
            $('.btn-order').removeAttr('disabled');
            $(".no-orders").addClass("none");
            $(".order-header").removeClass("none");
        }
    //Оновити вміст кошика на сторінці
    updateCart();
}

function removeFromCart(cart_item) {
    //Видалити піцу з кошика
    //TODO: треба зробити
    var i;
    for (i = 0; i < Cart.length; i++) {
        if (Cart[i].pizza.id == cart_item.pizza.id&&Cart[i].size == cart_item.size) {
            Cart.splice(i,1);
            n_orders=-1;
            break;
        }
    }
    //Після видалення оновити відображення
    if(Cart.length==0){
        $(".no-orders").removeClass("none");
        $(".order-header").addClass("none");
        $('.btn-order').attr('disabled','disabled');
    }
    updateCart();
}

function initialiseCart() {
    //Фукнція віпрацьвуватиме при завантаженні сторінки
    //Тут можна наприклад, зчитати вміст корзини який збережено в Local Storage то показати його
    //TODO: ...
    Cart = JSON.parse(localStorage.getItem("pizzaCartData"));
   if(Cart==null) Cart=[];
    if(Cart.length==0){
        $(".no-orders").removeClass("none");
        $(".order-header").addClass("none");
        $('.btn-order').attr('disabled','disabled');
    }

    updateCart();
}

function getPizzaInCart() {
    //Повертає піци які зберігаються в кошику
    return Cart;
}

function updateCart() {
    //Функція викликається при зміні вмісту кошика
    //Тут можна наприклад показати оновлений кошик на екрані та зберегти вміт кошика в Local Storage
    localStorage.setItem("pizzaCartData", JSON.stringify(Cart));
    //Очищаємо старі піци в кошику
    $cart.html("");

    //Онволення однієї піци
    function showOnePizzaInCart(cart_item) {
        var html_code = Templates.PizzaCart_OneItem(cart_item);

        var $node = $(html_code);
        self.total+=cart_item.pizza.price;

        $node.find(".plus").click(function(){
            //Збільшуємо кількість замовлених піц
            cart_item.quantity += 1;
            //Оновлюємо відображення
            updateCart();
        });

        $node.find(".minus").click(function(){
            //Збільшуємо кількість замовлених піц
            if(cart_item.quantity < 2){
                removeFromCart(cart_item);
            }else cart_item.quantity -= 1;
            //Оновлюємо відображення
            updateCart();
        });

        $node.find(".count-clear").click(function(){
            //Збільшуємо кількість замовлених піц
                removeFromCart(cart_item);
                return;
            //Оновлюємо відображення
        });

        $(".orders-clear").click(function () {
            //Зменшуємо кількість замовлених піц
            Cart=[];
            removeFromCart();
            //Оновлюємо відображення
            updateCart();
        });

        $cart.append($node);
    }

    Cart.forEach(showOnePizzaInCart);
    $(".orders-count").text('').append(Cart.length);
    $(".sum-total").text("").append(total);

}

var total=function(){
    var t=0;
    for (var i = 0; i < Cart.length; i++) {
        var size=Cart[i]['size'];
        t+=(Cart[i].pizza[size].price*Cart[i].quantity);
    }
    return t;
}

/*document.on("click", ".next-step-button", function () {
    var orederInfo ={
        name:$('#inputName').val(),
        phone:$('#inputPhone').val(),
        address: $('#inputAdress').val(),
        orders: Cart

    }
    API.createOrder(orederInfo,function () {
        console.log("Data sent");
    })
})*/

$("#next-btn").click(function () {
    console.log("ready");
    var orederInfo ={
        name:$('#inputName').val(),
        phone:$('#inputPhone').val(),
        address: $('#inputAdress').val(),
        orders: Cart

    }
    console.log(orederInfo);
   API.createOrder(Cart,function () {
       console.log("Data sent");
   })

});

exports.removeFromCart = removeFromCart;
exports.addToCart = addToCart;

exports.getPizzaInCart = getPizzaInCart;
exports.initialiseCart = initialiseCart;

exports.PizzaSize = PizzaSize;