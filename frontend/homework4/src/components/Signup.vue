<template>
    <div>
      <h1>Registreeru</h1>
      <form @submit.prevent="signup">
        <label>Email:</label>
        <input v-model="email" type="email" required />
        <label>Parool:</label>
        <input v-model="password" type="password" required />
        <button type="submit">Registreeru</button>
      </form>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return { email: '', password: '' };
    },
    methods: {
      async signup() {
        try {
          await axios.post('http://localhost:3000/signup', {
            email: this.email,
            password: this.password
          });
          alert('Registreerumine edukas!');
          this.email = '';
          this.password = '';
        } catch (error) {
          console.error(error);
          alert('Registreerumine ebaõnnestus!');
        }
      }
    }
  };
  </script>
  