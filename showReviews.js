var showReviews = (function() {
    "use strict";
    var pub = {};

    var customerReviews;
    var index;

    function displayReview() {
        $("#reviews").empty();

        $("#reviews").append("<h3>" + customerReviews[index].title + "</h3>");
        $("#reviews").append("<p>" + customerReviews[index].author + "</p>");
        $("#reviews").append("<p>" + customerReviews[index].reviewcontent + "</p>");
        index++;

        if (index === customerReviews.length) {
            index = 0;
        }
    }

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
            }
        });
    }

    return pub;

}());

$(document).ready(showReviews.setup);