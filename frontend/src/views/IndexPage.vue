<script setup lang="ts">
import {onMounted, ref, watch} from "vue";
import {apiGetCitySuggestions} from "../services/weather.service.ts";
import WeatherReportComponent from "../components/WeatherReportComponent.vue";

const form = ref({city: '', cityCode: ''});
const citySuggestions = ref([] as string[]);
const selectedCity = ref('');

const selectCity = (city: string) => {
  selectedCity.value = city;
}

const debounceHandler = ref();

watch(() => form.value.city, (value) => {
  if (debounceHandler.value) clearTimeout(debounceHandler.value);
  debounceHandler.value = setTimeout(async () => {
    citySuggestions.value = await apiGetCitySuggestions(value) as string[];
  }, 1000);
});

onMounted(async () => {
  citySuggestions.value = await apiGetCitySuggestions('') as string[];
});

</script>

<template>
  <div style="max-width: 500px; margin: auto">
    <div>
      <h2>Weather Web Service Wrapper App</h2>
    </div>
    <hr/>
    <table border="1" width="100%" cellpadding="10" cellspacing="1">
      <tbody>
      <tr>
        <th>Enter City</th>
      </tr>
      <tr>
        <td>
          <input v-model="form.city" style="width: 90%; height: 25px; text-align: center" required/>
        </td>
      </tr>
      <tr>
        <td>
          <button v-for="(cs,i) in citySuggestions" :key="i" @click="selectCity(cs)">{{ cs }}</button>
        </td>
      </tr>
      </tbody>
    </table>
  </div>

  <weather-report-component :city="selectedCity" v-if="selectedCity"/>
</template>
