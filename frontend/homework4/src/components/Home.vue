<template>
  <div>
    <!-- Loop through each post and display it -->
    <div v-for="post in posts" :key="post.id" class="post-container">
      <!-- Post Header (Date) on the Right -->
      <div class="post-header">
        <span class="post-title">{{ post.body }}</span>
        <span class="post-date">{{ formatDate(post.date) }}</span>
      </div>

      <!-- Post Body (Body Text) on the Left -->
      <div class="post-text">
        <!-- Post image shown if image URL exists -->
        <img v-if="post.image_url" :src="post.image_url" alt="Post Image" class="post-image" @click="goToPost(post.id)" />
      </div>
    </div>

    <!-- Buttons for navigating to add post and deleting all posts -->
    <div class="button-container">
      <button @click="navigateToAddPost" class="add-button">Add Post</button>
      <button @click="deleteAllPosts" class="delete-button">Delete All</button>
    </div>
    <br>
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
    async fetchPosts() {
      try {
        const response = await axios.get('http://localhost:3000/posts');
        this.posts = response.data;
      } catch (error) {
        console.error('Failed to fetch posts:', error);
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
    navigateToAddPost() {
      this.$router.push('/add-post');
    },
    async deleteAllPosts() {
      if (confirm('Are you sure you want to delete all posts?')) {
        try {
          await axios.delete('http://localhost:3000/posts');
          this.posts = [];
          alert('All posts deleted!');
        } catch (error) {
          console.error('Failed to delete posts:', error);
        }
      }
    },
  },
};
</script>

<style scoped>
/* Post Container Styling */
.post-container {
  margin: 20px auto;
  width: 80%;
  max-width: 600px;
  background-color: #e98181; /* Red box background */
  border-radius: 15px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  position: relative;
  text-align: left; /* Align everything to the left */
  display: flex;
  flex-direction: column;
}

/* Post Header (Date on the Right) */
.post-header {
  display: flex;
  justify-content: space-between; /* Align the body to the left and date to the right */
  align-items: center;
  width: 100%;
  padding: 0 10px;
  margin-bottom: 10px; /* Space between header and body */
}

.post-title {
  font-weight: bold;
  color: black;
  margin: 10px 0; /* Reduced margin for tighter spacing */
  flex-grow: 1; /* Allow title to grow and take space */
}

.post-date {
  font-size: 0.9rem;
  color: #555;
  text-align: right; /* Align the date to the right */
}

/* Post Body (Title & Text) Styling */
.post-text {
  padding-left: 10px; /* Indentation on the left */
  margin-top: 10px;
}

/* Post Image Styling */
.post-image {
  width: 100%;
  height: auto;
  margin-top: 10px;
  cursor: pointer;
  max-width: 100%;
  object-fit: contain;
}

/* Button Container Styling */
.button-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}

/* Add and Delete Button Styling */
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

/* Hover Effects for Buttons */
.add-button:hover,
.delete-button:hover {
  opacity: 0.8;
}
</style>
