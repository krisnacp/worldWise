import styles from "./Map.module.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useCityContext } from "../context/CityContext";
import { useGeoLocation } from "../hooks/useGeoLocation";
import { useUrlPos } from "../hooks/useUrlPos";
import {
    MapContainer,
    TileLayer,
    Marker,
    Popup,
    useMap,
    useMapEvents,
} from "react-leaflet";
import Button from "../components/Button";

SwitchCenter.propTypes = {
    position: PropTypes.array,
};
// function componenet untuk switch map secara smooth
function SwitchCenter({ position }) {
    const map = useMap();
    map.setView(position);
    return null;
}

// function untuk detect position pada map ketika click
function ClickLocation() {
    const navigate = useNavigate();
    // const { city, state } = useCityContext();
    const map = useMapEvents({
        click: (e) => {
            map.locate();
            // const cityName = cities.find(
            //     (city) => city.cityName === state?.data?.cityName,
            // );
            // if (cityName) {
            //     console.log("masuk condition");
            //     return;
            //     navigate("cites");
            // }
            // console.log("diluar condition");
            // /${cityName.id}?lat=${cityName.position.lat}&lng=${cityName.position.lat}
            // preventSameCity();
            navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`);
            const pos = [e.latlng.lat, e.latlng.lng];
            map.flyTo(pos, map.getZoom());
        },
    });
    return null;
}

function Map() {
    const { state } = useCityContext();
    // membuat custom hook untuk useSearchParams agar bisa di-reused logic-nya
    const { lat, lng } = useUrlPos();
    const [currentPosition, setCurrentPosition] = useState([
        38.727881642324164, -9.140900099907554,
    ]);
    const {
        isLoading: isLoadingPos,
        position: geolocation,
        getMyLocation,
    } = useGeoLocation();

    // TODO: penggunaan effect untuk store koordinat loaksi baru dari search params
    useEffect(() => {
        if (lat && lng) setCurrentPosition([Number(lat), Number(lng)]);
    }, [lat, lng]);

    // TODO: penggunaan effect untuk store koordinat lokasi baru dari function bawaan javascript navigator
    useEffect(() => {
        if (geolocation.lat && geolocation.lng)
            setCurrentPosition([geolocation.lat, geolocation.lng]);
    }, [geolocation]);

    return (
        <>
            <div id="map" className={`${styles.mapContainer} `}>
                <MapContainer
                    center={currentPosition}
                    zoom={7}
                    scrollWheelZoom={true}
                    className={styles.map}
                >
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {state.cities.map((city) => {
                        const { position, notes, id } = city;
                        return (
                            <Marker
                                position={[position.lat, position.lng]}
                                key={id}
                            >
                                <Popup key={id}>{notes}</Popup>
                            </Marker>
                        );
                    })}
                    <SwitchCenter position={currentPosition} />
                    <ClickLocation />
                </MapContainer>
                {geolocation.lat && geolocation.lat ? (
                    <></>
                ) : (
                    <Button type="position" onClick={getMyLocation}>
                        {isLoadingPos ? "Loading..." : "Use your position"}
                    </Button>
                )}
            </div>
        </>
    );
}

export default Map;
