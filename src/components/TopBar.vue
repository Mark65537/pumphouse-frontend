<template>
  <div class="top-bar">
    <div class="user-info">
      <span v-if="userLogged">{{ user.name }}</span>
    </div>
    <button v-if="!userLogged" @click="login">Вход</button>
    <button v-else @click="logout">Выход</button>
  </div>
</template>

<script>


export default {

  props: {
    user: {
      type: Object,
      default: () => ({ 
        name: "Админ", 
        logged: localStorage.getItem('auth-token') !== null
      })
    }
  },
  data() {
    return {
      userLogged: {
        type: Boolean,
        default: this.user.logged
      } 
    };
  },
  methods: {
    login() {
      this.$router.push({ name: 'Login' });
    },
    logout(){
      localStorage.removeItem('auth-token'); // Remove the auth-token from localStorage
      console.log('Пользователь вышел из системы');

      this.userLogged = false;
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