var bookings = (function() {
    "use strict";

    var pub = {};

    function displayBookings(data) {
        var table = $("#bookings")[0];
        var bookings = data.bookings.booking;
        var keys = Object.keys(bookings[0]);
        console.log(bookings);
        console.log(keys);

        var i;
        var header = table.createTHead();
        var row = header.insertRow(0);
        for (i = 0; i < keys.length; i++) { // setting up the table headers
            var cell = row.insertCell(i);
            cell.outerHTML = "<th>" + keys[i] + "</th>";
        }

    }

    pub.setup = function() {
        $.ajax ({
            type: "GET",
            url: "./Resources/bookings.json",
            dataType: 'json',
            cache: false,
            success: function(data) {
                displayBookings(data);
            },

            error: function() {
                $("#bookings").html("Sorry, something has gone wrong on our end.");
            }
        });
    }

    return pub;
}());

$(document).ready(bookings.setup);