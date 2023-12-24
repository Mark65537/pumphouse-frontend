<template>
  <div class="container">
    <div class="input-group">
      <label for="tariff">Тариф:</label>
      <input type="number" id="tariff" min = "0" v-model="tariff" placeholder="Введите тариф">
    </div>
    
    <div class="input-group">
      <label for="month-year">За дату:</label>
      <input type="month" id="month-year" v-model="effectiveDate" :min="minDate">
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
      minDate: getCurrentMonthAndYear()
    };
  },
  methods: {
    async updateTariff() {
      try {
        // Post effectiveDate to the API
        const dateResponse = await fetch(
          'http://localhost:8000/api/periods', 
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ date: this.effectiveDate }),
          }
        );

        await dateResponse.json();

        // Check if date post was successful before posting tariff
        if (dateResponse.ok) {
          // Post tariff to the API
          const tariffResponse = await fetch(
            'http://localhost:8000/api/tariff',
            {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ tariff: this.tariff }),
            }
          );
          
          await tariffResponse.json();

          console.log(`Тариф обновлен: ${this.tariff} за дату: `,
                      `${this.effectiveDate}`);
        } else {
          console.error('Ошибка при обновлении даты');
        }    
      } catch (error) {
        console.error('Ошибка при обновлении тарифа:', error);
      }
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