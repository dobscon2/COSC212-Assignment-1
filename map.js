var map = (function () {
    "use strict";
    var pub = {};
    var mapData, map;

    pub.setup = function () {
        $.ajax ({
            type: "GET",
            url: "./Resources/POI.geojson",
            dataType: 'json',
            cache: false,
            success: function(data) {
                mapData = data;
                console.log(mapData);

                map = L.map('map').setView([-45.875, 170.500], 14);

                L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                    maxZoom: 18,
                    attribution: 'Map data &copy; <a href="http://openstreetmap.org/copyright">OpenStreetMap</a> contributors, ' +
                        '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, '
                }).addTo(map);

            },

            error: function() {
                $("#map").html("Sorry, something has gone wrong on our end.");
            }
        });
    }

    return pub;

}());

$(document).ready(map.setup);