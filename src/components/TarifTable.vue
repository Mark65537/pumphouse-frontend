<template>
  <div class="TableView-container">
    <!-- Таблица и данные -->
    <!-- <div v-if="loaded"> -->
        
      <!-- Таблица с данными -->
      <!-- Использование компонента TableView для отображения данных дачников -->
      <TableView 
        :tableTitle="tableTitle" 
        :headers="headers" 
        :rows="items"     
      />
    
    <!-- </div>
    <div v-else class="loading">Загрузка...</div> -->
  </div>
</template>

<script>
import TableView from './TableView.vue';

export default {

   components: {
       TableView,
   },

   data() {
    return {
        tableTitle: 'Тарифы',
        headers: [ 'Месяц', 'Год', 'Сумма', /* ... другие заголовки ... */],
        items: [],
        loaded: false,
    };
  },

  created() {
    this.fetchItems();
  },
  methods: {
    fetchItems() {
        fetch('http://localhost:8000/api/tarifs')
            .then(response => this.validateResponse(response))
            .then(data => this.processItems(data))
            .catch(error => this.handleFetchError(error));
    },

    validateResponse(response) {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
    },
    processItems(data) {
      this.items = data.map((item) => ({
        month: item.month,
        year: item.year,
        sum: item.amount_rub,
      }));
      this.loaded = true;
    },
    handleFetchError(error) {
      console.error('Fetch operation error:', error);
      this.loaded = true;
    },
  }
};
</script>

<style>
 .TableView-container {
  display: flex;
  justify-content: flex-start; /* Выравнивание в правой части контейнера */
} 

.loading {
  text-align: center;
  padding: 20px;
}
</style>
