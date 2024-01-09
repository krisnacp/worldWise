import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Spinner from "./Spinner";
import styles from "./City.module.css";
import { useCityContext } from "../context/CityContext";
import Button from "./Button";

const formatDate = (date) =>
    new Intl.DateTimeFormat("en", {
        day: "numeric",
        month: "long",
        year: "numeric",
        weekday: "long",
    }).format(new Date(date));

function City() {
    const navigate = useNavigate();
    const [city, setCity] = useState({});
    const { id } = useParams();
    const { state, getCity } = useCityContext();

    useEffect(() => {
        async function fetch() {
            const city = await getCity(id);
            setCity(city);
        }
        fetch();
        // function getCity yang digunakan menjadi dependecies pada effect ternyata menyebabkan infinite request dan hal itu harus dibetulakn, jika tidak maka infinite request tersebut akan menganggu jalannya aplikasi
    }, [id, getCity]);

    const { cityName, emoji, date, notes } = city;

    return (
        <>
            {state.loading ? (
                <Spinner />
            ) : (
                <div className={styles.city}>
                    <div className={styles.row}>
                        <h6>City name</h6>
                        <h3>
                            <span
                                className={`fi fi-${emoji?.toLowerCase()}`}
                            ></span>{" "}
                            {cityName}
                        </h3>
                    </div>

                    <div className={styles.row}>
                        <h6>You went to {cityName} on</h6>
                        <p>{formatDate(date || null)}</p>
                    </div>

                    {notes && (
                        <div className={styles.row}>
                            <h6>Your notes</h6>
                            <p>{notes}</p>
                        </div>
                    )}

                    <div className={styles.row}>
                        <h6>Learn more</h6>
                        <a
                            href={`https://en.wikipedia.org/wiki/${cityName}`}
                            target="_blank"
                            rel="noreferrer"
                        >
                            Check out {cityName} on Wikipedia &rarr;
                        </a>
                    </div>

                    <div>
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
                </div>
            )}
        </>
    );
}

export default City;
