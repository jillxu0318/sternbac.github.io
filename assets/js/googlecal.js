$(document).ready(function() {
    var GOOGLE_CAL_URL = 'https://www.googleapis.com/calendar/v3/calendars/';
    var API_KEY = 'AIzaSyCWLHoex4mBTrqBtRN9T9p6o9jK0n50noI';
    var CALENDAR_ID = 'ehjp2rfjn42fanc8t7ep27llts@group.calendar.google.com';
    $.get(GOOGLE_CAL_URL + CALENDAR_ID + '/events?key=' + API_KEY, function(data) {
        for (var i = 1; i <= 3; i++) {
            $("#eventTitle" + i).text(data.items[i - 1].summary);
            $("#eventDetails" + i).text(data.items[i - 1].description);
        }
    });
});