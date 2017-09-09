$(document).ready(function() {
    var MAIL_CHIMP_PROXY_URL = 'https://mail-chimp.herokuapp.com/subscribe';

    $('#subEmailButton').click(function() {

        var email = $('#subEmail').val();
        var data = {
            email: email
        }

        $.ajax
        ({
            type: "POST",
            url: MAIL_CHIMP_PROXY_URL,
            dataType: 'json',
            async: false,
            data: data,
            // error: function (jqXHR, status, err) {
            //     alert(err);
            // },
            // success: function() {
            //     alert('Thank you! Please check your email to confirm your subscription.');
            // },
            // complete: function (jqXHR, status) {
            //     console.log(status);
            // }
            complete: function (jqXHR, status) {
                alert('Thank you! Please check your email to confirm your subscription.');
            }
        });
    });
});
