var showReviews = (function() {
    "use strict";
    var pub = {};

    var customerReviews;
    var index;

    /* This function shuffles through the reviews and displays them on the home page */
    function displayReview() {
        $("#reviews").empty();

        $("#reviews").append("<h3>" + customerReviews[index].title + "</h3>");
        $("#reviews").append("<p>" + customerReviews[index].author + "</p>");
        $("#reviews").append('<blockquote>"' + customerReviews[index].reviewcontent + '"</blockquote>');
        index++;

        if (index === customerReviews.length) {
            index = 0;
        }
    }

    /* Setup function reads the data from reviews.json */
    pub.setup = function() {
        $.ajax ({
            type: "GET",
            url: "./Resources/reviews.json",
            dataType: 'json',
            cache: false,
            success: function(data) {
                customerReviews = data;
                index = 0;
                displayReview();
                setInterval(displayReview, 7000);
            },

            error: function() {
                $("#reviews").html("Sorry, something has gone wrong on our end.");
            }
        });
    }

    return pub;

}());

$(document).ready(showReviews.setup);