<template>
  <div class="readings-component">
    <div class="readings-input-container">
      <label for="readings">Показания: </label>
      <input type="text" v-model="readings" placeholder="Введите показания">
      <span>за {{ currentMonthAndYear }}</span>
    </div>
    <button @click="submitReadings">Передать показания</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      readings: ''
    };
  },

  computed: {
    currentMonthAndYear() {
      const now = new Date();
      const month = now.toLocaleString('default', { month: 'long' });
      const year = now.getFullYear();
      return `${month} ${year}`;
    }
  },
  
  methods: {
    submitReadings() {
      // You could use this method to send the readings to a server or process them
      console.log('Submitted readings:', this.readings);
      
      // After submitting, you might want to clear the field
      this.readings = '';
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