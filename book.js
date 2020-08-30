var book = (function() {
    "use strict";

    var vehicles;
    var size;
    var pickupDate, dropoffDate;
    var registration_number;
    var name;
    var phone;

    var pub = {};

    function startBooking() {
        size = "";
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
        if (size.length === 0) {
            size = $(this).attr("src");

            size = size.replace("images/", "");
            size = size.replace(".jpg", "");
            size = size.replace("Car", "");

            size = size.charAt(0).toUpperCase() + size.substring(1, size.length);
        }

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
                    if (bookedVehicles.includes(this.registration) === false) {
                        if (this.vehicleType === size) {
                            var imageURL = "images/" + this.registration + ".jpg";
                            $("#createBooking").append("<div class ='vehicleItem'>" +
                                "<ul>" +
                                "<li class='registration'>Registration: " + this.registration + "</li>" +
                                "<li>Vehicle Type: " + this.vehicleType + "</li>" +
                                "<li>Vehicle Description: " + this.description + "</li>" +
                                "<li class='price'>Vehicle Price per Day: $" + this.pricePerDay + "</li>" +
                                "</ul>" +
                                "<img src='" + imageURL + "' alt='car picture'>" +
                                "<button class='confirm' type='button'>Book this car</button>" +
                                "</div>" +
                                "<hr>");
                        }
                    }
                });
                if ($(".vehicleItem").length >= 1) {
                    $(".confirm").click(confirmBooking);
                } else {
                    $("#createBooking").append("Sorry, no cars are currently available");
                }

                $("#createBooking").append("<button id='back' type='button'>Go Back</button>");
                $("#back").click(chooseDates);

            },

            error: function() {
                $("#createBooking").html("Sorry, something has gone wrong on our end.");
            }
        });
    }

    function confirmBooking() {
        registration_number = $(this).parent().find(".registration").text();
        var price = $(this).parent().find(".price").text();


        registration_number = registration_number.replace("Registration: ", "");
        price = price.replace("Vehicle Price per Day: $", "");
        price = parseFloat(price);


        var days = Math.round((dropoffDate - pickupDate) / (1000*60*60*24));

        var totalPrice = price * days;

        var item = $(this).parent()[0].outerHTML;

        $(this).remove();

        $("#createBooking").empty();

        $("#createBooking").append("<h3>Confirm Booking</h3><hr>");
        $("#createBooking").append(item);
        $(".confirm").remove();
        $("#createBooking").append("<hr>");

        $("#createBooking").append("<p>You have booked this car from " +
            pickupDate.getDate() + "/" + pickupDate.getMonth() + "/" + pickupDate.getFullYear() + " till the " +
            dropoffDate.getDate() + "/" + dropoffDate.getMonth() + "/" + dropoffDate.getFullYear() + "</p>");

        $("#createBooking").append("<p>The total price of your booking is: $" + totalPrice.toFixed(2) + "NZD</p>");

        $("#createBooking").append("<p>Please provide your details below</p>" +
            "<form id='contact'>" +
            "<label for='name'>Name:</label>" +
            "<input type='text' id='name' name='name'>" +
            "<label for='phone'>Phone:</label>" +
            "<input type='text' id='phone' name='phone'>" +
            "</form>");

        $("#createBooking").append("<div id='errormessage'></div>");

        $("#createBooking").append("<button id='back' type='button'>Go Back</button>");
        $("#back").click(displayChoices);

        $("#createBooking").append("<button id='complete' type='button'>Complete Booking</button>");
        $("#complete").click(checkDetails);

    }

    function checkDetails() {
        name = $("#name").val();
        phone = $("#phone").val();
        var valid = true;

        $("#errormessage").empty();

        if (name < 1) {
            $("#errormessage").append("<p>Please provide a name</p>");
            valid = false;
        }

        if (phone < 1) {
            $("#errormessage").append("<p>Please provide a phone number</p>");
            valid = false;
        }

        if (isNaN(phone) === true) {
            $("#errormessage").append("<p>Please don't provide letters in your phone number");
            valid = false;
        }

        if (valid === true) {
            bookCar();
        }
    }

    function bookCar() {
        var booking = {number: registration_number, name: name, pickup: pickupDate, dropoff: dropoffDate};
        var output = JSON.stringify(booking);
        window.sessionStorage.setItem("booking", output);

        $("#createBooking").empty();

        $("#createBooking").append("<h3>Booking Successful</h3>");
        $("#createBooking").append("<p>Thanks for booking with us</p>");
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