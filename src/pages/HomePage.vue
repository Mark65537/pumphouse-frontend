<template>
  <div class="home-page">
    <div>
      <TopBar />
    </div>

    <!-- <div> {{ localStorage.getItem('user-name') }} </div> -->

    <div>
      <CurrentDateArea 
        @date-changed="handleDateChange" 
        :initialDate="currentDate"
      />
    </div>

    <div>
      <EnterTarif :effectiveDate="effectiveDate"/>
    </div>

    <div>
      <EnterReadings :prevMonthAndYear="prevMonthAndYear"/>
    </div>

    <div class = "tables-container">
      <span>
        <BillTable />
      </span>

      <div class = "info-tables-container">
        <span>
          <ResidentsTable />    
        </span>

        <span>
          <TarifTable />    
        </span>
      </div>
    </div>
  </div>


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

    currentDate.setMonth(currentDate.getMonth() - 1);
    const prevMonth = currentDate.toLocaleString('default', { month: 'long' });


    return {
      effectiveDate: `${year}-${month}`,
      currentDate: `${year}-${month}-${day}`,
      prevMonthAndYear: `${prevMonth} ${year}`,
    };
  },
  methods: {    
    handleDateChange(newDate) {
      const date = new Date(newDate);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      date.setMonth(date.getMonth() - 1);
      const prevMonth = date.toLocaleString('default', { month: 'long' });

      this.effectiveDate = `${year}-${month}`;
      this.prevMonthAndYear = `${prevMonth} ${year}`;
    }
  }
};
</script>

<style>

.tables-container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.home-page {
    font-family: 'Roboto', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    min-height: 100vh;
    color: #E6E0E9;
    font-size: 16px;
    background: #2B2930;
}
#app {
  /* font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50; */
}
</style>