import styles from "./CityList.module.css";
import { useCityContext } from "../context/CityContext";

import CityItem from "./CityItem";
import Spinner from "./Spinner";
import Message from "./Message";

function CityList() {
    const { state } = useCityContext();

    if (state.loading) return <Spinner />;
    if (!state.cities.length)
        return (
            <Message message="Add your first city by clicking on a city in the map" />
        );

    return (
        <div className={styles.cityList}>
            {state.cities.map((city) => {
                return <CityItem city={city} key={city.id} />;
            })}
        </div>
    );
}

export default CityList;
