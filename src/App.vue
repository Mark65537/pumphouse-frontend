<template>
  <div>
    <table v-if="loaded">
      <thead>
        <tr>
          <th>ФИО</th>
          <th>Площадь</th>
          <th>Дата Регистрации</th>
          <!-- Другие заголовки таблицы -->
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in items" :key="item.id">
          <td>{{ item.fio }}</td>
          <td>{{ item.area }}</td>
          <td>{{ item.start_date }}</td>
          <!-- Другие данные из объекта item -->
        </tr>
      </tbody>
    </table>
    <div v-else class="loading">Загрузка...</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [],
      loaded: false
    };
  },
  created() {
    this.fetchItems();
  },
  methods: {
    fetchItems() {
      fetch('http://localhost:8000/api/residents')
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          this.items = data;
          this.loaded = true;
        })
        .catch(error => {
          console.error('There was a problem with the fetch operation:', error);
          this.loaded = true;
        });
    }
  }
};
</script>

<style>
.table-container {
  display: flex;
  justify-content: flex-end; /* Выравнивание в правой части контейнера */
}

table {
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
</style>