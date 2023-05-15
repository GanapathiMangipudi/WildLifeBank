function submitForm() {
    // Get the values of lat and lng from the form
    const lat = parseFloat(document.getElementById('lat').value);
    const lng = parseFloat(document.getElementById('lng').value);
  
    // Create a new marker object using the lat and lng values
    const marker = {
      lat: lat,
      lng: lng
    };
  
    // Read the existing markers from the markers.json file
    const markersData = fs.readFileSync('markers.json');
    const markers = JSON.parse(markersData);
  
    // Add the new marker object to the array of markers
    markers.push(marker);
  
    // Write the updated array of markers to the markers.json file
    fs.writeFileSync('markers.json', JSON.stringify(markers));
  
    // Reload the page to display the new marker on the map
    location.reload();
  }
  