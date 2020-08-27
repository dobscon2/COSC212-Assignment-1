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
                console.log(mapData.features);

                map = L.map('map').setView([-45.910, 170.495], 14);

                L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                    maxZoom: 18,
                    attribution: 'Map data &copy; <a href="http://openstreetmap.org/copyright">OpenStreetMap</a> contributors, ' +
                        '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, '
                }).addTo(map);

                L.geoJSON(data, {
                    onEachFeature: function(feature, layer) {
                        layer.bindPopup('<strong>' + feature.properties.name + '</strong>' + '<br>' + feature.properties.type);
                }
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