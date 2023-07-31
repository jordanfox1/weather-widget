import { describe, it, expect } from 'vitest'
import { render, getByText } from '@testing-library/vue'
import WeatherWidget from './WeatherWidget.vue';


describe('Weather Component', () => {

  describe('displaying the city name', () => {
    it('displays the name of the currently selected city', async () => {
      await render(WeatherWidget);

    });

  });
});
