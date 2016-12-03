$(document).ready(function () {
    $('#inputName').on('input', function () {
        var input = $(this);
        var div_valid = $(document.getElementsByClassName("name-group"));
        var span_help = $(document.getElementsByClassName("name-help-block"));

        var regex = /^[^0-9]+$/;
        var isName = regex.test(input.val());
        if (isName) {
            div_valid.removeClass("has-error").addClass("has-success");
            span_help.addClass("none");
        }
        else {
            div_valid.removeClass("has-success").addClass("has-error");
            span_help.removeClass("none");
        }
    });

    $('#inputPhone').on('input', function () {
        var input = $(this);
        var div_valid = $(document.getElementsByClassName("phone-group"));
        var span_help = $(document.getElementsByClassName("phone-help-block"));

        var regex1 = /^\+?([0-9]{4})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/;
        var isPhone = regex1.test(input.val());

        var regex2 = /^\0?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/;
        var isPhone2 = regex2.test(input.val());

        if (isPhone || isPhone2) {
            div_valid.removeClass("has-error").addClass("has-success");
            span_help.addClass("none");
        }
        else {
            div_valid.removeClass("has-success").addClass("has-error");
            span_help.removeClass("none");
        }
    });

    $('#inputAdress').on('input',function () {
        var input = $(this);
        var div_valid = $(document.getElementsByClassName("address-group"));
        var span_help = $(document.getElementsByClassName("address-help-block"));

        if(input.length=""){
            div_valid.removeClass("has-success").addClass("has-error");
            span_help.removeClass("none");
        }else {
            div_valid.removeClass("has-error").addClass("has-success");
            span_help.addClass("none");
        }
    });


});


function checkForSubmit() {
    var name = document.getElementById('inputName').value;
    var phone = document.getElementById('inputPhone').value;
    var adress = document.getElementById('inputAdress').value;

    var span_name = document.getElementsByClassName("name-help-block");
    if(name == "")
        span_name.removeClass("none");

    var span_phone = document.getElementsByClassName("phone-help-block");
    if(phone == "")
        span_phone.removeClass("none");

    var span_address = document.getElementsByClassName("address-help-block");
    if(adress == "")
        span_address.removeClass("none");
};




/*

$(document).ready(function () {

    $('#from-reg').validate({
        rules: {
            username: {
                minlength: 2,
                regex: /^[a-zA-Z]+$/,
                required: true
            },
            usernumber: {
                required: true,
                regex:/^\+38[0-9]{10}$/,
                email: true
            },
            useraddress: {
                minlength: 2,
                required: true
            }
        },
        highlight: function (element) {
            $(element).closest('.name-group').removeClass('success').addClass('error');
            $(element).closest('.phone-group').removeClass('success').addClass('error');
            $(element).closest('.address-group').removeClass('success').addClass('error');
        },
        success: function (element) {
            element.text('OK!').addClass('valid')
                .closest('.name-group').removeClass('error').addClass('success');
            element.text('OK!').addClass('valid')
                .closest('.phone-group').removeClass('error').addClass('success');
            element.text('OK!').addClass('valid')
                .closest('.address-group').removeClass('error').addClass('success');
        }
    });

});*/
