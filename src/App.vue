<!-- App.vue -->
<template>

  <div>
    <TopBar />
  </div>

  <div>
    <CurrentDateArea />
  </div>

  <div>
    <EnterReadings />
  </div>

  <div>
    <EnterTarif />
  </div>

  <span>
    <BillTable />
  </span>

  <span>
    <ResidentsTable />    
  </span>


</template>

<script>
import TopBar from './components/TopBar.vue';
import CurrentDateArea from './components/CurrentDateArea.vue';
import EnterReadings from './components/EnterReadings.vue';
import EnterTarif from './components/EnterTarif.vue';
import BillTable from './components/BillTable.vue';
import ResidentsTable from './components/ResidentTable.vue';

export default {
  components: {
    TopBar,
    CurrentDateArea,
    EnterReadings,
    EnterTarif,
    BillTable,
    ResidentsTable,
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
}
</style>