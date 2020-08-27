var book = (function() {
    "use strict";

    var booked;

    var pub = {};

    pub.setup = function() {
        $.ajax ({
            type: "GET",
            url: "./Resources/bookings.json",
            dataType: 'json',
            cache: false,
            success: function(data) {
                booked = data;
                console.log(booked);
            },

            error: function() {
                $("#createBooking").html("Sorry, something has gone wrong on our end.");
            }
        });

        $.ajax ({
            type: "GET",
            url: "./Resources/vehicles.json",
            dataType: 'json',
            cache: false,
            success: function(data) {
                console.log(data);
            },

            error: function() {
                $("#createBooking").html("Sorry, something has gone wrong on our end.");
            }
        });
    }

    return pub;
}());

$(document).ready(book.setup);