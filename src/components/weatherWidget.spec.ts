import { describe, it, expect } from 'vitest';
import { render, getByText, screen, waitFor,fireEvent } from '@testing-library/vue';
import userEvent from '@testing-library/user-event';
import WeatherWidget from './WeatherWidget.vue';
import { ref } from 'vue';

// Define the mock data for the WeatherWidget component
const mockWeatherData = {
  temperature: '30°C',
  condition: 'Sunny',
  summary: 'A beautiful sunny day in Miami',
  icon: '☀️'
};

const TestParentComponent = {
  components: {
    WeatherWidget,
  },
  // Pass the mockWeatherData as props to the WeatherWidget
  template: '<WeatherWidget :summary="summary" :temperature="temperature" :condition="condition" :icon="icon" />',
  setup() {
    // Create refs to hold the props
    const temperature = ref(mockWeatherData.temperature);
    const condition = ref(mockWeatherData.condition);
    const summary = ref(mockWeatherData.summary);

    return {
      temperature,
      condition,
      summary,
    };
  },
};

describe('Weather Component', () => {
  describe('Displaying the correct data', () => {
    it('should display the data that gets passed in by the parent in the WeatherWidget', async () => {
      await render(TestParentComponent);
      const temperatureElement = await screen.getByText(mockWeatherData.temperature);
      const conditionElement = await screen.getByText(mockWeatherData.condition);
      const summaryElement = await screen.getByText(mockWeatherData.summary);
      
      expect(temperatureElement).toBeTruthy();
      expect(conditionElement).toBeTruthy();
      expect(summaryElement).toBeTruthy();
    });
  });
  
  describe('Updating the Data based on the dropdown', () => {
    it('should update the current city when dropdown value changes to New York', async () => {
      await render(TestParentComponent);
      screen.logTestingPlaygroundURL();
      
      // Select new city
      const select = screen.getByRole('combobox');
      userEvent.selectOptions(select, 'New York');
      
      // Wait for event to trigger and assert
      await waitFor(() => {
        const header = screen.getByRole('heading', { name: /new york/i })
        expect(header).toBeTruthy();
      });
    });
    it('should update the current city when dropdown value changes to LA', async () => {
      await render(TestParentComponent);
      
      // Select new city
      const select = screen.getByRole('combobox');
      userEvent.selectOptions(select, 'Los Angeles');
      
      // Wait for event to trigger and assert
      await waitFor(() => {
        const header = screen.getByRole('heading', { name: /los angeles/i })
        expect(header).toBeTruthy();
      });
    });
  });
});