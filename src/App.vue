<!-- App.vue -->
<template>
 
  <div>
    <ResidentsTable />
    <!-- Другой контент приложения -->
  </div>
</template>

<script>
import ResidentsTable from './components/ResidentsTable.vue';

export default {
  components: {
    ResidentsTable
  }
};
</script>

<style>
/* Стили для App.vue */
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>