$(document).ready(function(event) {
  $('button[data-toggle="modal"]').on('click', async function() {
    console.log("generating...");
    const id = $(this).attr('id');
    $('#exampleModal').modal('show');
    
    const response = await fetch('/prompt' + id);
    const prompt = await response.text();
    $('.modal-body').text(prompt);
  });
});

var map = new google.maps.Map(document.getElementById('map'), {
  zoom: 14,
  center: { lat: 0, lng: 0 }  // Default center, will be updated by geocoding
});

// Geocode the ZIP code
var geocoder = new google.maps.Geocoder();
var zipCode = '91505';  // Replace with your desired ZIP code

geocoder.geocode({ 'address': zipCode }, function (results, status) {
  if (status === 'OK') {
    // Center the map on the geocoded location
    map.setCenter(results[0].geometry.location);
    // Add a marker at the geocoded location
    new google.maps.Marker({
      map: map,
      position: results[0].geometry.location
    });
  } else {
    alert('Geocode was not successful for the following reason: ' + status);
  }
});
