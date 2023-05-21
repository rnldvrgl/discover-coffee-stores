import { useState } from "react";

const useTrackLocation = () => {
    const [locationErrorMsg, setLocationErrorMsg] = useState('');

    const [latLong, setLatLong] = useState('');

    const [isFindingLocation, setisFindingLocation] = useState(false);

    const success = (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        setLatLong(`${latitude}, ${longitude}`);
        setLocationErrorMsg('');
        setisFindingLocation(false);
    }

    const error = () => {
        setLocationErrorMsg("Unable to retrieve your location");
        setisFindingLocation(false);
    }

    const handleTrackLocation = () => {
        setisFindingLocation(true);
        if (!navigator.geolocation) {
            setLocationErrorMsg("Geolocation is not supported by your browser");
            setisFindingLocation(false);
        } else {
            // status.textContent = "Locating…";
            navigator.geolocation.getCurrentPosition(success, error);
        }
    }

    return {
        latLong,
        handleTrackLocation,
        locationErrorMsg,
        isFindingLocation
    }
}

export default useTrackLocation;