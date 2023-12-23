<!-- App.vue -->
<template>

  <div>
    <TopBar />
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
import BillTable from './components/BillTable.vue';
import ResidentsTable from './components/ResidentTable.vue';

export default {
  components: {
    TopBar,
    BillTable,
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
}
</style>