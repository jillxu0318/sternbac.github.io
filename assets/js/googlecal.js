$(document).ready(function() {
    var GOOGLE_CAL_URL = 'https://www.googleapis.com/calendar/v3/calendars/';
    var API_KEY = 'AIzaSyABek6rqw9ZTqA9vZLJ84YTA1YG0cgDMWE';
    var CALENDAR_ID = 'analytic@stern.nyu.edu';

    var params = { 
        timeMin: (new Date()).toISOString(),
        showDeleted: false,
        singleEvents: true,
        maxResults: 3,
        orderBy: 'startTime',
        key: API_KEY
    };

    $.get(GOOGLE_CAL_URL + CALENDAR_ID + '/events?' + $.param(params), function(data) {
        for (var i = 1; i <= 3; i++) {
            $("#eventTitle" + i).text(data.items[i - 1].summary);
            $("#eventDetails" + i).text(data.items[i - 1].description);
        }
    });
});