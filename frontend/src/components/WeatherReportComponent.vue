<script setup lang="ts">
import {onMounted, ref, watch} from "vue";
import {apiGetWeatherReport} from "../services/weather.service.ts";
import {WeatherReportResponse} from "../interfaces";

const weatherReport = ref({} as WeatherReportResponse);
const {city} = defineProps<{ city: string }>();
const localCity = ref(city);

const handleRequests = async () => {
  const report = await apiGetWeatherReport(city as string) as WeatherReportResponse;
  localCity.value = city;
  if (report.resolvedAddress) {
    localCity.value = report.resolvedAddress
    weatherReport.value = report;
  }
}

onMounted(handleRequests)
watch(() => city, handleRequests);

</script>

<template>
  <div style="max-width: 500px; margin: auto">
    <div>
      <h2>Weather Report for {{ localCity }}</h2>
    </div>
    <hr/>
  </div>
</template>
