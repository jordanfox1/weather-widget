import axios from 'axios';
import ProcessedWeatherData from '../models/ProcessedWeatherData.interface';

export async function getWeatherDataForCity(cityName: string): Promise<ProcessedWeatherData> {
    try {
        const { lat, lon } = getLatLonValuesForInputCity(cityName);

        // WARNING: This is not what I normally do. I have just chosen to expose my API key to make it easier for me to implement this example and will delete this key later.
        const rawWeatherApiResponseData = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=YOUR_API_KEY`);

        const processedWeatherData = processWeatherDataForWeatherWidgetComponent(rawWeatherApiResponseData);
        return processedWeatherData;
    } catch (error) {
        console.error(error);
        return { temperature: '0', condition: 'N/A', summary: 'No description available, please try again later' };
    }
};

// I didn't think it was safe to guarantee the type of the response, so I left it as `any` and added fallbacks for the data points.
export function processWeatherDataForWeatherWidgetComponent(weatherApiResponseData: any): ProcessedWeatherData {
    // I just convert temperature to a string to make life slightly easier when not doing numeric operations
    const temperature = weatherApiResponseData?.data?.main?.temp.toString() || '0';
    const condition = weatherApiResponseData?.data?.weather?.[0]?.main || 'Clear';
    const summary = weatherApiResponseData?.data?.weather?.[0]?.description || 'No description available';

    return { temperature, condition, summary };
}

export function getLatLonValuesForInputCity(cityName: string) {
    const cities: { [key: string]: { lat: number; lon: number } } = {
        'new york': { lat: 40.7128, lon: -74.0060 },
        'miami': { lat: 25.761681, lon: -80.191788 },
        'los angeles': { lat: 34.0522, lon: -118.2437 }
    };

    const normalizedCityName = cityName.toLowerCase();
    const defaultCity = 'miami';
    const cityData = cities[normalizedCityName] || cities[defaultCity];
    return cityData;
}


export function getIconForWeatherCondition(condition: string): string {
    //TODO: this should be improved by looking at the possible API responses and mapping the actual values to icons instead of guessing what the values may be.
    switch (condition) {
        case 'Clear':
            return '☀️'; 
        case 'Fine':
            return '☀️'; 
        case 'Sunny':
            return '☀️'; 
        case 'Clouds':
            return '☁️';
        case 'Cloudy':
            return '☁️';
        case 'Rain':
            return '🌧';
        case 'Rainy':
            return '🌧';
        case 'Storms':
            return '🌧';
        case 'Snow':
            return '❄️';
        default:
            return '☁️';
    }
}