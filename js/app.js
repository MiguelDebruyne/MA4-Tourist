$('document').ready(init);

var user = null;

function init()
{
    $('#btnSubmit').click(addUser);
    $('#selectLocation').change(addLocationToUser);
    $('#userLocations').click(getUserLocations);

    if($.cookie('user')){
        user = JSON.parse($.cookie('user'));
    }

}


function addUser()
{
    trace('[addUser]');
    var registerForm = $('#registerForm');

    var validator = registerForm.validate(
        {
            errorElement: 'p',
            errorPlacement: function(error, element) {
//                element.next().replaceWith(error);
                trace(error);
                trace(element.next);
            },
            rules: {
                email: {required: true, email:true}
            },
            messages: {
                email: {required: "Het e-mailadres is verplicht", email:"Het formaat is niet correct"}
            },
            onfocusout: function(element){
                $(element).valid();
            },
            onkeyup: false,
            submitHandler: function(form){
                form.submit();
            }
        });


//    $.ajax({
//       type: 'post',
//        url: registerForm.attr('action'),
//        data: registerForm.serialize(),
//        success: function(data)
//        {
//            trace(data);
//            $.cookie('user', data);
//            user = JSON.parse($.cookie('user'));
//        }
//    });

    return false;
}


function addLocationToUser()
{
//    trace('[addLocationToUser]');
    var locationId = $(this).attr('value');
    var url = 'http://localhost/2012-2013/MA4/MA4-Tourist/api/locations/' +user.id+ '/' +locationId+ '/add';

    $.ajax({
       type: 'get',
        url: url,
        success: function(data)
        {
            trace('data: ' + data);
            if(data == 1)
            {

            }
        }
    });

    return false;
}


function getUserLocations()
{
    trace('[getUserLocations');
    var url = 'http://localhost/2012-2013/MA4/MA4-Tourist/api/users/locations/' +user.id;

    $.ajax({
       type: 'get',
        url: url,
        success: function(data)
        {
            trace(data);
            var json = JSON.parse(data);

            $.each(json, function(key, value){
                trace('value: ' +value.location);
            });
        }
    });
}

function trace(data)
{
    console.log(data);
}