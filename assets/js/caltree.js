var fallTree = [
    {
        text: "Fall 2017",
        state: {
            expanded: false
        },
        nodes: [
            {
                text: "September"
            },
            {
                text: "October"
            },
            {
                text: "November"
            },
            {
                text: "December"
            }
        ]
    }
];

var springTree = [
    {
        text: "Spring 2018",
        state: {
            expanded: false
        },
        nodes: [
            {
                text: "February",
            },
            {
                text: "March"
            },
            {
                text: "April"
            },
            {
                text: "May"
            }
        ]
    }
];

$(document).ready(function() {
    var GOOGLE_CAL_URL = 'https://www.googleapis.com/calendar/v3/calendars/';
    var API_KEY = 'AIzaSyABek6rqw9ZTqA9vZLJ84YTA1YG0cgDMWE';
    var CALENDAR_ID = 'analytic@stern.nyu.edu';

    var TIME_FORMAT = {
        hour: '2-digit',
        minute:'2-digit'
    };

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

    function create_datetime_location(event) {
        var start = event.start;
        var result = "";
        if (start.dateTime) {
            var dateTime = new Date(start.dateTime);
            result = dateTime.toLocaleDateString("en-US") + "  " + dateTime.toLocaleTimeString("en-US", TIME_FORMAT);
        } else if (start.date) {
            result = new Date(start.date).toLocaleDateString("en-US");
        }

        var end = event.end;
        if (end.dateTime) {
            var dateTime = new Date(end.dateTime);
            result +=" - " + dateTime.toLocaleTimeString("en-US", TIME_FORMAT);
        }

        var loc = event.location;
        if (loc) {
            result += "\nLocation: " + loc;
        }

        return result;
    }

    function populate_homepage(count) {

        params.maxResults = count;
        $.get(GOOGLE_CAL_URL + CALENDAR_ID + '/events?' + $.param(params), function(data) {
            for (var i = 1; i <= 3; i++) {
                var event = data.items[i - 1];
                $("#eventTitle" + i).text(event.summary);
                var eventDetails = $("#eventDetails" + i);
                eventDetails.text(create_datetime_location(event));
                convert_newline(eventDetails);
            }
        });
    }

    function populate_calendar_page() {

        // show the treeview template first
        draw_treeview();

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

                    populate_treeview(key, item);

                    var h3 = $("<h3></h3>");
                    h3.text(item.summary);

                    var datetime_loc = $("<p></p>");
                    datetime_loc.text(create_datetime_location(item));

                    var desc = $("<p></p>");
                    desc.text(item.description)
                    div.append(h3).append(convert_newline(datetime_loc)).append(desc);
                });

                div.hide();

                $(".inner").append(div);

                // redraw with events
                draw_treeview();

                $('#fall-tree').on('nodeSelected', function(event, data) {
                    show_event_details($(".inner"), data.data);
                });

                $('#spring-tree').on('nodeSelected', function(event, data) {
                    show_event_details($(".inner"), data.data); 
                });

            });
        });
    }

    function show_event_details(div, event) {
        var h3 = $("<h3></h3>");
        h3.text(event.summary);

        var datetime_loc = $("<p></p>");
        datetime_loc.text(create_datetime_location(event));

        var desc = $("<p></p>");
        desc.text(event.description)
        div.empty();
        div.append(h3).append(convert_newline(datetime_loc)).append(desc);
    }

    function draw_treeview() {

        $('#fall-tree').treeview({
            data: fallTree
        });

        $('#spring-tree').treeview({
            data: springTree
        });
    }
    function populate_treeview(month, event) {
        var index = 0;
        var monthNode = fallTree[0].nodes[index];

        if (month >= 8 && month <= 11) { // belongs to fall tree
            index = month - 8;
            monthNode = fallTree[0].nodes[index];
        }

        if (month >= 1 && month <= 4) { // belongs to spring tree
            index = month - 1;
            monthNode = springTree[0].nodes[index];
        }     

        monthNode.nodes = monthNode.nodes || [];

        var eventNode = {
            text: event.summary,
            data: event
        };

        monthNode.nodes.push(eventNode);       
    }

    function convert_newline(item) {
        return item.html(item.html().replace(/\n/g,'<br/>'));
    }

    function hide_all_month_panels() {
        $(".monthPanel").hide();
    }

    function get_month_name(monthNumber) {
      var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
      return months[monthNumber];
    }
});