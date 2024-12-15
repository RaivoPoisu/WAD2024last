<template>
    <div>
    <div v-for="post in posts" :key="post.id" class="post-container">
      <!-- Tekst ja kuupäev -->
      <div class="post-header">
        <span class="post-title">{{ post.body }}</span>
        <span class="post-date">{{ formatDate(post.date) }}</span>
      </div>

      <!-- Pilt -->
      <img :src="post.image_url" alt="Posti pilt" class="post-image" @click="goToPost(post.id)" />
    </div>
  
    <div class="button-container">
        <button @click="navigateToAddPost" class="add-button">Add Post</button>
        <button @click="deleteAllPosts" class="delete-button">Delete All</button>
    </div>
        <br>
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
      goToPost(id) {
        this.$router.push(`/post/${id}`);
      },
      goToAddPost() {
        this.$router.push('/add-post');
      },
      navigateToAddPost() {
      this.$router.push('/add-post'); // Viib add-post lehele
      },
      async deleteAllPosts() {
        if (confirm('Kas oled kindel, et soovid kõik postitused kustutada?')) {
          try {
            await axios.delete('http://localhost:3000/posts');
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
  .post-container {
  margin: 20px auto;
  width: 50%; /* Määrab laiuse */
  position: relative;
}
 .post-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%; /* Sama lai kui pilt */
  position: absolute;
  top: 0;
  background-color: rgba(255, 255, 255, 0.8); /* Taust kergelt läbipaistev */
  padding: 10px;
  box-sizing: border-box;
}

.post-title {
  font-weight: bold;
  color: blue;
}

.post-date {
  font-size: 0.9rem;
  color: #555;
}

.post-image {
  width: 100%;
  height: auto;
  display: block;
  margin-top: 40px; /* Et headeriga ei kattuks */
}
  img {
    width: 300px;
    height: auto;
    cursor: pointer;
    margin: 10px 0;
  }
  
  .button-container {
  display: flex;
  justify-content: center; /* Nupud joondatakse horisontaalselt keskele */
  align-items: center; /* Vertikaalselt keskele */
  margin-top: 20px; /* Vajadusel lisa vahe sisu ja nuppude vahele */
}

.add-button, .delete-button {
  margin: 0 10px; /* Vahe nuppude vahel */
  padding: 10px 15px; /* Nuppude suurus */
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
}

.add-button {
  background-color: #007bff; /* Sinine taust */
  color: white;
}

.delete-button {
  background-color: #dc3545; /* Punane taust */
  color: white;
}
  </style>
  