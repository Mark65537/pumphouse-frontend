<template>
  <div>
    <p>Текущая дата: 
    <input type="date" v-model="date" @input="updateDate"></p>
    <!-- <p>Текущая дата: {{ date }}</p> Ипользуеться для отладки-->
  </div>
</template>

<script>
export default {
  props: {
    initialDate: {
      type: String,
    }
  },
  data() {
    return {
      date: this.initialDate
    };
  },

  methods: {
    updateDate() {
      this.$emit('date-changed', this.date);
    }
  }
}
</script>