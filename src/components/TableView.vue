<template>
  <div class="table-container">

    <!-- <div v-if="loaded"> -->
      

      <!-- Заголовок таблицы -->
      <h1 v-if="tableTitle" class="table-title">{{ tableTitle }}</h1>

      <!-- Действия над таблицей -->
      <div v-if="isActionButtonsVisible" class="table-actions">
        <button class="create-button" @click="createRow">+Создать</button>
        <button class="delete-button" @click="deleteSelectedRows">-Удалить</button>
      </div>

      <!-- Таблица с данными -->
      <table class="rounded-table">

        <thead>
          <tr>
            <th v-if="isActionButtonsVisible">Выбрать</th><!-- New column for checkboxes -->
            <th v-for="header in filteredHeaders" :key="header">{{ header }}</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="row in paginatedRows" :key="row.num">
            
            <td v-if="isActionButtonsVisible">
              <!-- Checkbox for marking a row for deletion -->
              <input type="checkbox" v-model="selectedRows" :value="row.num" />
            </td>

            <td v-for="(key, index) in filteredRowKeys(row)" :key="key">
              <!-- Only allow editing if it's not the first column -->
              <input v-if="index !== 0 && isEditable(row.num, key)" type="text" v-model="edits[row.num][key]" />
              <span v-else @dblclick="index !== 0 ? enableEdit(row.num, key) : null" :class="{disabled: currentlyEditingRowNum !== null && currentlyEditingRowNum !== row.num}">
                {{ row[key] }}
              </span>
            </td>
            
            <td>
              <button v-if="isRowBeingEdited(row.num)" @click="saveEdits(row.num)">Сохранить</button>
              <button v-if="isRowBeingEdited(row.num)" @click="cancelEdit(row.num)">Отменить</button>
            </td>
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
    tableTitle: {
      type: String,
      default: ''
    },

    isActionButtonsVisible: {
      type: Boolean,
      default: false
    },
    headers: Array,
    rows: {
      type: Array,
      default: () => [] // Теперь rows по умолчанию - пустой массив
    },
  },
  
  data() {
    return {
      currentPage: 1,
      rowsPerPage: 5,
      rowsPerPageOptions: [5, 10, 50, 100],

      edits: {}, // Словарь для отслеживания изменений
      currentlyEditingRowNum: null,
      selectedRows: [],
    };
  },
  
  computed: {

    filteredHeaders() {
      return this.headers.filter(header => header !== 'id');
    },

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
    /** Методы для создания и удаления строк */
    createRow() {
      // Логика для создания новой строки
    },
    async deleteSelectedRows() {
      if (this.selectedRows.length === 0) {
        alert('не выбрано ни одной строки для удаления.'); 
        return;
      }

      // Подтверждение удаления
      if (!window.confirm('Вы уверены, что хотите удалить выбранные строки?')) {
        return;
      }
  
      try {
        // Replace 'your-delete-endpoint' with the actual endpoint URL
        // Replace `id` with the actual property that identifies your row if needed
        const response = await fetch('your-delete-endpoint', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ ids: this.selectedRows })
        });
  
        const data = await response.json();
  
        // Assuming the backend returns a success response
        if (data.success) {
          // Remove the deleted rows from the local state
          this.$emit('delete-rows', this.selectedRows);
          this.selectedRows = []; // Clear selection after deletion
        } else {
          console.error('Failed to delete selected rows:', data.message);
        }
      } catch (error) {
        console.error('Error sending delete request:', error);
      }
    },

    filteredRowKeys(row) {
      return Object.keys(row).filter(key => key !== 'id');
    },

    isEditable(rowId, key) {
      return this.edits[rowId] != null && 
      Object.prototype.hasOwnProperty.call(this.edits[rowId], key);
    },
    isRowBeingEdited(rowId) {
      // console.log("isRowBeingEdited", rowId, this.currentlyEditingRowNum);
      return this.currentlyEditingRowNum === rowId;
    },
    enableEdit(rowId, key) {
      if (this.currentlyEditingRowNum === null || 
              this.currentlyEditingRowNum === rowId) { // Если ни одна строка не редактируется или редактируется эта строка
        
        if (!this.edits[rowId]) {
          this.edits[rowId] = {};
        }
        this.edits[rowId][key] = this.rows.find(row => row.num === rowId)[key];

        this.currentlyEditingRowNum = rowId;

      }
      // console.log("enableEdit", rowId, key);
    },

    /** Методы для кнопок редактирования строк */ 
    cancelEdit(rowId) {
      if (this.edits[rowId]) {
        delete this.edits[rowId];
      }
      this.currentlyEditingRowNum = null; // Сброс текущей редактируемой строки
    },
    async saveEdits(rowId) {
      const updatedRow = this.edits[rowId];
      try {
        await this.updateRow(rowId, updatedRow); // Метод для отправки изменений на сервер
        Object.assign(this.rows.find(row => row.num === rowId), updatedRow);
        if (this.edits[rowId]) {
          delete this.edits[rowId];
        }
      } catch (error) {
        console.error('Ошибка при сохранении:', error);
        // Обработка ошибок, возможно показ уведомления
      }
      this.currentlyEditingRowNum = null;
    },
    async updateRow(rowId, updatedRow) {
      // Здесь должен быть код для отправки изменений на сервер
      console.log('Отправка изменений на сервер:', rowId, updatedRow);
      try {
        const response = await fetch(
          `http://localhost:8000/api/residents/${rowId}`,
          {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedRow),
          }
        );

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        console.log('Resident updated successfully:', data);
        // Handle the success scenario, e.g., update the UI or state accordingly
      } catch (error) {
        console.error('Error updating resident:', error);
        // Handle the error scenario
      }
    },

    
    /** Кнопки навигации */
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
/* Кнопки создания и удаления */
.create-button {
  background-color: #4CAF50; /* Зеленый */
  color: white;
  margin: 10px;
}

.delete-button {
  background-color: #F44336; /* Красный */
  color: white;
  /* Дополнительные стили для кнопки */
}


/*  */
.table-title {
  margin-bottom: 10px;
}


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


/* Стили для компонента Disabled */
.disabled {
  color: #a1a1a1; /* светло-серый цвет текста */
  cursor: not-allowed; /* курсор в виде знака запрета */
  opacity: 0.6; /* полупрозрачность */
}


</style>