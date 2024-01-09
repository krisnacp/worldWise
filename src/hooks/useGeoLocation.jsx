import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function useGeoLocation(defaultValue = {}) {
    const [isLoading, setIsLoading] = useState(false);
    const [position, setPosition] = useState(defaultValue);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    function getMyLocation() {
        // setCountClicks((count) => count + 1);

        if (!navigator.geolocation)
            return setError("Your browser does not support geolocation");

        setIsLoading(true);
        navigator.geolocation.getCurrentPosition(
            (pos) => {
                setPosition({
                    lat: pos.coords.latitude,
                    lng: pos.coords.longitude,
                });
                setIsLoading(false);
                navigate(
                    `form?lat=${pos.coords.latitude}&lng=${pos.coords.longitude}`,
                );
            },
            (error) => {
                setError(error.message);
                setIsLoading(false);
            },
        );
    }

    return {
        isLoading,
        // countClicks,
        position,
        error,
        getMyLocation,
    };
}
