<template>
    <div class="add-post">
      <h2>Add Post</h2>
      <form @submit.prevent="addPost">
        <div>
          <label>Body:</label>
          <input v-model="body" placeholder="Sisesta postituse sisu" />
        </div>
        <div>
          <label>Image URL:</label>
          <input v-model="image_url" placeholder="Sisesta pildi URL" />
        </div>
        <button type="submit">Add</button>
      </form>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        body: '',
        image_url: '',
      };
    },
    methods: {
      async addPost() {
        try {
          await axios.post('http://localhost:3000/posts', {
            body: this.body,
            image_url: this.image_url,
          });
          alert('Postitus edukalt lisatud!');
          this.$router.push('/');
        } catch (error) {
          console.error('Postituse lisamine ebaõnnestus:', error);
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .add-post {
    text-align: center;
  }
  input {
    margin: 10px;
    padding: 5px;
  }
  button {
    margin: 10px;
    padding: 5px 10px;
  }
  </style>
  