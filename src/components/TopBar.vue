<template>
  <div class="top-bar">
    <div class="user-info">
      <span v-if="isUserLogged === true">{{ userName }}</span>
    </div>
    <button v-if="isUserLogged === false" @click="login">Вход</button>
    <button v-else @click="logout">Выход</button>
  </div>
</template>

<script>


export default {
  data() {
    return {
      userName: "Админ",
      isUserLogged: localStorage.getItem('auth-token') !== null      
    };
  },
  methods: {
    login() {
      this.$router.push({ name: 'Login' });
    },
    logout(){
      localStorage.removeItem('auth-token'); // удаление auth-token из localStorage
      console.log('Пользователь вышел из системы');
      this.$emit('logout');
      this.isUserLogged = false;
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