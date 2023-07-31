import { describe, it, expect, vi } from 'vitest';
import { processWeatherDataForWeatherWidgetComponent, getWeatherDataForCity, getLatLonValuesForInputCity } from './utils';
import axios from 'axios';

describe('Weather API Utils', () => {
    describe('getWeatherDataForCity', () => {
        it('should call axios get with correct params', async () => {
            const spy = vi.spyOn(axios, 'get');
    
            await getWeatherDataForCity('New York');
            // TODO: remove the hardcoded params from this and mock an ENV file
            expect(spy).toHaveBeenCalledWith(`https://api.openweathermap.org/data/2.5/weather?lat=40.7128&lon=-74.006&appid=9b183e6fa9c718578c431f7b1e2121b8`);
        });
        it('should return the fallback response when the function throws an error', async () => {
            const spy = vi.spyOn(axios, 'get').mockRejectedValue(new Error('Network Error'));
    
            const res = await getWeatherDataForCity('New York');
            expect(res).toEqual({ temperature: '0', condition: 'N/A', summary: 'No description available, please try again later' });
        });
    });
    
    describe('processWeatherDataForWeatherWidgetComponent', () => {
        it('should return default values when response is empty', () => {
            const response = {};
    
            const result = processWeatherDataForWeatherWidgetComponent(response);
    
            expect(result.temperature).toEqual('0');
            expect(result.condition).toEqual('Clear');
            expect(result.summary).toEqual('No description available');
        });
    
        it('should return correct values when response is valid', () => {
            const response = {
                data: {
                    main: {
                        temp: 10
                    },
                    weather: [
                        {
                            main: 'Rain',
                            description: 'Light rain'
                        }
                    ]
                }
            };
    
            const result = processWeatherDataForWeatherWidgetComponent(response);
    
            expect(result.temperature).toEqual('10');
            expect(result.condition).toEqual('Rain');
            expect(result.summary).toEqual('Light rain');
        });
    });
    describe('Mapping the city name to the correct lat/lon values', () => {
        it('should return default values when response is empty', () => {
            const city = '';
            const result = getLatLonValuesForInputCity(city);
            expect(result).toEqual({ lat: 25.761681, lon: -80.191788});
        });
        it('should return correct values based on input city miami', () => {
            const city = 'miami';
            const result = getLatLonValuesForInputCity(city);
            expect(result).toEqual({ lat: 25.761681, lon: -80.191788});
        });
    
        it('should return correct values based on input city LA', () => {
            const city = 'los angeles';
            const result = getLatLonValuesForInputCity(city);
            expect(result).toEqual({ lat: 34.0522, lon: -118.2437 });
        });
        it('should return correct values based on input city NY', () => {
            const city = 'new york';
            const result = getLatLonValuesForInputCity(city);
            expect(result).toEqual({ lat: 40.7128, lon: -74.0060 });
        });
    });
});
