<script setup lang="ts">
import { ref } from 'vue';

const { summary, temperature, condition } = defineProps<{
  summary: string;
  temperature: string;
  condition: string;
  icon: string;
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

    <div class="widget-dropdown">
      <select v-model="currentCity" @change="onCityChange">
        <option value="New York">New York</option>
        <option value="Miami">Miami</option>
        <option value="Los Angeles">Los Angeles</option>
      </select>
    </div>

    <h1 class="widget-heading">{{ currentCity }}</h1>
    <h4 class="widget-summary"> {{ summary }}</h4>

    <section class="widget-temp-circle-parent-container">
      <div class="widget-temp-container">
        <h2><b>{{ temperature }}°</b></h2>
        <i>{{ icon }}</i>
      </div>
    </section>

    <p>Conditions in <b>{{ currentCity }}</b> are:</p>
    <span>{{ condition }}</span>
  </section>
</template>

<style scoped>
.widget-container {
  display: flex;
  flex-direction: column;
  justify-items: center;
  width: 50vw;
  border-radius: 5%;
  border: 3px solid #ccc;
  background-image: url('./background.png');
}

.widget-temp-circle-parent-container{
  display: flex;
  justify-content: center;
}

.widget-temp-container {
  height: 50%;
  width: 50%;
  border: 3px solid #213547ab;
  border-radius: 50%;
}

i{
  font-size: 3rem;
}

.widget-dropdown {
  height: 20%;
  width: 20%;
  padding: 5px;
  border-radius: 8px;
}

@media (min-width: 965px) {
  .widget-temp-container {
    border: none;
  }
}
</style>