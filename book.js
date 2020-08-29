var book = (function() {
    "use strict";

    var booked;
    var vehicles;

    var pub = {};

    function startBooking() {
        $("#createBooking").empty();
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

        size = size.charAt(0).toUpperCase() + size.substring(1, size.length);

        $("#createBooking").empty();

        $("#createBooking").append("<h3>" + size + " Cars</h3>");

        $("#createBooking").append("<hr>");

        $(vehicles.fleet.vehicle).each(function() {
            if (this.vehicleType === size) {
                var imageURL = "images/" + this.registration + ".jpg";
                console.log(imageURL);
                $("#createBooking").append("<div class ='vehicleItem'>" +
                    "<ul>" +
                    "<li>Registration: " + this.registration + "</li>" +
                    "<li>Vehicle Type: " + this.vehicleType + "</li>" +
                    "<li>Vehicle Description: " + this.description + "</li>" +
                    "<li>Vehicle Price per Day: $" + this.pricePerDay + "</li>" +
                    "</ul>" +
                    "<img src='" + imageURL + "' alt='car picture'>" +
                    "</div>" +
                    "<hr>");
            }
        });

        $("#createBooking").append("<button type='button'>Go Back</button>");

        $("#createBooking button").click(startBooking);

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
                vehicles = data;
            },

            error: function() {
                $("#createBooking").html("Sorry, something has gone wrong on our end.");
            }
        });
    }

    return pub;
}());

$(document).ready(book.setup);