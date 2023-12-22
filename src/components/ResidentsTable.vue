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
/* Стили для компонента ResidentsTableView */
.pagination-controls {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

.pagination-controls select {
  padding: 5px;
}

.pagination-controls button {
  padding: 5px 10px;
}


.TableView-container {
  display: flex;
  justify-content: flex-end; /* Выравнивание в правой части контейнера */
}

TableView {
  border-collapse: collapse;
  border: 1px solid #ddd; /* Рамка вокруг всей таблицы */
  margin-left: auto; /* Для выравнивания таблицы справа */
}

th, td {
  padding: 8px;
  text-align: left;
  border: 1px solid #ddd; /* Рамки вокруг ячеек */
}

th {
  background-color: #eee;
}

.loading {
  text-align: center;
  padding: 20px;
}

.rounded-TableView {
  border-collapse: separate;
  border-spacing: 0;
  border-radius: 10px; /* Закругление углов таблицы */
  overflow: hidden; /* Скрывает содержимое, выходящее за границы элемента */
}

.rounded-TableView th,
.rounded-TableView td {
  border-bottom: 1px solid #ddd; /* Границы для ячеек */
}

.rounded-TableView th:first-child,
.rounded-TableView td:first-child {
  border-left: 1px solid #ddd; /* Границы для крайнего левого столбца */
}

.rounded-TableView th:last-child,
.rounded-TableView td:last-child {
  border-right: 1px solid #ddd; /* Границы для крайнего правого столбца */
}

.rounded-TableView th {
  border-top: 1px solid #ddd; /* Границы для заголовка таблицы */
}
</style>