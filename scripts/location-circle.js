
function isValid(coordinates){
    let lat = coordinates.latitude;
    let lon = coordinates.longitude;

    // if()
}

function isValidDevice(device)
{
    let deviceCoordinates ={};
    deviceCoordinates["latitude"] = device.coords.latitude;
    deviceCoordinates["longitude"]= device.coords.longitude;

    if (isValid(deviceCoordinates)){
        return true;
    }
       else {
    throw "invalid Device";
       }
}

function isValidType(location){
    if(location.type=="circle"){
        return true;
    }
    else{
        throw "Invalid Location Type";
    }
}

function isValidCoordinates(coordinates)
{
    if(coordinates.length!=4)
    {
    return false;
    }

    coordinates.forEach(function (coordinate,index){
        if(!isValid(coordinate)){

            return false;
        }
    })
    return true;
}

function isValidLocation(location){
    if(location.name.length >0 && isValidType(location) && isValidCoordinates(location.coordinates))
    {    return true;
    }
    else{
    throw "Invalid Location";
}

}

function isValidArguments(device,location)
if(device ==null || location == null)
{
    throw "Two valid arguments are needed";
}
else{
    return true;
}

// export function isInsideCircle(device,location{
//     try{
//         let Validcheck = isValidArguments(device,location)
//     }
// })