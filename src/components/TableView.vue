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
/* Стили для компонента Pagination-controls */
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

/* Стили для компонента Table */
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


/* Стили для компонента Rounded-table */
.rounded-table {
  border-collapse: separate;
  border-spacing: 0;
  border-radius: 10px; /* Закругление углов таблицы */
  overflow: hidden; /* Скрывает содержимое, выходящее за границы элемента */
}

.rounded-table th,
.rounded-table td {
  border-bottom: 1px solid #ddd; /* Границы для ячеек */
}

.rounded-table th:first-child,
.rounded-table td:first-child {
  border-left: 1px solid #ddd; /* Границы для крайнего левого столбца */
}

.rounded-table th:last-child,
.rounded-table td:last-child {
  border-right: 1px solid #ddd; /* Границы для крайнего правого столбца */
}

.rounded-table th {
  border-top: 1px solid #ddd; /* Границы для заголовка таблицы */
}

</style>