import styles from "./CountriesList.module.css";
import { useCityContext } from "../context/CityContext";

import Spinner from "./Spinner";
import Message from "./Message";
import CountryItem from "./CountryItem";

function CountryList() {
    const { state } = useCityContext();

    if (state.loading) return <Spinner />;
    if (!state.cities.length)
        return (
            <Message message="Add your first country by clicking on a country in the map" />
        );

    // const countries = [];
    const countries = state.cities.reduce((arr, city) => {
        if (!arr.map((el) => el.country).includes(city.country)) {
            return [...arr, { country: city.country, emoji: city.emoji }];
        }
        return arr;
    }, []);

    return (
        <div className={styles.countryList}>
            {countries.map((country) => {
                return <CountryItem country={country} key={country.country} />;
            })}
        </div>
    );
}

export default CountryList;
