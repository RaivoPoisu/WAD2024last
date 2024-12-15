<template>
    <div>
      <h1>Postitused</h1>
      <div v-for="post in posts" :key="post.id">
        <p>{{ post.body }}</p>
        <img v-if="post.image_url" :src="post.image_url" alt="Postituse pilt" width="200" />
      </div>
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
  mounted() {
    this.fetchPosts();
  },
  methods: {
    async fetchPosts() {
      try {
        const response = await axios.get('http://localhost:3000/posts');
        this.posts = response.data;
      } catch (error) {
        console.error('Postituste laadimine ebaõnnestus:', error);
      }
    },
  },
};
</script>

<style scoped>
h1 {
  color: #333;
}

.post {
  margin-bottom: 20px;
}

img {
  display: block;
  margin-top: 10px;
}
</style>
  