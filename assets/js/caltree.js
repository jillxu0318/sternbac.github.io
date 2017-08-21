var fallTree = [
    {
        text: "Fall 2017",
        state: {
            expanded: false
        },
        nodes: [
            {
                text: "September",
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
    $('#fall-tree').treeview({
        data: fallTree
    });

    $('#spring-tree').treeview({
        data: springTree
    });
});
