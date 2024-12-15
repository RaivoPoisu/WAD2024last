<template>
    <div>
      <h1>Logi sisse</h1>
      <form @submit.prevent="login">
        <label>Email:</label>
        <input v-model="email" type="email" required />
        <label>Parool:</label>
        <input v-model="password" type="password" required />
        <button type="submit">Logi sisse</button>
      </form>
      <p>Puudub konto? <button @click="$router.push('/signup')">Registreeru</button></p>
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
  h1 {
    color: #333;
  }
  </style>
  