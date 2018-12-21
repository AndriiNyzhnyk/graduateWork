window.onload = () => {

    (async function init() {
        try {
            let position = await getPosition();
            let map = await createMap(position.lat, position.lng);
            await addMarker(map, 'You', position.lat, position.lng);

        } catch (e) {
            console.error(e);
        }
    })();

    function getPosition() {
        return new Promise(resolve => {
            navigator.geolocation.getCurrentPosition( (position) => {
                let lat = position.coords.latitude;
                let lng = position.coords.longitude;

                resolve({lat,lng});
            });
        });
    }


    function createMap(lat, lng) {
        return new Promise( resolve => {

            let myMap = L.map('mapid').setView([lat, lng], 15);
            // L.tileLayer('https://a.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(myMap);
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(myMap);

            resolve(myMap);
        });
    }

    function addMarker(myMap, userName, lat, lng) {
        return new Promise(resolve => {
            let marker = new L.marker([lat,lng])
                .addTo(myMap)
                .bindPopup(userName)
                .openPopup();


            resolve(marker);
        });
    }

};