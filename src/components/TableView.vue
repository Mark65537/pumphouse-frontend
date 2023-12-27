<template>
  <div class="table-container">

    <!-- <div v-if="loaded"> -->
      

      <!-- Титульник таблицы -->
      <h1 v-if="tableTitle" class="table-title">{{ tableTitle }}</h1>

      <!-- Кнопки создать и удалить -->
      <div v-if="isEditable" class="table-actions">
        <button class="create-button" @click="createRow">+Создать</button>
        <button class="delete-button" @click="deleteSelectedRows">-Удалить</button>
      </div>

      <!-- Таблица с данными -->
      <table class="rounded-table">

        <!-- Заголовки таблицы -->
        <thead>
          <tr>
            <th v-if="isEditable">Выбрать</th>
            <th v-for="header in filteredHeaders" :key="header">{{ header }}</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="row in paginatedRows" :key="row.id">
            
            <td v-if="isEditable">
              <!-- Checkbox для выбора строк для удаления -->
              <input type="checkbox" v-model="selectedRows" :value="row.id" />
            </td>

            <td v-for="(key, index) in filteredRowKeys(row)" :key="key">
              <!-- Разрешить редактирование, только если это не первый столбец -->
              <div v-if="isEditable">
                <input 
                  v-if="index !== 0 && isEditingCell(row.id, key)"  
                  type="text" 
                  v-model="editingRow[row.id][key]" 
                />
                <span 
                  v-else @dblclick="index !== 0
                                    ? activateСellEdit(row.id, key) : null" 
                  :class="{
                      disabled: currentlyEditingRowNum !== null && 
                      currentlyEditingRowNum !== row.id
                    }"
                >
                    
                  {{ row[key] }}
                </span>
              </div>
              <span v-else> {{ row[key] }} </span>

            </td>
            
            <!-- Кнопки для редактирования -->
            <td v-if="currentlyEditingRowNum">
              <button v-if="isRowBeingEdited(row.id)" @click="saveEdits(row.id)">Сохранить</button>
              <button v-if="isRowBeingEdited(row.id)" @click="cancelEdit(row.id)">Отменить</button>
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

    headers: Array,
    rows: {
      type: Array,
      default: () => [] // Теперь rows по умолчанию - пустой массив
    },
    isActionButtonsVisible: {
      type: Boolean,
      default: false
    },
    isEditable: {
      type: Boolean,
      default: false
    },
  },
  
  data() {
    return {
      currentPage: 1,
      rowsPerPage: 5,
      rowsPerPageOptions: [5, 10, 50, 100],

      tableRows: this.rows,
      editingRow: {}, // Словарь для отслеживания изменений
      currentlyEditingRowNum: null,
      currentlyEditingRowKey: null,
      selectedRows: [],
      isNewRow: false,
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
      // tableRows=this.rows;
      if (!this.rows) {
        // Если rows ещё не определён, возвращаем пустой массив
        return [];
        // return this.tableRows = this.rows
      }
      const start = (this.currentPage - 1) * this.rowsPerPage;
      const end = start + this.rowsPerPage;
      return this.rows.slice(start, end);
    }
  },

  methods: {
    /** Методы для создания и удаления строк */
    createRow() {
      
      const newRow = {
        'id': 11,
        'num' : 1, 
        'fio': "John Doe", 
        'area': 123, 
        'start_date': '2023-01-01', 
      };
      this.$emit('add-row', newRow);
      this.activateСellEdit(newRow.id, Object.keys(newRow)[2]); 
      this.isNewRow = true;
    },
    
    async deleteSelectedRows() {
      if (this.selectedRows.length === 0) {
        alert('Не выбрано ни одной строки для удаления.'); 
        return;
      }

      // Подтверждение удаления
      if (!window.confirm('Вы уверены, что хотите удалить выбранные строки?')) {
        return;
      }
  
      try {
        const deletePromises = this.selectedRows.map(async (rowId) => 
          {
            const response = await fetch(
              `http://localhost:8000/api/residents/${rowId}`, 
              {
                method: 'DELETE',
                headers: {
                  'Content-Type': 'application/json',
                },          
              }
            );

            const data = await response.json();

            if (response.status !== 200) {
              throw new Error(data.message);
            }
          }
        );
  
        await Promise.all(deletePromises);
  
        this.$emit('delete-rows', this.selectedRows);
        this.selectedRows = [];
        } catch (error) {
          console.error('Error sending delete request:', error);
        }
    },

    // Метод для того что бы не выводился id
    filteredRowKeys(row) {
      return Object.keys(row).filter(key => key !== 'id');
    },

    isEditingCell(rowId, key) {
      return this.editingRow[rowId] != null && 
      Object.prototype.hasOwnProperty.call(this.editingRow[rowId], key);
    },
    isRowBeingEdited(rowId) {
      return this.currentlyEditingRowNum === rowId;
    },
    activateСellEdit(rowId, key) {
      if ((this.currentlyEditingRowNum === null || 
              this.currentlyEditingRowNum === rowId) &&
          (this.currentlyEditingRowKey === null || 
              this.currentlyEditingRowKey === key)) { // Если ни одна строка не редактируется или редактируется эта строка
        
        if (!this.editingRow[rowId]) {
          this.editingRow[rowId] = {};
        }

        const row = this.rows.find(row => row.id === rowId);
        if (row) {
          this.editingRow[rowId][key] = row[key];
        } else {
          console.log('Error: Row with ID not found ', row.id);
        }

        this.currentlyEditingRowNum = rowId;
        this.currentlyEditingRowKey = key;

      }
      console.log("enableEdit", rowId, key);
    },

    /** Методы для кнопок редактирования строк */ 
    cancelEdit(rowId) {
      if (this.editingRow[rowId]) {
        delete this.editingRow[rowId];
      }
      this.currentlyEditingRowNum = null;
      this.currentlyEditingRowKey = null;
    },

    async saveEdits(rowId) {
      const updatedRow = this.editingRow[rowId];
      try {
        if (this.isNewRow) {
          await this.saveNewRow(updatedRow);
        } else {
          await this.updateRow(rowId, updatedRow);
          Object.assign(this.rows.find(row => row.id === rowId), updatedRow);
          if (this.editingRow[rowId]) {
            delete this.editingRow[rowId];
          }
        }
      } catch (error) {
        console.error('Ошибка при сохранении:', error);
      }
      this.currentlyEditingRowNum = null;
      this.currentlyEditingRowKey = null;
      this.isNewRow = false;
    },
    async saveNewRow(row) {
      try {
          const response = await fetch('http://localhost:8000/api/residents', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(row),
          });
          if (!response.ok) {
            throw new Error('Failed to create new row');
          }
      } catch (error) {
        console.error('Failed to create new row:', error);
      }
    },
    async updateRow(rowId, updatedRow) {
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

      } catch (error) {
        console.error('Error updating resident:', error);
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
  align-items: center;
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
  border: none;
  color: #E8DEF8;
  margin: 0 2px;
  max-width: 300px;
  /* display: inline-block; */
  background: #5A5A5A;
  text-align: center;
  align-items: center;
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