const homeCoordinates = { lat: 44.89895, lng: -93.22331 };
var mapOptions = {
  center: homeCoordinates,
  zoom: 10,
  mapTypeId: google.maps.MapTypeId.ROADMAP,
};

const map = new google.maps.Map(
  document.getElementById("googleMap"),
  mapOptions
);

// directions service to get route from first address to second address
const directionsService = new google.maps.DirectionsService();

// directions renderer to display route
const directionsDisplay = new google.maps.DirectionsRenderer();

directionsDisplay.setMap(map);

const calcRoute = () => {
  const request = {
    origin: document.getElementById("from").value,
    destination: document.getElementById("to").value,
    travelMode: google.maps.TravelMode.DRIVING,
    unitSystem: google.maps.UnitSystem.IMPERIAL,
  };

  directionsService.route(request, (result, status) => {
    if (status == google.maps.DirectionsStatus.OK) {
      // get info
      const output = document.querySelector("#output");
      output.innerHTML =
        "<div class='alert-info'>From: " +
        document.getElementById("from").value +
        "<br />To: " +
        document.getElementById("to").value +
        "<br /> Driving distance : " +
        result.routes[0].legs[0].distance.text +
        "<br />Duration : " +
        result.routes[0].legs[0].duration.text +
        "</div>";

      // display route
      directionsDisplay.setDirections(result);
    } else {
      // clear map routes and error out
      directionsDisplay.setDirections({ routes: [] });

      map.setCenter(homeCoordinates);

      output.innerHTML =
        "<div class='error'>error: could not retrieve driving distance</div>";
    }
  });
};

const from = document.getElementById("from");
const autocomplete1 = new google.maps.places.Autocomplete(from);

const to = document.getElementById("to");
const autocomplete2 = new google.maps.places.Autocomplete(to);
