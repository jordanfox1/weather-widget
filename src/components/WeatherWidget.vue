<script setup lang="ts">
import { ref } from 'vue';

const { summary, temperature, condition } = defineProps<{
  summary: string;
  temperature: string;
  condition: string;
}>();

const currentCity = ref('Miami');

const emit = defineEmits(['cityChange']);
const onCityChange = (event: Event) => {
  const target = event.target as HTMLSelectElement;
  currentCity.value = target.value;
  emit('cityChange', currentCity.value);
};

</script>

<template>
  <section class="widget-container">

    <select v-model="currentCity" @change="onCityChange">
      <option value="New York">New York</option>
      <option value="Miami">Miami</option>
      <option value="Los Angeles">Los Angeles</option>
    </select>

    <h1 class="widget-heading">{{ currentCity }}</h1>
    <p class="widget-summary"> {{ summary }}</p>

    <div class="widget-temp-container">
      <h3>{{ temperature }}</h3><img src="|" alt="|">
    </div>
    <p>Conditions in {{ currentCity }} are:</p>
    <span>{{ condition }}</span>
  </section>
</template>

<style scoped>
/* Add your styles for the WeatherWidget here */
</style>