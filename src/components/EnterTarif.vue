<template>
  <div class="container">
    <div class="input-group">
      <label for="tariff">Тариф:</label>
      <input type="number" id="tariff" min = "0" v-model="tariff" placeholder="Введите тариф">
    </div>
    
    <div class="input-group">
      <label for="month-year">За дату:</label>
      <input type="month" id="month-year" v-model="effectiveDate" :min="effectiveDate">
    </div>

    <button @click="updateTariff">Обновить тариф</button>
  </div>
</template>

<script>
export default {
  data() {
    // Helper function to format the current date as YYYY-MM
    function getCurrentMonthAndYear() {
      const now = new Date();
      const year = now.getFullYear();
      const month = (now.getMonth() + 1).toString().padStart(2, '0');
      return `${year}-${month}`;
    }

    return {
      tariff: 0,
      effectiveDate: getCurrentMonthAndYear(),
    };
  },
  methods: {
    updateTariff() {
      console.log('Тариф обновлен:', this.tariff, ' за дату:', this.effectiveDate);
      // Implement the logic to handle tariff update
    }
  }
}
</script>

<style>
.container {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 10px;
  margin-top: 10px;
  gap: 20px; /* Add space between the elements */
}

.input-group {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.input-group label {
  margin-right: 5px;
}

.container input, .container button {
  font-size: 1rem;
}

.container button {
  cursor: pointer;
}
</style>