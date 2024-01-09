import PropTypes from "prop-types";
import styles from "./cityItem.module.css";
import { Link } from "react-router-dom";
import { useCityContext } from "../context/CityContext";

const formatDate = (date) =>
    new Intl.DateTimeFormat("en", {
        day: "numeric",
        month: "long",
        year: "numeric",
        weekday: "long",
    }).format(new Date(date));

CityItem.propTypes = {
    city: PropTypes.object,
};

function CityItem({ city }) {
    const { state, deleteCity } = useCityContext();

    // function untuk handle delete city
    function handleDeleteCity(e) {
        e.preventDefault();
        deleteCity(city.id);
    }

    return (
        <li>
            <Link
                to={`${city.id}?lat=${city.position.lat}&lng=${city.position.lng}`}
                className={`${styles.cityItem} ${
                    state?.currentCity?.id === city.id
                        ? styles["cityItem--active"]
                        : ""
                }`}
            >
                <span className={styles.emoji}>
                    <span
                        className={`fi fi-${city.emoji.toLowerCase()}`}
                    ></span>
                </span>
                <h3 className={styles.name}>{city.cityName}</h3>
                <time className={styles.date}>({formatDate(city.date)})</time>
                <button
                    onClick={(e) => handleDeleteCity(e)}
                    className={styles.deleteBtn}
                >
                    &times;
                </button>
            </Link>
        </li>
    );
}

export default CityItem;
