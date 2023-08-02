<script setup lang="ts">
import WeatherWidget from './components/WeatherWidget.vue';
import { ref, onMounted } from 'vue';
import { getWeatherDataForCity, getIconForWeatherCondition } from './API/utils';

const dataLoaded = ref(false);
const temperature = ref('');
const condition = ref('');
const summary = ref('');
const icon = ref('');
const currentCity = ref('Miami');

onMounted(async () => {
  const { temperature: temp, condition: cond, summary: sum } = await getWeatherDataForCity(currentCity.value);
  temperature.value = temp;
  condition.value = cond;
  summary.value = sum;
  dataLoaded.value = true;
  icon.value = getIconForWeatherCondition(condition.value);
});


const onCityChange = async (newCity: string) => {
  currentCity.value = newCity;

  const weatherData = await getWeatherDataForCity(newCity);

  temperature.value = weatherData.temperature;
  condition.value = weatherData.condition;
  summary.value = weatherData.summary;
  icon.value = getIconForWeatherCondition(condition.value);
}
</script>

<template>
  <WeatherWidget v-if="dataLoaded" @cityChange="onCityChange" :summary="summary" :temperature="temperature"
    :condition="condition" :icon="icon" />
  <div v-else>Loading...</div>
</template>

<style scoped>
/* Styles for the logos, same as before */
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
