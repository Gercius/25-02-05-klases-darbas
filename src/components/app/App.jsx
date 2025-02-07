import "./App.scss";
import { SearchBar } from "../searchBar/SearchBar";
import { WeatherDisplay } from "../weatherDisplay/WeatherDisplay";
import { useEffect, useState } from "react";

export const App = () => {
    const [searchedLocation, setSearchedLocation] = useState("");
    const [coordinates, setCoordinates] = useState(null);
    const [weatherData, setWeatherData] = useState(null);
    const [showError, setShowError] = useState("");

    const handleSearch = (data) => {
        if (showError) setShowError("");
        setSearchedLocation(data);
        if (!data) handleError();
    };

    const errorMesages = {
        emptyInput: "Įvesties laukelis negali būti tuščias!",
        incorrectInput: "Įveskite tinkamą vietovę!",
    };
    const handleError = () => {
        !searchedLocation ? setShowError(errorMesages.emptyInput) : setShowError(errorMesages.incorrectInput);
        setWeatherData(null);
        setSearchedLocation("");
    };

    // Get location geo data
    useEffect(() => {
        if (searchedLocation) {
            (async function getLocationCoordinates() {
                const url = `https://geocoding-api.open-meteo.com/v1/search?name=${searchedLocation}&count=10&language=en&format=json`;

                try {
                    const response = await fetch(url);
                    if (!response.ok) {
                        throw new Error(`Response status: ${response.status}`);
                    }
                    const json = await response.json();
                    const { latitude, longitude } = json.results[0];
                    setCoordinates({ longitude, latitude });
                } catch (error) {
                    handleError();
                    console.error("Error fetching location data:", error);
                }
            })();
        }
    }, [searchedLocation]);

    // Get location weather data
    useEffect(() => {
        if (coordinates) {
            try {
                fetch(
                    `https://api.open-meteo.com/v1/forecast?latitude=${coordinates.latitude}&longitude=${coordinates.longitude}&hourly=temperature_2m&forecast_days=1`
                )
                    .then((response) => response.json())
                    .then((data) => setWeatherData(data));
            } catch (error) {
                console.error(error);
            }
        }
    }, [coordinates]);

    return (
        <>
            <div className="container">
                <SearchBar onSearch={handleSearch} />
                <WeatherDisplay weatherData={weatherData} searchedLocation={searchedLocation} />
                {showError && <h2 className="error">{showError}</h2>}
            </div>
        </>
    );
};
