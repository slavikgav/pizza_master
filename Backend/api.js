/**
 * Created by chaika on 09.02.16.
 */
var Pizza_List = require('./data/Pizza_List');
var Keys = require('./data/Keys');
exports.getPizzaList = function(req, res) {
    res.send(Pizza_List);
};

var crypto = require('crypto');

function sha1(string)	{
    var sha1 = crypto.createHash('sha1');
    sha1.update(string);
    return sha1.digest('base64');
}

function base64(str)	 {
    return new	Buffer(str).toString('base64');
}

exports.createOrder = function(req, res) {
    var order_info = req.body;
    console.log("order_info",order_info);
    var cart = JSON.parse(decodeURI(order_info.cart));

    console.log('cart', cart)
    //console.log("order lel " + order_info.name);
var kek= cart.map(function (item) {
    var sizeLbl = item.size == 'small_size' ? 'Мала' : 'Велика'
    return "["+item.quantity+"шт ]" + "["+sizeLbl+"]" + "" + "["+item.pizza.title+"]"
});
    var order =	{
        version: 3,
        public_key:	Keys.LIQPAY_PUBLIC_KEY,
        action:	"pay",
        amount:	cart.map(function(x) { return x.pizza[x.size].price*x.quantity }).reduce(function(a, b) { return a + b }),
        currency: "UAH",
       description:
            "Замовлення піци:" +order_info.username+
			  "Телефон: "+ order_info.usernumber+
			"Адреса доставки:"+ order_info.useraddress+
			"Замовлення:"+kek,
        order_id: Math.random(),
        //!!!Важливо щоб було 1,	бо інакше візьме гроші!!!
        sandbox: 1

    };

    console.log("Creating Order", order);

    var data = base64(JSON.stringify(order))
    var signature = sha1(Keys.LIQPAY_PRIVATE_KEY + data + Keys.LIQPAY_PRIVATE_KEY)

    res.send({
        success: true,
        data: data,
        signature: signature
    });
};