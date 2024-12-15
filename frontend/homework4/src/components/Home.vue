<template>
    <div>
      <div v-for="post in posts" :key="post.id" class="post-container" @click="goToPost(post.id)">
        <!-- Kuupäev -->
        <div class="post-header">
          <span class="post-date">{{ formatDate(post.date) }}</span>
        </div>
  
        <!-- Tekst keskel -->
        <div class="post-text">
          <span class="post-title">{{ post.body }}</span>
        </div>
  
        <!-- Pilt (kuvatakse ainult, kui post.image_url on olemas) -->
        <img 
          v-if="post.image_url" 
          :src="post.image_url" 
          alt="Posti pilt" 
          class="post-image" 
        />
      </div>
  
      <!-- Nupud -->
      <div class="button-container">
        <button @click="navigateToAddPost" class="add-button">Add Post</button>
        <button @click="deleteAllPosts" class="delete-button">Delete All</button>
      </div>
      <br />
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
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
      // Toob postitused serverist
      async fetchPosts() {
        try {
          const response = await axios.get('http://localhost:3000/posts');
          this.posts = response.data;
        } catch (error) {
          console.error('Postituste toomine ebaõnnestus:', error);
        }
      },
      // Vormindab kuupäeva vastavalt Eesti formaadile
      formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleString('et-EE', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        });
      },
      // Suunab Post.vue lehele
      goToPost(id) {
        this.$router.push(`/post/${id}`);
      },
      // Suunab Add Post lehele
      navigateToAddPost() {
        this.$router.push('/add-post');
      },
      // Kustutab kõik postitused
      async deleteAllPosts() {
        if (confirm('Kas oled kindel, et soovid kõik postitused kustutada?')) {
          try {
            await axios.delete('http://localhost:3000/posts'); // DELETE päring
            this.posts = []; // Tühjendab postitused
            alert('Kõik postitused kustutatud!');
          } catch (error) {
            console.error('Postituste kustutamine ebaõnnestus:', error);
            alert('Postituste kustutamine ebaõnnestus');
          }
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .post-container {
    margin: 20px auto;
    width: 50%;
    position: relative;
    text-align: center; /* Keskendab teksti */
    cursor: pointer; /* Annab klikitava tunde */
    border: 1px solid #ddd;
    padding: 10px;
    border-radius: 5px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition: transform 0.2s ease;
  }
  
  .post-container:hover {
    transform: scale(1.02); /* Efekt hiirega üle liikumisel */
  }
  
  .post-header {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    width: 100%;
    padding: 10px;
    box-sizing: border-box;
  }
  
  .post-title {
    font-weight: bold;
    color: blue;
    margin: 20px 0; /* Vahe pealkirja ja pildi vahel */
  }
  
  .post-date {
    font-size: 0.9rem;
    color: #555;
  }
  
  .post-text {
    margin: 10px 0;
    font-size: 1.1rem;
    color: #333;
  }
  
  .post-image {
    width: 100%;
    height: auto;
    margin-top: 10px;
  }
  
  .button-container {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
  }
  
  .add-button,
  .delete-button {
    margin: 0 10px;
    padding: 10px 15px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
  }
  
  .add-button {
    background-color: #007bff;
    color: white;
  }
  
  .delete-button {
    background-color: #dc3545;
    color: white;
  }
  </style>
  