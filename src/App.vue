<!-- App.vue -->
<template>

  <div>
    <TopBar />
  </div>

  <div>
    <ResidentsTable />    
  </div>
</template>

<script>
import TopBar from './components/TopBar.vue';
import ResidentsTable from './components/ResidentsTable.vue';

export default {
  components: {
    TopBar,
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