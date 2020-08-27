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

        var numberCell, nameCell, pickupCell, dropoffCell;
        for (i = 0; i < bookings.length; i++) {
            row = table.insertRow(1);
            numberCell = row.insertCell(0);
            nameCell = row.insertCell(1);
            pickupCell = row.insertCell(2);
            dropoffCell = row.insertCell(3);

            numberCell.innerHTML = bookings[i].number;
            nameCell.innerHTML = bookings[i].name;
            pickupCell.innerHTML = bookings[i].pickup.day + "/" + bookings[i].pickup.month + "/" + bookings[i].pickup.year;
            dropoffCell.innerHTML = bookings[i].dropoff.day + "/" + bookings[i].dropoff.month + "/" + bookings[i].dropoff.year;
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