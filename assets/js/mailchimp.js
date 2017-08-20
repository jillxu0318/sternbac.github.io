$(document).ready(function() {
    var MAIL_CHIMP_URL = 'https://us9.api.mailchimp.com/2.0/lists/subscribe.json';
    var APIKEY = 'd4f45a0243283ba544e52482cde26eed-us9';
    var LIST_ID = 'c842a239db';

    $('#subEmailButton').click(function() {
        var data = {
            "apikey": APIKEY,
            "id": LIST_ID,
            "email": {
                "email": "jillxu10@gmail.com"
            },
            "send_welcome": true
        }

        $.ajax
        ({
            type: "POST",
            url: MAIL_CHIMP_URL,
            dataType: 'json',
            async: false,
            data: data,
            success: function (){
                alert('Thanks for your comment!');
            }
        });
    });
});
