import styles from "./Form.module.css";
import "react-datepicker/dist/react-datepicker.css";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import { useUrlPos } from "../hooks/useUrlPos";
import { useCityContext } from "../context/CityContext";

import Message from "./Message";
import Button from "./Button";
import Spinner from "./Spinner";

export function convertToEmoji(countryCode) {
    const codePoints = countryCode
        .toUpperCase()
        .split("")
        .map((char) => 127397 + char.charCodeAt());
    return String.fromCodePoint(...codePoints);
}

function Form() {
    const navigate = useNavigate();
    const {
        state,
        getGeocodeData,
        handleCityName,
        handleManualTime,
        handleWriteNotes,
        handleSubmit,
    } = useCityContext();
    const { lat, lng } = useUrlPos();
    console.log(state);

    // TODO: penggunaan effect untuk fetch gecode data dari kota yang di-click pada map
    useEffect(() => {
        if (!lat & !lng) return;

        async function fetch() {
            await getGeocodeData(lat, lng);
        }
        fetch();
    }, [lat, lng, getGeocodeData]);

    if (state.loading) return <Spinner />;
    if (!lat & !lng)
        return (
            <Message message={"Start by clicking some spot on the map 😎"} />
        );
    if (state.error) return <Message message={state.error} />;

    return (
        <form
            className={`${styles.form} ${state.loading ? styles.loading : ""}`}
            onSubmit={(e) => {
                handleSubmit(e);
                return navigate("/app/cities");
            }}
        >
            <div className={styles.row}>
                <label htmlFor="cityName">City name</label>
                <input
                    id="cityName"
                    onChange={(e) => handleCityName(e)}
                    value={state.data.cityName}
                />
                <span className={styles.flag}>
                    <span className={`fi fi-${state.data.emoji}`}></span>
                </span>
            </div>

            <div className={styles.row}>
                <label htmlFor="date">
                    When did you go to {state.data.cityName}?
                </label>
                {/* <input
                    id="date"
                    onChange={(e) => handleManualTime(e)}
                    value={state.data.date}
                /> */}
                <DatePicker
                    showIcon
                    showYearDropdown
                    dropdownMode="select"
                    selected={state.data.date}
                    onChange={(date) => handleManualTime(date)}
                />
            </div>

            <div className={styles.row}>
                <label htmlFor="notes">
                    Notes about your trip to {state.data.cityName}
                </label>
                <textarea
                    id="notes"
                    onChange={(e) => handleWriteNotes(e)}
                    value={state.data.notes}
                />
            </div>

            <div className={styles.buttons}>
                <Button type="primary">
                    {state.loading ? "Sending Data..." : "Add"}
                </Button>
                <Button
                    type="back"
                    onClick={(e) => {
                        e.preventDefault();
                        return navigate(-1);
                    }}
                >
                    &larr; Back
                </Button>
            </div>
        </form>
    );
}

export default Form;
