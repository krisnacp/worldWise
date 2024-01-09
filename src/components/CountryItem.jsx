import PropTypes from "prop-types";
import styles from "./CountryItem.module.css";

CountryItem.propTypes = {
    country: PropTypes.object,
};

function CountryItem({ country }) {
    return (
        <li className={styles.countryItem}>
            <span className={`fi fi-${country.emoji.toLowerCase()}`}></span>
            <span>{country.country}</span>
        </li>
    );
}

export default CountryItem;
