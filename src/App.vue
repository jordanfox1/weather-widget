<script setup lang="ts">
import WeatherWidget from './components/WeatherWidget.vue';
import { ref, onMounted } from 'vue';
import { getWeatherDataForCity } from './API/utils';

const dataLoaded = ref(false);
const temperature = ref('');
const condition = ref('');
const summary = ref('');

onMounted(async () => {
    const { temperature: temp, condition: cond, summary: sum } = await getWeatherDataForCity('Miami');
    temperature.value = temp;
    condition.value = cond;
    summary.value = sum;
    dataLoaded.value = true;
});
</script>

<template>
  <div>
    <WeatherWidget v-if="dataLoaded" :summary="summary" :temperature="temperature" :condition="condition" />
    <div v-else>Loading...</div>
  </div>
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
