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

    return {
      login,
    };
  },
  methods: {
    // login() {
    //   // Используйте Vue Router для перехода на страницу входа
    //   const router = useRouter();
    
    //   router.push({ name: 'Login' });
    
    //   // this.$router.push('/login');
    // },
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