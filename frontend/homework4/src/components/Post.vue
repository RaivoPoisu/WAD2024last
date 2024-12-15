<template>
    <div class="post">
      <h2>{{ post.body }}</h2>
      <img :src="post.image_url" alt="Post Image" />
  
      <!-- Vorm postituse uuendamiseks -->
      <div>
        <label>Body:</label>
        <input v-model="updatedBody" placeholder="Uuenda postitust" />
      </div>
  
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
        post: {},
        updatedBody: '',
      };
    },
    created() {
      this.fetchPost();
    },
    methods: {
      async fetchPost() {
        const route = useRoute();
        try {
          const response = await axios.get(`http://localhost:3000/posts/${route.params.id}`);
          this.post = response.data;
          this.updatedBody = this.post.body; // Eeltäida body uuendamiseks
        } catch (error) {
          console.error('Postituse toomine ebaõnnestus:', error);
        }
      },
      async updatePost() {
        try {
          await axios.put(`http://localhost:3000/posts/${this.post.id}`, {
            body: this.updatedBody,
          });
          alert('Postituse uuendamine õnnestus!');
          this.fetchPost();
        } catch (error) {
          console.error('Postituse uuendamine ebaõnnestus:', error);
        }
      },
      async deletePost() {
        try {
          await axios.delete(`http://localhost:3000/posts/${this.post.id}`);
          alert('Postitus kustutatud!');
          this.$router.push('/');
        } catch (error) {
          console.error('Postituse kustutamine ebaõnnestus:', error);
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .post {
    text-align: center;
  }
  .actions {
    margin-top: 20px;
  }
  button {
    margin: 5px;
    padding: 5px 10px;
    cursor: pointer;
  }
  </style>
  