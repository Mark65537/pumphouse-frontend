 <template>
  <div class="TableView-container">
    <!-- Таблица и данные -->
    <!-- <div v-if="loaded"> -->
        
      <!-- Таблица с данными -->
      <!-- Использование компонента TableView для отображения данных дачников -->
      <TableView 
        :tableTitle="tableTitle" 
        :isEditable="isEditable" 
        :headers="headers" 
        :rows="items"
        @add-row="handleAddRow"
        @delete-rows="handleDeleteRows"      
      />
    
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
        tableTitle: 'Список дачников',
        isEditable: true,
        headers: ['#', 'ФИО', 'Площадь', 'Дата регистрации', /* ... другие заголовки ... */],
        items: [],
        loaded: false,
    };
  },

  created() {
    this.fetchItems();
  },
  methods: {
    handleAddRow(newRow) {
      try{
        var request = new XMLHttpRequest();
        request.open('GET', 'http://localhost:8000/api/residents', false);  // `false` делает запрос синхронным
        request.send(null);

        if (request.status === 200) {
          // console.log(request.json());
          const data = JSON.parse(request.responseText);
          const maxId = data[data.length - 1].id;
          newRow.id = maxId + 1;
          this.items = [newRow, ...this.items];    
        }
          // fetch('http://localhost:8000/api/residents')
          //   .then(response => this.validateResponse(response))
          //   .then(data => this.processItems(data))
          //   .catch(error => this.handleFetchError(error));
        console.log('handleAddRow: ', newRow);
      } catch (error) {
        console.error('Error sending add request:', error);
      }
    },
    handleDeleteRows(idsToDelete) {
      this.items = this.items.filter(row => !idsToDelete.includes(row.id));
    },
    fetchItems() {
        fetch('http://localhost:8000/api/residents')
            .then(response => this.validateResponse(response))
            .then(data => this.processItems(data))
            .catch(error => this.handleFetchError(error));
    },

    validateResponse(response) {
      console.log('handleAddRow response: ', response.status);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
    },
    processItems(data) {
      this.items = data.map((item, index) => ({
        id: item.id,
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

.loading {
  text-align: center;
  padding: 20px;
}
</style>