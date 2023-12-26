<template>

  <div>
    <TopBar />
  </div>

  <div>
    <CurrentDateArea @date-changed="handleDateChange" :initialDate="currentDate"/>
  </div>

  <div>
    <EnterTarif :effectiveDate="effectiveDate"/>
  </div>

  <div>
    <EnterReadings />
  </div>


  <span>
    <BillTable />
  </span>

  <span>
    <ResidentsTable />    
  </span>

  <span>
    <TarifTable />    
  </span>


</template>

<script>
import TopBar from '../components/TopBar.vue';
import CurrentDateArea from '../components/CurrentDateArea.vue';
import EnterReadings from '../components/EnterReadings.vue';
import EnterTarif from '../components/EnterTarif.vue';
import BillTable from '../components/BillTable.vue';
import ResidentsTable from '../components/ResidentTable.vue';
import TarifTable from '../components/TarifTable.vue';

export default {
  components: {
    TopBar,
    CurrentDateArea,
    EnterReadings,
    EnterTarif,
    BillTable,
    ResidentsTable,
    TarifTable,
  },
  data() {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;

    return {
      effectiveDate: `${year}-${month}`,
      currentDate: formattedDate,
    };
  },
  methods: {    
    handleDateChange(newDate) {
      const date = new Date(newDate);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      this.effectiveDate = `${year}-${month}`;
    }
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