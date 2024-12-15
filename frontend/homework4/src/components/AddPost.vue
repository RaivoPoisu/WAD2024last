<template>
  <div class="add-post-container">
    <h1 class="add-post-title">Add Post</h1>
    <div class="form-container">
      <label for="body" class="label">Body:</label>
      <input v-model="body" id="body" class="input-field" placeholder="Enter post body" />

      <label for="image_url" class="label">Image URL (optional):</label>
      <input v-model="image_url" id="image_url" class="input-field" placeholder="Enter image URL" />

      <button @click="submitPost" class="submit-button">Add</button>
    </div>
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
    async submitPost() {
      if (!this.body) {
        alert('Post body cannot be empty!');
        return;
      }
      try {
        await axios.post('http://localhost:3000/posts', {
          body: this.body,
          image_url: this.image_url || null, // Kui pilti pole, saadab nulli
          date: new Date().toISOString(),
        });
        alert('Post added successfully!');
        this.body = ''; // Tühjenda väljad pärast lisamist
        this.image_url = '';
      } catch (error) {
        console.error('Error adding post:', error);
        alert('Post addition failed.');
      }
    },
  },
};
</script>

<style scoped>
/* Peamine konteiner keskele */
.add-post-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 40vh;
  background-color: #e98181;
  border-radius: 10px;
  margin: 20px auto;
  margin-top: 100px;
  max-width: 700px; /* Increased max-width for a wider container */
  width: 90%; /* Ensure it takes up 90% of the available screen width */
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  padding: 20px; /* Added padding for some inner space */
}

/* Pealkiri */
.add-post-title {
  margin-bottom: 20px;
  font-size: 24px;
  color: #333;
}

/* Vormide konteiner */
.form-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start; /* Align items to the left, but keep them centered */
  width: 100%;
  padding: 20px;
  box-sizing: border-box; /* Ensure padding is inside the width */
}

/* Siltide (Body, Image URL) stiil */
.label {
  font-size: 16px;
  color: #555;
  margin-bottom: 5px;
  text-align: left;
  width: 100%;
}

/* Sisendväljad */
.input-field {
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box;
  max-width: 600px; /* Limit the max width of input fields */
}

/* Nupp */
.submit-button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  border-radius: 5px;
  max-width: 200px; /* Optional: Control the button width */
}

.submit-button:hover {
  background-color: #0056b3;
}
</style>
