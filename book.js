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
            $(this).click(chooseDates);
            $(this).css('cursor', 'pointer');
        });
    }

    function chooseDates() {
        var size = $(this).attr("src");

        size = size.replace("images/", "");
        size = size.replace(".jpg", "");
        size = size.replace("Car", "");

        size = size.charAt(0).toUpperCase() + size.substring(1, size.length);

        $("#createBooking").empty();

        $("#createBooking").append("<h3>Pickup and Dropoff Dates</h3>");
        $("#createBooking").append("<p>Please confirm your pickup and dropoff dates</p>");

        $("#createBooking").append("<form id='dates'><div id='pickup'>" +
            "<label for='pickupDate'>Pickup Date:</label>" +
            "<input type='date' id='pickupDate' name='pickupDate'>" +
            "</div>" +
            "<div id='dropoff'>" +
            "<label for='dropoffDate'>Dropoff Date:</label>" +
            "<input type='date' id='dropoffDate' name='dropoffDate'>" +
            "</div>" +
            "<button id='confirm' type='button'>Confirm</button>" +
            "</form>" +
            "<div id='errormessage'></div>");

        $("#confirm").click(checkDates);

        $("#createBooking").append("<button id='back' type='button'>Go Back</button>");
        $("#back").click(startBooking);
    }

    function checkDates() {
        console.log("beep bop");
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
                    "<button id='confirm' type='button'>Book this car</button>" +
                    "</div>" +
                    "<hr>");
            }
        });

        $("#createBooking").append("<button id='back' type='button'>Go Back</button>");

        $("#back").click(startBooking);

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