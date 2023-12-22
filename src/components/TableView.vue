<template>
  <div class="table-container">

    <!-- <div v-if="loaded"> -->
      <!-- Таблица с данными -->
      <table class="rounded-table">
        <thead>
          <tr>
            <th v-for="header in headers" :key="header">{{ header }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="row in paginatedRows" :key="row.id">
            <td v-for="(value, key) in row" :key="key">{{ value }}</td>
          </tr>
        </tbody>
      </table>

      <!-- Элементы управления пагинацией -->
      <div class="pagination-controls">
        <button @click="prevPage" :disabled="currentPage <= 1">Назад</button>
        <span>Страница {{ currentPage }} из {{ totalPages }}</span>
        <button @click="nextPage" :disabled="currentPage >= totalPages">Вперед</button>
        <span>Строк на Странице:</span>
        <select v-model="rowsPerPage">
          <option v-for="option in rowsPerPageOptions" :key="option" :value="option">
            {{ option }}
          </option>
        </select>
      </div>

    <!-- </div>
    <div v-else class="loading">Загрузка...</div> -->

  </div>
</template>

<script>
export default {
  props: {
    headers: Array,
    rows: {
      type: Array,
      default: () => [] // Теперь rows по умолчанию - пустой массив
    }
  },
  data() {
    return {
      currentPage: 1,
      rowsPerPage: 5,
      rowsPerPageOptions: [5, 10, 50, 100]
    };
  },
  computed: {
    totalPages() {
      return Math.ceil(this.rows.length / this.rowsPerPage);
    },
    paginatedRows() {
      if (!this.rows) {
        // Если rows ещё не определён, возвращаем пустой массив
        return [];
      }
      const start = (this.currentPage - 1) * this.rowsPerPage;
      const end = start + this.rowsPerPage;
      return this.rows.slice(start, end);
    }
  },
  methods: {
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    }
  }
};
</script>

<style>
.rounded-table {
  /* Стили для таблицы с закругленными углами */
}
.pagination-controls {
  /* Стили для элементов управления пагинацией */
}
</style>