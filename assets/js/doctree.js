var docTree = [
    {
        text: "Spring 2017",
        state: {
            expanded: true
        },
        nodes: [
            {
                text: "BaChallenge_-Gerrymandering.pdf",
                href: "https://drive.google.com/open?id=0ByJYMvzdQFKAa1pfTnN5RGw1R1dtTURPaEFQZ2ROQ0gyZDZJ"
            },
            {
                text: "NBA Analytics Presentation.pdf",
                href: "https://drive.google.com/open?id=0ByJYMvzdQFKAQmp0X3Jqb1hHeUR4RGJaaFh5ZHZFQmpiU04w"
            },
            {
                text: "Lending Club Presentation FINAL.pdf",
                href: "https://drive.google.com/open?id=0ByJYMvzdQFKAVmIyazlteDNZeEU"
            }
        ]
    }
];

$(document).ready(function() {

    $('#doc-tree').treeview({
        data: docTree,
        enableLinks: true
    });
});
