<template>
  <div class="top-bar">
    <div class="user-info">
      <span>{{ user.name }}</span>
    </div>
    <button @click="logout">Выход</button>
  </div>
</template>

<script>
export default {
  props: {
    user: {
      type: Object,
      default: () => ({ name: "Аноним" })
    }
  },
  methods: {
    logout() {
      // Здесь должна быть логика для выхода пользователя из системы
      // Например, можно вызвать метод API для выхода и затем перенаправить на страницу входа
      console.log('Пользователь вышел из системы');
      // this.$router.push('/login');
    }
  }
}
</script>

<style>
.top-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background-color: #f3f3f3;
}

.user-info {
  /* Стили для отображения информации о пользователе */
}

button {
  padding: 5px 15px;
  cursor: pointer;
}
</style>