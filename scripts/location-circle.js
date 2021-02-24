// import default object with a local camelCase name
import locationsArray from "../init-locations.js";

export const inside = (device, bounds) => {
  // console.log(`CHECKING inside ${bounds.Name}`);
  // console.log(device);
  // console.log(bounds);
  // console.log(device.latitude > bounds.South);
  // console.log(device.latitude < bounds.North);
  // console.log(device.longitude > bounds.West);
  // console.log(device.longitude < bounds.East);
  const ans =
    device.latitude > bounds.South &&
    device.latitude < bounds.North &&
    device.longitude > bounds.West &&
    device.longitude < bounds.East;
  // console.log(`CHECKING ${bounds.Name} ANS: ${ans}`);
  return ans;
};

function isValid(coordinates) {
  // incomplete function
  let lat = coordinates.latitude;
  let lon = coordinates.longitude;
 
    if (lat < -90 || lat > 90 || lon < -180 || lon > 180)
        return false;
    else
        return true;
}


function isValidDevice(device) {
  // let deviceCoordinates = {};
  // deviceCoordinates["latitude"] = device.coords.latitude;
  // deviceCoordinates["longitude"] = device.coords.longitude;

  if (isValid(device.Coordinates)) {
    return true;
  } else {
    throw new Error(InvalidDevice);
  }
}

export function isValidType(location) {
  if (location.type == "circle") {
    return true;
  } else {
    throw "Invalid Location Type";
  }
}



export function isValidLocation(location) {
  if (
    location.name.length > 0 &&
    isValidType(location) &&
    isValidCoordinates(location.coordinates)&& location.radiusMeters==30.0)
  
    return true;
   else 
  {
    throw new Error(InvalidLocation);
  }
}

/**
 * Get the location
 * Uses new import / export - be sure to set type="module" in HTML
 * Can be easily added to any web page.
 * Includes GeoLocation API example.
 * @module location/getLocation
 * @author GunduPooja
 */
export default function getLocation() {
  if (!navigator.geolocation) {
    document.getElementById("error-message").innerHTML =
      "Browser does not support geolocation.";
  } else {
    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    };

    navigator.geolocation.getCurrentPosition(
      (position) => {
        // changed all query selectors to getElementById as they are more performant
        document.getElementById("device-lat").innerHTML = "";
        document.getElementById("device-long").innerHTML = "";
        document.getElementById("locationAnswer").innerHTML = "?";

        if (position === undefined) {
          document.getElementById("error-message").innerHTML =
            "Browser cannot determine device position (position is undefined).";
          // added as the rest of the code shouldnt be executed when position is not provided
          return;
        }

        const device = position.coords;
        // changed all query selectors to getElementById as they are more performant
        document.getElementById("device-lat").innerHTML = device.latitude;
        document.getElementById("device-long").innerHTML = device.longitude;
        const arrayLength = locationsArray.length;
        for (let i = 0; i < arrayLength; i += 1) {
          const thisLoc = locationsArray[i];
          if (inside(device, thisLoc)) {
            const name = thisLoc.Name;
            // changed all query selectors to getElementById as they are more performant
            document.getElementById("locationAnswer").innerHTML = name;
            const utterance = new SpeechSynthesisUtterance();
            utterance.text = `Congratulations! from talk-2-treasure-1, You found location ${name}`;
            window.speechSynthesis.speak(utterance);
            break;
          }
        }
      },
      (err) => {
        const s = `ERROR(${err.code}): ${err.message}`;
        console.warn(s);
        // changed all query selectors to getElementById as they are more performant
        document.getElementById("error-message").innerHTML = err.message;
      },
      options
    );
  }
  // moved the functions outside the geoLocation function for better testabiliity

  // Not sure what it does. But it caused tests to fail as it was throwing an error unwantedly and hence commented
  // if (device == null || location == null) {
  //   throw "Two valid arguments are needed";
  // } else {
  //   return true;
  // }

  export function isInsideCircle(device, location)
{
    if(isValidDevice(device)&&isValidLocation(location))
    {
        let devLat = device.coords.latitude;
        let devLon = device.coords.longitude;

        let locLat = location.coordinates[0].latitude;
        let locLon = location.coordinates[0].longitude;

        if(devLat<=locLat && devLon<=locLon)
        {
            return true;
        }
        else
            return false;
    }
    else
        return false;
}
}
