function initMap(){

  const myLatlng = { lat: 12.363, lng: 88.044 };
  var mapProp = {
    center:myLatlng,
    zoom:5,  
  };
  var map=new google.maps.Map(document.getElementById("googleMap"), mapProp);

  let infoWindow = new google.maps.InfoWindow({
    content: "Click the map to get Lat/Lng!",
    position: myLatlng,
  });

  infoWindow.open(map);
  // Configure the click listener.
  map.addListener("click", (mapsMouseEvent) => {
    // Close the current InfoWindow.
    infoWindow.close();
    // Create a new InfoWindow.

  

    infoWindow = new google.maps.InfoWindow({
      position: mapsMouseEvent.latLng,
    });
	document.getElementById('lat').value = mapsMouseEvent.latLng.lat();
	document.getElementById('lng').value = mapsMouseEvent.latLng.lng();
    infoWindow.setContent(
      JSON.stringify(mapsMouseEvent.latLng.toJSON(), null, 2)
    );

    infoWindow.open(map);
  });

  
}
window.initMap=initMap;






google.maps.event.addDomListener(window, 'load', initMap);
