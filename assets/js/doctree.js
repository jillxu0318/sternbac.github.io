var docTree = [
    {
        text: "Spring 2017",
        state: {
            expanded: true
        },
        nodes: [
            {
                text: "Gerrymandering",
                href: "https://drive.google.com/open?id=0ByJYMvzdQFKAa1pfTnN5RGw1R1dtTURPaEFQZ2ROQ0gyZDZJ"
            },
            {
                text: "NBA Analytics",
                href: "https://drive.google.com/open?id=0ByJYMvzdQFKAQmp0X3Jqb1hHeUR4RGJaaFh5ZHZFQmpiU04w"
            },
            {
                text: "Lending Club",
                href: "https://drive.google.com/open?id=0ByJYMvzdQFKAVmIyazlteDNZeEU"
            }
        ]
    }
];

$(document).ready(function() {
    var theTree = $('#doc-tree');

    theTree.treeview({
        data: docTree
    });

    theTree.on('nodeSelected', function(event, data) {
      // Selected
      if (data.nodeId == 0) {
        $(this).treeview('expandAll', { silent: true });
      } else {
        window.open(data.href);
      }
    });
});
