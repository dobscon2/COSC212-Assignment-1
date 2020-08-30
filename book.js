var book = (function() {
    "use strict";

    var vehicles;
    var size;
    var pickupDate, dropoffDate;

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
        size = $(this).attr("src");

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
        $("#errormessage").empty();

        pickupDate = new Date($("#pickupDate").val());
        dropoffDate = new Date($("#dropoffDate").val());
        var todayDate = new Date();
        var valid = true;

        if (pickupDate.toString() === "Invalid Date") {
            $("#errormessage").append("<p>Please input a pickup date</p>");
            valid = false;
        }

        if (dropoffDate.toString() === "Invalid Date") {
            $("#errormessage").append("<p>Please input a dropoff date</p>");
            valid = false;
        }
        if (pickupDate < todayDate && pickupDate.setHours(0 , 0, 0, 0) != todayDate.setHours(0, 0, 0, 0)) {
            $("#errormessage").append("<p>Your pickup date can't be in the past</p>");
            valid = false;
        }

        if (pickupDate.setHours(0, 0, 0, 0) === todayDate.setHours(0, 0, 0, 0)) {
            $("#errormessage").append("<p>Your pickup date can't be today");
            valid = false;
        }

        if (dropoffDate < pickupDate) {
            $("#errormessage").append("<p>Your dropoff date can't be before your pickup date");
            valid = false;
        }

        if (dropoffDate.setHours(0, 0, 0, 0) === todayDate.setHours(0, 0, 0, 0)) {
            $("#errormessage").append("<p>Your dropoff date can't be today");
            valid = false;
        }

        if (valid === true) {
            displayChoices();
        }
    }

    function displayChoices() {
        $("#createBooking").empty();

        $.ajax ({
            type: "GET",
            url: "./Resources/bookings.json",
            dataType: 'json',
            cache: false,
            success: function(data) {
                var bookedVehicles = [];

                $("#createBooking").append("<h3>" + size + " Cars</h3>");

                $("#createBooking").append("<hr>");

                $(data.bookings.booking).each(function() {
                    var bookedPickup = new Date(this.pickup.month + "/" + this.pickup.day + "/" + this.pickup.year);
                    var bookedDropoff = new Date(this.dropoff.month + "/" + this.dropoff.day + "/" + this.dropoff.year);

                    if ((pickupDate <= bookedDropoff) && (bookedPickup <= dropoffDate)) {
                        bookedVehicles.push(this.number);
                    }
                });

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

                $("#back").click(chooseDates);

            },

            error: function() {
                $("#createBooking").html("Sorry, something has gone wrong on our end.");
            }
        });



    }

    pub.setup = function() {


        $.ajax ({
            type: "GET",
            url: "./Resources/vehicles.json",
            dataType: 'json',
            cache: false,
            success: function(data) {
                vehicles = data;
                startBooking();
            },

            error: function() {
                $("#createBooking").html("Sorry, something has gone wrong on our end.");
            }
        });
    }

    return pub;
}());

$(document).ready(book.setup);