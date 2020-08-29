var map = (function () {
    "use strict";
    var pub = {};
    var mapData, map, landmarks, restaurant, campsite;

    pub.setup = function () {
        $.ajax ({
            type: "GET",
            url: "./Resources/POI.geojson",
            dataType: 'json',
            cache: false,
            success: function(data) {
                mapData = data;

                map = L.map('map').setView([-45.910, 170.495], 14);

                L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                    maxZoom: 18,
                    attribution: 'Map data &copy; <a href="http://openstreetmap.org/copyright">OpenStreetMap</a> contributors, ' +
                        '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, '
                }).addTo(map);

                landmarks = L.geoJSON(mapData,  {
                    filter: function(feature, layer) {
                        return (feature.properties.type === "landmark");
                    },
                    onEachFeature: function(feature, layer) {
                        layer.bindPopup('<strong>' + feature.properties.name + '</strong>' + '<br>' + feature.properties.type);
                    },
                }).addTo(map);

                restaurant = L.geoJSON(mapData, {
                    filter: function(feature, layer) {
                        return (feature.properties.type === "restaurant");
                    },
                    onEachFeature: function(feature, layer) {
                        layer.bindPopup('<strong>' + feature.properties.name + '</strong>' + '<br>' + feature.properties.type);
                    },
                }).addTo(map);

                campsite = L.geoJSON(mapData, {
                    filter: function(feature, layer) {
                        return (feature.properties.type === "campsite");
                    },
                    onEachFeature: function(feature, layer) {
                        layer.bindPopup('<strong>' + feature.properties.name + '</strong>' + '<br>' + feature.properties.type);
                    },
                }).addTo(map);

                var overlays = {
                    "Landmarks": landmarks,
                    "Restaurant": restaurant,
                    "Campsite": campsite
                };

                L.control.layers(null, overlays).addTo(map);

            },

            error: function() {
                $("#map").html("Sorry, something has gone wrong on our end.");
            }
        });
    }

    return pub;

}());

$(document).ready(map.setup);