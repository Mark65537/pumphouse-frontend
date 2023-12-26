<template>
  <div class="readings-component">
    <div class="readings-input-container">
      <label for="readings">Показания: </label>
      <input type="number" v-model="readings" :min="0" placeholder="Введите показания">
      <span>за {{ prevMonthAndYear }}</span>
    </div>
    <button @click="submitReadings">Передать показания</button>
  </div>
</template>

<script>
export default {
  props: {
    prevMonthAndYear: String,
  },
  data() {
    return {
      defaultReadings: 1,
      readings: 1,
    };
  },

  // computed: {
  //   prevMonthAndYear() {
  //     const now = new Date();
  //     now.setMonth(now.getMonth() - 1);
  //     const month = now.toLocaleString('default', { month: 'long' });
  //     const year = now.getFullYear();
  //     return `${month} ${year}`;
  //   }
  // },
  
  methods: {
    async submitReadings() {
      if (this.readings.length === 0) {
        alert('Показания не введены');
        return;
      }

      // Подтверждение удаления
      if (!window.confirm('При передачи показаний вы не сможете их изменить. Вы уверены, что хотите передать показания?')) {
        return;
      }

      try {
        const response = await this.postReadings();
        await this.handleResponse(response);
      } catch (error) {
        console.error(error);
      }
      this.resetReadings();
    },  
    async postReadings() {
      return fetch(
        'http://localhost:8000/api/bills', 
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ amount_volume: this.readings })
        }
      );
    },
    async handleResponse(response) {
      if (response.ok) {
        alert('Показания переданы');
      } else if (response.status === 404) {
        const data = await response.json();
        alert(data.message);
      } else {
        throw new Error('Ошибка при выполнении запроса');
      }
    },
    resetReadings() {
      this.readings = this.defaultReadings;
    }
  }
}
</script>

<style>
/* Add your styles here */
.readings-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh; /* Use the full height of the viewport */
  padding: 20px; /* Provide some padding around the contents */
}

.readings-input-container {
  align-items: center;
  gap: 10px; /* Add some space between the input and the span */
  margin-bottom: 10px; /* Add space above the button */
}

.readings-container input, .readings-container button {
  padding: 10px;
  font-size: 1rem;
}

.readings-component span {
  margin-left: px;
}

.readings-container button {
  cursor: pointer;
}
</style>