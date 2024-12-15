<template>
    <div class="post">
      <!-- Postituse pealkiri -->
      <h2>{{ post.body }}</h2>
  
      <!-- Pilt kuvatakse ainult, kui post.image_url on olemas -->
      <img v-if="post.image_url" :src="post.image_url" alt="Post Image" />
  
      <!-- Vorm postituse uuendamiseks -->
      <div class="update-form">
        <label for="body">Body:</label>
        <input v-model="updatedBody" id="body" placeholder="Uuenda postitust" />
      </div>
  
      <!-- Nupud postituse uuendamiseks ja kustutamiseks -->
      <div class="actions">
        <button @click="updatePost">Update</button>
        <button @click="deletePost">Delete</button>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import { useRoute, useRouter } from 'vue-router';
  
  export default {
    data() {
      return {
        post: {},        // Hoidla postituse andmetele
        updatedBody: '', // Uuendatav sisu
      };
    },
    created() {
      this.fetchPost(); // Laadib postituse kohe komponendi loomisel
    },
    methods: {
      // Funktsioon postituse toomiseks
      async fetchPost() {
        const route = useRoute();
        try {
          const response = await axios.get(`http://localhost:3000/posts/${route.params.id}`);
          this.post = response.data;
          this.updatedBody = this.post.body; // Täidab sisendi olemasoleva tekstiga
        } catch (error) {
          console.error('Postituse toomine ebaõnnestus:', error);
          alert('Postituse toomine ebaõnnestus!');
        }
      },
      // Funktsioon postituse uuendamiseks
      async updatePost() {
        try {
    await axios.put(`http://localhost:3000/posts/${this.post.id}`, {
      body: this.updatedBody, // Kasutame updatedBody'd uuendamiseks
    });
    alert('Postituse uuendamine õnnestus!');
    this.fetchPost(); // Värskendame postituse andmed
  } catch (error) {
    console.error('Postituse uuendamine ebaõnnestus:', error);
    alert('Postituse uuendamine ebaõnnestus!');
  }
      },
      // Funktsioon postituse kustutamiseks
      async deletePost() {
        try {
            await axios.delete(`http://localhost:3000/posts/${this.post.id}`);
            alert('Postitus kustutatud!');
            this.$router.push('/'); // Tagasi pealehele
        } catch (error) {
            console.error('Postituse kustutamine ebaõnnestus:', error);
            alert('Postituse kustutamine ebaõnnestus!');
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .post {
    text-align: center;
    margin: 20px auto;
    width: 50%;
  }
  
  h2 {
    margin-bottom: 20px;
    color: #333;
  }
  
  img {
    max-width: 100%;
    height: auto;
    margin-bottom: 20px;
    display: block;
    margin-left: auto;
    margin-right: auto;
  }
  
  .update-form {
    margin-bottom: 20px;
  }
  
  label {
    margin-right: 10px;
    font-weight: bold;
  }
  
  input {
    padding: 5px;
    width: 200px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  
  .actions {
    margin-top: 20px;
  }
  
  button {
    margin: 5px;
    padding: 5px 10px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  button:first-of-type {
    background-color: #007bff;
    color: white;
  }
  
  button:last-of-type {
    background-color: #dc3545;
    color: white;
  }
  </style>
  