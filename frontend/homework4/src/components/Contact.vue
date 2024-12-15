<template>
  <div class="contact-wrapper">
    <div class="contact-container">
      <h2>Kontaktid</h2>
      <p>Siin on kontaktilehe sisu.</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "Contact"
};
</script>

<style scoped>
.contact-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50vh;
  background-color: #f7f7f7;
}

.contact-container {
  background-color: #e98181;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  width: 350px;
  text-align: center;
}

h2 {
  margin-bottom: 1rem;
  color: #333;
}

p {
  font-size: 1rem;
  color: #555;
}
</style>