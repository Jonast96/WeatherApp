import { testing } from '../script.mjs';
import { averageTemperature } from './components.mjs';

/**
 * 
@function currentLocationReport
@description
This function is used to get the current location of the user using the geolocation API and pass the latitude and longitude to two other functions. It also makes use of the watchPosition function to continuously watch the location and stop the watch when the location is retrieved.
@param {function} testing - A function that takes in two parameters, latitude and longitude, and is imported from the script.mjs file.
@param {function} averageTemperature - A function that takes in two parameters, latitude and longitude, and is imported from the components.mjs file.
*/
export function currentLocationReport() {
    if (navigator.geolocation) {
        let watchId = navigator.geolocation.watchPosition(function (position) {
            let latitude = position.coords.latitude;
            let longitude = position.coords.longitude;
            testing(latitude, longitude)
            navigator.geolocation.clearWatch(watchId);
            averageTemperature(latitude, longitude)
            return latitude, longitude
        });
    } else {
        console.log("Geolocation is not supported by this browser.");
    }
}