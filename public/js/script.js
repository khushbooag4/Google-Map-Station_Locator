
let map; 

function setMarker(Userdata, key) {
//   console.log(Userdata);
  var myLatlng = new google.maps.LatLng(
    Userdata.location.latitude,
    Userdata.location.longitude
  ); // set position

  const svgMarker = {
    path: "M10.453 14.016l6.563-6.609-1.406-1.406-5.156 5.203-2.063-2.109-1.406 1.406zM12 2.016q2.906 0 4.945 2.039t2.039 4.945q0 1.453-0.727 3.328t-1.758 3.516-2.039 3.070-1.711 2.273l-0.75 0.797q-0.281-0.328-0.75-0.867t-1.688-2.156-2.133-3.141-1.664-3.445-0.75-3.375q0-2.906 2.039-4.945t4.945-2.039z",
    fillColor: (Userdata.status === true) ? "Red" : "Green",
    fillOpacity: 1,
    strokeWeight: 0,
    rotation: 0,
    scale: 2,
    anchor: new google.maps.Point(15, 30),
  };
  // Add marker to map
  let marker = new google.maps.Marker({
    position: myLatlng,
    map: map,
    icon : svgMarker,
    label: key.toString(),
  });
  let status;
  if(Userdata.status === false){
      status = "Online";
  }else{
    status = "Offline";
  }
  var infoContent = "<strong>" + Userdata.operatorName + "</strong>";
  infoContent += "<p>" + Userdata.address + "," + Userdata.state +"</p>" +
    "<p>" + "Latitude :- " + Userdata.location.latitude + "</p>" + "<p>" +
    "Longitude :- " + Userdata.location.longitude + "</p>" + "<p>" + "Phone Number:- " +
    "<b>" + Userdata.phoneNumber + "</b>" + "</p>" +
    "<p>" + "Status :- " + status + "</p>";

  marker.info = new google.maps.InfoWindow({
    content: infoContent,
  });

  //Add Listener
  google.maps.event.addListener(marker, "click", () => {
    marker.info.open(map, marker);
  });

  //Add marker to loc variable
}

async function initMap(){
    const uluru = { lat: 21.7679, lng: 78.8718 };
    map = new google.maps.Map(document.getElementById("map"), {
    zoom: 5,
    center: uluru,
    });
    const url = "api/stations";
    const response = await fetch(url);
    var data = await response.json();

    console.log(data);
    data.data.map((Userdata,key) => {
        return setMarker(Userdata,key);
      });
}

 


