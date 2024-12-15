<template>
  <div class="post-container">
    <h2>{{ post.body }}</h2>

    <!-- Check if an image URL is provided -->
    <img v-if="post.image_url" :src="post.image_url" alt="Post Image" class="post-image" />
    <p v-else>No image available</p>

    <!-- Form to update the post -->
    <div class="update-form">
      <label for="updatedBody">Body:</label>
      <input v-model="updatedBody" id="updatedBody" placeholder="Update post" />
    </div>

    <div class="actions">
      <button @click="updatePost" class="action-button">Update</button>
      <button @click="deletePost" class="action-button">Delete</button>
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
        this.updatedBody = this.post.body; // Pre-fill the body for editing
      } catch (error) {
        console.error('Failed to fetch the post:', error);
      }
    },
    async updatePost() {
      try {
        await axios.put(`http://localhost:3000/posts/${this.post.id}`, {
          body: this.updatedBody,
        });
        alert('Post updated successfully!');
        this.fetchPost();
      } catch (error) {
        console.error('Failed to update the post:', error);
      }
    },
    async deletePost() {
      try {
        await axios.delete(`http://localhost:3000/posts/${this.post.id}`);
        alert('Post deleted!');
        this.$router.push('/');
      } catch (error) {
        console.error('Failed to delete the post:', error);
      }
    },
  },
};
</script>

<style scoped>
/* Ensure the container takes full height */
html, body {
  height: 100%;
  margin: 0;
  font-family: Arial, sans-serif;
}

/* Peamine postituse konteiner */
.post-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #e98181;
  border-radius: 10px;
  padding: 20px;
  max-width: 700px;
  width: 90%;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center; /* Ensure text inside is centered */
}

/* Postituse pildi stiil */
.post-image {
  width: 100%;
  max-width: 600px;
  margin-top: 15px;
  border-radius: 5px;
  object-fit: cover;
  height: 300px; /* Ensures the image is properly sized */
}

/* Postituse uuendamise vorm */
.update-form {
  margin-top: 20px;
  width: 100%;
  text-align: left;
}

.update-form input {
  width: 100%;
  padding: 10px;
  margin-top: 5px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box;
  max-width: 600px; /* Limit the max width of input fields */
}

/* Tegutsemisnupud (Update ja Delete) */
.actions {
  margin-top: 20px;
}

.action-button {
  margin: 5px;
  padding: 10px 20px;
  cursor: pointer;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
}

.action-button:hover {
  background-color: #0056b3;
}
</style>
