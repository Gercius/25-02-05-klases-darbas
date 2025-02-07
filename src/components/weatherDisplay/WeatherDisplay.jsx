import "./WeatherDisplay.scss";

export const WeatherDisplay = ({ weatherData, searchedLocation }) => {
    const times = weatherData?.hourly.time;
    const temperatures = weatherData?.hourly.temperature_2m;

    // Restructure data
    const combinedData = times?.map((time, index) => {
        time = time.slice(11); // Show only hours
        return { time: time, temperature: temperatures[index] };
    });

    return (
        <div className="temperatures">
            <h3>Dienos temperatūros: {searchedLocation}</h3>
            {combinedData &&
                combinedData?.map((data, index) => (
                    <div className="item" key={index}>
                        <p>Laikas: {data.time}</p>
                        <p>Temperatūra: {data.temperature} °C</p>
                    </div>
                ))}
        </div>
    );
};
