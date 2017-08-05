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
            //console.log(data);
            $ul = $("#club_events");
            var months = {};
            $.each(data.items, function(index, value) {
                if (value.start && (value.start.dateTime || value.start.date)){
                    var date = value.start.dateTime ? value.start.dateTime : value.start.date;
                    var month = new Date(date).getMonth();
                    if (months[month] == undefined) {
                        months[month] = [];
                    }

                    months[month].push(value);
                }
            });

            $.each(months, function(key, value) {
                var li = $("<li></li>");
                var a = $("<a></a>").attr("href", "#").text(get_month_name(key)+ " event(s)");
                a.attr("month", key);

                // register event for the dropdown menu iterm
                a.click(function() {
                    hide_all_month_panels();
                    $("#month_" + a.attr("month")).show();
                });

                $ul.append(li.append(a));

                var div = $("<div></div>");
                div.attr("id", "month_" + key);
                div.addClass("monthPanel");

                $.each(value, function(index, item) {
                    var h3 = $("<h3></h3>");
                    h3.text(item.summary);
                    var p = $("<p></p>");
                    p.text(item.description)
                    div.append(h3).append(p);
                });

                div.hide();

                $(".inner").append(div);
            });
        });
    }

    function hide_all_month_panels() {
        $(".monthPanel").hide();
    }

    function get_month_name(monthNumber) {
      var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
      return months[monthNumber];
    }
});
