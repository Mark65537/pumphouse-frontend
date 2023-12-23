<template>
  <div>
    <p>Текущая дата: 
    <input type="date" v-model="date" @input="updateDate"></p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // Initialize date with the current date
      date: new Date().toISOString().slice(0, 10)
    };
  },
  computed: {
    // Format the date to a more readable format if needed
    formattedDate() {
      return new Date(this.date).toLocaleDateString();
    }
  },
  methods: {
    updateDate(event) {
      // Emit an event if you need to notify the parent component of the date change
      this.$emit('date-changed', event.target.value);
    }
  }
}
</script>