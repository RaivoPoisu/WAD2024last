<template>
  <div class="signup-wrapper">
    <div class="signup-container">
      <h2>Registreeru</h2>
      <form @submit.prevent="signup">
        <div class="form-group">
          <label for="email">Email:</label>
          <input v-model="email" type="email" id="email" required />
        </div>
        <div class="form-group">
          <label for="password">Parool:</label>
          <input v-model="password" type="password" id="password" required />
        </div>
        <div class="button-group">
          <button type="submit">Registreeru</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {email: '', password: ''};
  },
  methods: {
    async signup() {
      try {
        await axios.post('http://localhost:3000/signup', {
          email: this.email,
          password: this.password,
        });
        alert('Registreerumine edukas!');
        this.email = '';
        this.password = '';
      } catch (error) {
        console.error(error);
        alert('Registreerumine ebaõnnestus!');
      }
    },
  },
};
</script>

<style scoped>
.signup-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 70vh;
  background-color: #f7f7f7;
}

.signup-container {
  background-color: #e98181;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  width: 350px;
  text-align: center;
}

h2 {
  margin-bottom: 1.5rem;
  color: #333;
}

.form-group {
  margin-bottom: 1.5rem;
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
</style>