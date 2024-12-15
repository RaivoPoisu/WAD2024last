<template>
  <div class="login-wrapper">
    <div class="login-container">
      <h2>Logi sisse</h2>
      <form @submit.prevent="login">
        <div class="form-group">
          <label for="email">Email:</label>
          <input v-model="email" type="email" id="email" required />
        </div>
        <div class="form-group">
          <label for="password">Parool:</label>
          <input v-model="password" type="password" id="password" required />
        </div>
        <div class="button-group">
          <button type="submit">Logi sisse</button>
        </div>
      </form>
      <p class="signup-link">Puudub konto? <button @click="$router.push('/signup')">Registreeru</button></p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      email: '',
      password: '',
    };
  },
  methods: {
    async login() {
      try {
        const response = await axios.post('http://localhost:3000/login', {
          email: this.email,
          password: this.password,
        });

        alert('Sisselogimine edukas!');
        localStorage.setItem('token', response.data.token); // Salvesta token lokaalselt

        // Suuna kasutaja Home.vue lehele
        this.$router.push('/home');
      } catch (error) {
        console.error('Sisselogimine ebaõnnestus:', error);
        alert('Vale email või parool!');
      }
    },
  },
};
</script>

<style scoped>
.login-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f7f7f7;
}

.login-container {
  background-color: #e98181;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  width: 300px;
}

h2 {
  text-align: center;
  margin-bottom: 1.5rem;
  color: #333;
}

.form-group {
  margin-bottom: 1rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: bold;
  color: #333;
}

input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-sizing: border-box;
  font-size: 1rem;
}

button {
  width: 100%;
  padding: 0.75rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}

.signup-link {
  text-align: center;
  margin-top: 1rem;
}

.signup-link button {
  background-color: transparent;
  color: #007bff;
  border: none;
  cursor: pointer;
}

.signup-link button:hover {
  text-decoration: underline;
}
</style>