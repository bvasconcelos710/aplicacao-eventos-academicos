let map;
let marker;

let center = { lat: -6.888463202449027, lng: -38.558930105104125 };

function initMap() {
    map = new google.maps.Map(document.querySelector("#map"), {
        center: center,
        zoom: 14,
    });

    marker = new google.maps.Marker({
        map: map,
        position: center,
        draggable: true
    });

    mudarInputs(center.lat, center.lng);

    map.addListener("click", (evento) => {
        mudarMarcador(evento);
    });

    marker.addListener('position_changed', () => {
        map.setCenter(marker.position);
    });
}

function mudarMarcador(evento) {
    console.log(evento);
    marker.setPosition(evento.latLng);
    mudarInputs(evento.latLng.lat(), evento.latLng.lng());
}

function mudarInputs(lat, lng) {
    const inputLat = document.querySelector("#lat");
    const inputLong = document.querySelector("#long");
    inputLat.value = lat;
    inputLong.value = lng;
}

window.addEventListener("load", () => initMap());