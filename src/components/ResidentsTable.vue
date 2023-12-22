 <template>
  <div class="TableView-container">
    <!-- Таблица и данные -->
    <!-- <div v-if="loaded"> -->

        <!-- Таблица с данными -->
        <!-- Использование компонента TableView для отображения данных жителей -->
      <TableView :headers="headers" :rows="items" />
    
    <!-- </div>
    <div v-else class="loading">Загрузка...</div> -->
  </div>
</template>

<script>
import TableView from './TableView.vue';

export default {
   components: {
       TableView
   },
   data() {
    return {
        headers: ['#', 'ФИО', 'Площадь', 'Дата регистрации', /* ... другие заголовки ... */],
        items: [],
        loaded: false,
    };
  },

  created() {
    this.fetchItems();
  },
  methods: {

    fetchItems() {
        fetch('http://localhost:8000/api/residents')
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
      this.items = data.map((item, index) => ({
        num: index + 1,
        fio: item.fio,
        area: item.area,
        start_date: item.start_date,
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
  justify-content: flex-end; /* Выравнивание в правой части контейнера */
  margin: 20px 0;
}

.loading {
  text-align: center;
  padding: 20px;
}
</style>