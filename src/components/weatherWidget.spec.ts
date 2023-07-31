import { describe, it, expect } from 'vitest'
import { render, getByText } from '@testing-library/vue'
import WeatherWidget from './WeatherWidget.vue';


describe('Weather Component', () => {

  describe('displaying the city name', () => {
    it('displays the name of the currently selected city', async () => {
      await render(WeatherWidget);
  
    });
  
    it('displays Miami by default', async () => {
      await render(WeatherWidget);
    });
  })

  describe('displaying the temperature', () => {
    it('displays the correct temperature of the currently selected city', async () => {
      await render(WeatherWidget);
  
    });
  })

  describe('displaying the weather condition', () => {
    it('displays the correct weather image depending on the conditions of the current city', async () => {
      await render(WeatherWidget);
  
    });
  })



});
