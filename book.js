var book = (function() {
    "use strict";

    var booked;

    var pub = {};

    function startBooking() {
        $("#createBooking").append("<p>Please choose a car size.</p>");
        $("#createBooking").append("<div class='size'>" +
            "<img src='images/smallCar.jpg' alt='small car'>" +
            "<figcaption>Small Car</figcaption></div>" +
            "<div class='size'>" +
            "<img src='images/mediumCar.jpg' alt='medium car'>" +
            "<figcaption>Medium Car</figcaption></div>" +
            "<div class='size'>" +
            "<img src='images/largeCar.jpg' alt='large car'>" +
            "<figcaption>Large Car</figcaption></div>" +
            "<div class='size'>" +
            "<img src='images/luxuryCar.jpg' alt='luxury car'>" +
            "<figcaption>Luxury Car</figcaption></div>");

        $(".size").find("img").each(function() {
            $(this).click(displayChoices);
            $(this).css('cursor', 'pointer');
        });
    }

    function displayChoices() {
        var size = $(this).attr("src");

        size = size.replace("images/", "");
        size = size.replace(".jpg", "");
        size = size.replace("Car", "");

        console.log(size);
    }

    pub.setup = function() {
        $.ajax ({
            type: "GET",
            url: "./Resources/bookings.json",
            dataType: 'json',
            cache: false,
            success: function(data) {
                booked = data;
                startBooking();
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