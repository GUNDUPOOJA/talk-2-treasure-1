
import locationsArray from '../init-locations.js';

let locationElement = document.getElementById("location");
let locationElement2 = document.getElementById("colorSelector1");



window.addEventListener('load', main);
locationElement.addEventListener('click', locationHandler);
locationElement.addEventListener('touch', locationHandler);
locationElement2.addEventListener('click', colorFunction1);
locationElement2.addEventListener('touch', colorFunction1);

function main() {
    console.log('Page is fully loaded');
}

let currentlat;
let currentlon;
let error = true;

var target = locationsArray[Math.floor(Math.random()*locationsArray.length)].Name;

// getLocation() function is used to collect the current location
async function getLocation() {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
    }).then(position => {
        return position;
    });
}

//the locationHandler() function checksout the current location and compares it with the 
//init-locations.

async function locationHandler() {
    let locText = await getLocation();
    currentlat = locText.coords.latitude;
    document.getElementById("device-lat").innerHTML = "Your device-latitude: " + currentlat.toFixed(6);
    currentlon = locText.coords.longitude;
    document.getElementById("device-long").innerHTML = "Your device longitude: " + currentlon.toFixed(6);

    locationsArray.forEach(function (value) {
        if (isInside(value.Latitude, value.Longitude)) {
            document.getElementById("locationAnswer").innerHTML = value.Name;
            let utterance = new SpeechSynthesisUtterance();
            utterance.text = `Congratulations! From talk-2-treasure-1 group, You found location ${value.Name}`;
            speechSynthesis.speak(utterance);
            error = false;
        }
    });

    // In case of any error where if the device is not 30m range it displays error.

    if(error) {

       let innerHTML = "Sorry, You are not in the target range.";
        document.getElementById("error-message").innerHTML = innerHTML;
        const utterance = new SpeechSynthesisUtterance(innerHTML);
        //utterance.text = `Sorry,You're not in the radius range.`;
        speechSynthesis.speak(utterance);
    } else {
        document.getElementById("error-message").innerHTML = "";
    }
}


//checking if distance is in 30m range.


function isInside(questLat, questLon) {
    let distance = distanceBetweenLocations(questLat, questLon);
    console.log("distance: " + distance);
    if (distance < 30) {
        return true;
    } else {
        return false;
    }
}

//distance between the latitude-longitude points.
function distanceBetweenLocations(questLat, questLon) {
    const R = 6371e3;
    const φ1 = currentlat * Math.PI / 180;
    const φ2 = questLat * Math.PI / 180;
    const Δφ = (questLat - currentlat) * Math.PI / 180;
    const Δλ = (questLon - currentlon) * Math.PI / 180;

    const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
        Math.cos(φ1) * Math.cos(φ2) *
        Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const d = R * c;
    return d; 
}
function colorFunction1() {

    document.getElementById("colorSelector1").innerHTML = target;
    let utterance = new SpeechSynthesisUtterance(`Hello! The target location is ${target}`);
    speechSynthesis.speak(utterance);


}
       
    
 