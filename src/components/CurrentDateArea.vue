<template>
  <div>
    <p>Текущая дата: 
    <!-- {{ date }} --> <!-- расскоментируй если нужен просто вывод даты -->
    <input type="date" v-model="date" @input="updateDate"> <!-- закоментируй если нужено изменять текущую дату -->
    </p>

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