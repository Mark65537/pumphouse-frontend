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
      const apiUrl = 'http://localhost:8000/api';
      const headers = { 'Content-Type': 'application/json' };

      try {
        console.log('Effective date: ',this.effectiveDate);
        // Post effectiveDate to the API
        const datePayload = JSON.stringify({ 
          date: this.effectiveDate 
        });

        const dateResponse = await fetch(
          `${apiUrl}/periods`, 
          {
            method: 'POST',
            headers: headers,
            body: datePayload,
          }
        );

        const dateJson = await dateResponse.json();
        const periodId = dateJson.id;

        // Check if date post was successful before posting tariff
        if (dateResponse.ok) {
          console.log('Tarif.period_id: ',periodId, 'tarif: ',this.tariff);
          const tariffPayload = JSON.stringify({
            period_id: periodId,
            amount_rub: this.tariff
          });

          const tariffResponse = await fetch(`${apiUrl}/tarifs`, {
            method: 'POST',
            headers: headers,
            body: tariffPayload,
          });

          await tariffResponse.json();

          console.log(`Тариф обновлен: ${this.tariff} руб за дату: `,
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