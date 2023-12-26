<template>
  <div class="login-container">
    <h1>Вход в систему</h1>
    <form @submit.prevent="login">
      <div class="form-group">
        <label for="name">Имя пользователя:</label>
        <input type="text" id="username" v-model="credentials.name" required>
      </div>
      <div class="form-group">
        <label for="password">Пароль:</label>
        <input type="password" id="password" v-model="credentials.password" required>
      </div>
      <div class="form-group">
        <button type="submit">Войти</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      credentials: {
        name: '',
        password: ''
      }
    };
  },
  methods: {
    login() {
      console.log('Login with:', this.credentials);
      this.authenticateUser();
      this.redirectToHome();
      this.$emit('login-success');
    },
    async authenticateUser() {
      const apiUrl = 'http://localhost:8000/api/login';
      const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(this.credentials)
      };

      try {
        const response = await fetch(apiUrl, options);
        const data = await response.json();

        console.log('Authentication successful', data);
        localStorage.setItem('auth-token', data.token);
      } catch (error) {
        console.error('Authentication error', error);
      }
    },

    redirectToHome() {
      this.$router.push('/');
    }
  }
}
</script>

<style>
/* Add your styles here */
.login-container {
  max-width: 300px;
  margin: auto;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0,0,0,0.1);
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
}

.form-group input[type="text"],
.form-group input[type="password"] {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.form-group button[type="submit"] {
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  border: none;
  border-radius: 4px;
  color: white;
  cursor: pointer;
}

.form-group button[type="submit"]:hover {
  background-color: #0056b3;
}
</style>