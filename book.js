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
            var imageCall = $(this).attr("src");

            imageCall = imageCall.replace("images/", "");
            imageCall = imageCall.replace(".jpg", "");

            switch (imageCall) {
                case "smallCar":
                    $(this).click(smallCar);
                    $(this).css('cursor', 'pointer');
                    break;
                case "mediumCar":
                    $(this).click(mediumCar);
                    $(this).css('cursor', 'pointer');
                    break;
                case "largeCar":
                    $(this).click(largeCar);
                    $(this).css('cursor', 'pointer');
                    break;
                case "luxuryCar":
                    $(this).click(luxuryCar);
                    $(this).css('cursor', 'pointer');
                    break;
            }
        })
    }

    function smallCar() {
        console.log("Small cars");
    }

    function mediumCar() {
        console.log("Medium Cars");
    }

    function largeCar() {
        console.log("Large Cars");
    }

    function luxuryCar() {
        console.log("Luxury Cars");
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