$(document).ready(function() {
    var GOOGLE_CAL_URL = 'https://www.googleapis.com/calendar/v3/calendars/';
    var API_KEY = 'AIzaSyABek6rqw9ZTqA9vZLJ84YTA1YG0cgDMWE';
    var CALENDAR_ID = 'analytic@stern.nyu.edu';

    var params = { 
        timeMin: (new Date()).toISOString(),
        showDeleted: false,
        singleEvents: true,
        orderBy: 'startTime',
        key: API_KEY
    };

    // https://www.googleapis.com/calendar/v3/calendars/analytic@stern.nyu.edu/events?key=AIzaSyABek6rqw9ZTqA9vZLJ84YTA1YG0cgDMWE

    // if loading page is index.html
    if (top.location.pathname.indexOf('index.html') !== -1) {
        populate_homepage(3);
    } else if (top.location.pathname.indexOf('calendar.html') !== -1) { 
        // if loading page is calendar.html
        populate_calendar_page();

    }

    function populate_homepage(count) {
        params.maxResults = count;
        $.get(GOOGLE_CAL_URL + CALENDAR_ID + '/events?' + $.param(params), function(data) {
            for (var i = 1; i <= 3; i++) {
                $("#eventTitle" + i).text(data.items[i - 1].summary);
                $("#eventDetails" + i).text(data.items[i - 1].description);
            }
        });           
    }

    function populate_calendar_page() {
        $.get(GOOGLE_CAL_URL + CALENDAR_ID + '/events?' + $.param(params), function(data) {
            console.log(data);
            $ul = $("#club_events");
            $.each(data.items, function(index, value) {
                var link = value.htmlLink;
                var name = value.summary;
                var li = $("<li></li>");
                var a = $("<a></a>").attr("href", link).text(name);

                $ul.append(li.append(a));
            });
        });           
    }
});