<template>
    <div>
      <h1>Lisa uus postitus</h1>
      <form @submit.prevent="addPost">
        <label>Postituse Sisu:</label>
        <input v-model="body" type="text" placeholder="Sisesta sisu" required />
  
        <label>Pildi URL:</label>
        <input v-model="image_url" type="text" placeholder="Sisesta pildi URL" required />
  
        <button type="submit">Lisa Postitus</button>
      </form>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        body: '',
        image_url: ''
      };
    },
    methods: {
      async addPost() {
        try {
          await axios.post('http://localhost:3000/posts', {
            body: this.body,
            image_url: this.image_url
          });
          alert('Postitus lisatud!');
          this.body = '';
          this.image_url = '';
        } catch (error) {
          console.error('Postituse lisamine ebaõnnestus', error);
        }
      }
    }
  };
  </script>
  