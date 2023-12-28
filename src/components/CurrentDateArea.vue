<template>
  <div>
    <p>Текущая дата: 
    <input v-if="isEditableDate" type="date" v-model="date" @input="updateDate"> <!-- закоментируй если нужено изменять текущую дату -->
    <label v-else>{{ date }}</label>  <!-- расскоментируй если нужен просто вывод даты -->
    </p>

  </div>
</template>

<script>
export default {
  props: {
    initialDate: {
      type: String,
    },
    isEditableDate: {
      type: Boolean,
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