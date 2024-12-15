<template>
    <div class="home">
      <h1>Postitused</h1>
      <div v-for="post in posts" :key="post.id" class="post">
        <h3 @click="goToPost(post.id)" class="post-title">{{ post.body }}</h3>
        <img :src="post.image_url" alt="Post Image" @click="goToPost(post.id)" />
      </div>
  
      <!-- Nupud Add Post ja Delete All -->
      <div class="actions">
        <button @click="goToAddPost" class="add-button">Add Post</button>
        <button @click="deleteAllPosts" class="delete-button">Delete All</button>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import { useRouter } from 'vue-router';

  
  export default {
    data() {
      return {
        posts: [],
      };
    },
    created() {
      this.fetchPosts();
    },
    methods: {
      async fetchPosts() {
        try {
          const response = await axios.get('http://localhost:3000/posts');
          this.posts = response.data;
        } catch (error) {
          console.error('Postituste toomine ebaõnnestus:', error);
        }
      },
      goToPost(id) {
        this.$router.push(`/post/${id}`);
      },
      goToAddPost() {
        this.$router.push('/add-post');
      },
      async deleteAllPosts() {
        if (confirm('Kas oled kindel, et soovid kõik postitused kustutada?')) {
          try {
            await axios.delete('http://localhost:3000/posts'); // Eeldus: backend toetab kõigi kustutamist
            this.posts = [];
            alert('Kõik postitused kustutatud!');
          } catch (error) {
            console.error('Postituste kustutamine ebaõnnestus:', error);
          }
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .home {
    text-align: center;
  }
  .post {
    margin-bottom: 20px;
  }
  .post-title {
    cursor: pointer;
    color: blue;
  }
  img {
    width: 300px;
    height: auto;
    cursor: pointer;
    margin: 10px 0;
  }
  .actions {
    margin-top: 20px;
  }
  .add-button,
  .delete-button {
    margin: 10px;
    padding: 10px 15px;
    cursor: pointer;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
  }
  .delete-button {
    background-color: #dc3545;
  }
  </style>
  