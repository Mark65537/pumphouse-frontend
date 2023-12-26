<template>
  <div class="top-bar">
    <div class="user-info">
      <span v-if="user.logged">{{ user.name }}</span>
    </div>
    <button v-if="!user.logged" @click="login">Вход</button>
    <button v-else @click="logout">Выход</button>
  </div>
</template>

<script>
import { useRouter } from 'vue-router';

export default {


  props: {
    user: {
      type: Object,
      default: () => ({ name: "Админ", logged: false})
    }
  },

  setup() {
    const router = useRouter();

    const login = () => {
      router.push({ name: 'Login' });
    };
    const logout = () => {
      console.log('Пользователь вышел из системы');
      // Here you can add logic for logging out the user, e.g., clearing tokens
      // After logout, you might want to redirect to the login page or home page
    };

    return {
      login,
      logout
    };
  },
  methods: {
    // login() {
    //   // Используйте Vue Router для перехода на страницу входа
    //   const router = useRouter();
    
    //   router.push({ name: 'Login' });
    
    //   // this.$router.push('/login');
    // },
    handleLoginSuccess() {
      // Emit an event to the parent component to update the `logged` status.
      this.$emit('update:user', {
        ...this.user,
        logged: true,
      });
    },
    
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