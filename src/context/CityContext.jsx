import { createContext, useCallback, useContext, useReducer } from "react";
import PropTypes from "prop-types";
import {
    // useState
    useEffect,
} from "react";
import { nanoid } from "nanoid";

const CityContextState = createContext();
// fake API base URL
const BASE_URL = "http://localhost:8000";
// API key
const API_KEY = import.meta.env.VITE_GEOAPIFY_API_KEY;
// geocode base URL
const BASE_URL_GEOCODE = "https://api.geoapify.com/v1/geocode/reverse";

// custom context hook
export function useCityContext() {
    const context = useContext(CityContextState);
    if (context === undefined)
        throw new Error(
            "This context is used outside of <CityContext.Provider>",
        );
    return context;
}

// *inital argument untuk reducer
const initialArg = {
    cities: [],
    currentCity: null,
    data: {
        cityName: "",
        country: "",
        emoji: "",
        date: new Date(),
        notes: "",
        position: {
            lat: null,
            lng: null,
        },
        id: null,
    },
    loading: false,
    error: null,
};

// ?reducer function
function reducer(state, action) {
    switch (action.type) {
        case "loading": {
            return {
                ...state,
                loading: action.payload,
            };
        }
        case "error": {
            return {
                ...state,
                error: action.payload,
            };
        }
        case "receivedCitiesData": {
            return {
                ...state,
                cities: action.payload,
            };
        }
        case "addNewCityData": {
            return {
                ...state,
                cities: [...state.cities, action.payload],
            };
        }
        case "deleteCity": {
            return {
                ...state,
                cities: action.payload,
            };
        }
        case "currentCity": {
            return {
                ...state,
                currentCity: action.payload,
            };
        }
        case "receivedGeocodeData": {
            return {
                ...state,
                data: {
                    ...state.data,
                    cityName: action.payload.city,
                    country: action.payload.country,
                    emoji: action.payload.country_code,
                    position: {
                        lat: action.payload.lat,
                        lng: action.payload.lon,
                    },
                    id: nanoid(),
                },
            };
        }
        case "changeCityName": {
            return {
                ...state,
                data: {
                    ...state.data,
                    cityName: action.payload,
                },
            };
        }
        case "time": {
            return {
                ...state,
                data: {
                    ...state.data,
                    date: action.payload,
                },
            };
        }
        case "notes": {
            return {
                ...state,
                data: {
                    ...state.data,
                    notes: action.payload,
                },
            };
        }
        default:
            throw Error("Unknown action: " + action.type);
    }
}

// propTypes for CityContext function
CityContext.propTypes = {
    children: PropTypes.node,
};

// context component
function CityContext({ children }) {
    // const [cities, setCities] = useState([]);
    // const [loading, setLoading] = useState(false);
    // const [currentCity, setCurrentCity] = useState({});
    const [state, dispatch] = useReducer(reducer, initialArg);

    // TODO: effect fetch all data
    useEffect(() => {
        async function fetchCities() {
            try {
                dispatch({ type: "error", payload: null });
                dispatch({ type: "loading", payload: true });
                const res = await fetch(`${BASE_URL}/cities`);
                if (!res.ok) throw new Error("Error while fetching data");
                const data = await res.json();
                // setCities(data);
                dispatch({ type: "receivedCitiesData", payload: data });
                dispatch({ type: "loading", payload: false });
            } catch (error) {
                console.log(error.message);
                dispatch({ type: "error", payload: error.message });
            }
        }
        fetchCities();
    }, []);

    // function to gets specific city depend on id
    const getCity = useCallback(async function getCity(id) {
        try {
            dispatch({ type: "error", payload: null });
            dispatch({ type: "loading", payload: true });
            const res = await fetch(`${BASE_URL}/cities/${id}`);
            if (!res.ok) throw new Error("Error while fetching data");
            const data = await res.json();
            dispatch({ type: "currentCity", payload: data });
            dispatch({ type: "loading", payload: false });
            return data;
        } catch (error) {
            console.log(error.message);
            dispatch({ type: "error", payload: error.message });
        }
    }, []);

    // function to add city to fake API
    async function addCity(dataObj) {
        try {
            dispatch({ type: "error", payload: null });
            dispatch({ type: "loading", payload: true });
            const res = await fetch(`${BASE_URL}/cities`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(dataObj),
            });
            if (!res.ok) throw new Error("Error while sending data");
            // setCities((prev) => [...prev, dataObj]);
            dispatch({ type: "addNewCityData", payload: dataObj });
            // console.log(data);
            dispatch({ type: "loading", payload: false });
        } catch (error) {
            console.log(error.message);
            dispatch({ type: "error", payload: error.message });
            dispatch({ type: "loading", payload: false });
        }
    }

    // function to delete city from fake API
    async function deleteCity(id) {
        try {
            dispatch({ type: "error", payload: null });
            dispatch({ type: "loading", payload: true });
            const res = await fetch(`${BASE_URL}/cities/${id}`, {
                method: "DELETE",
            });
            if (!res.ok) throw new Error("Error while deleting data");
            // setCities((prev) => prev.filter((city) => city.id !== id));
            dispatch({
                type: "deleteCity",
                payload: state.cities.filter((city) => city.id !== id),
            });
            dispatch({ type: "loading", payload: false });
        } catch (error) {
            console.log(error.message);
            dispatch({ type: "error", payload: error.message });
            dispatch({ type: "loading", payload: false });
        }
    }

    // function untuk fetch gecode data dari kota yang di-click pada map
    const getGeocodeData = useCallback(async function getGeocodeData(lat, lng) {
        try {
            dispatch({ type: "error", payload: null });
            dispatch({ type: "notes", payload: "" });
            dispatch({ type: "loading", payload: true });
            const res = await fetch(
                `${BASE_URL_GEOCODE}?lat=${lat}&lon=${lng}&apiKey=${API_KEY}`,
                {
                    method: "GET",
                },
            );
            if (!res.ok) throw new Error("Error while fetching from API");
            const data = await res.json();
            // console.log(data.features[0].properties);
            if (!data.features[0].properties.city)
                throw new Error(
                    "The spot that you click doesn't seem to be a city. Click another spot on map 😠",
                );
            dispatch({
                type: "receivedGeocodeData",
                payload: data.features[0].properties,
            });
            dispatch({ type: "loading", payload: false });
        } catch (error) {
            console.log(error.message);
            dispatch({ type: "error", payload: error.message });
            dispatch({ type: "loading", payload: false });
        }
    }, []);

    // function untuk handle change city name dari form
    function handleCityName(event) {
        dispatch({ type: "changeCityName", payload: event.target.value });
    }

    // function untuk handle manual time yang diinput oleh user dari form
    function handleManualTime(date) {
        dispatch({ type: "time", payload: date });
    }

    // function untuk handle written notes yang ditulis user dari form
    function handleWriteNotes(event) {
        dispatch({ type: "notes", payload: event.target.value });
    }

    // membuat function untuk handle submit data yang sudah disatukan dalam sebuah object
    async function handleSubmit(e) {
        e.preventDefault();
        console.log(state.data);
        await addCity(state.data);
    }

    return (
        <CityContextState.Provider
            value={{
                state,
                // cities,
                // loading,
                // currentCity,
                getCity,
                addCity,
                deleteCity,
                getGeocodeData,
                handleCityName,
                handleManualTime,
                handleWriteNotes,
                handleSubmit,
                // preventSameCity,
            }}
        >
            {children}
        </CityContextState.Provider>
    );
}

export default CityContext;
