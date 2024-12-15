<template>
  <header class="header">
    <nav>
      <router-link to="/" class="nav-link">Home</router-link>
      <router-link to="/signup" class="nav-link">Sign Up</router-link>
    </nav>
  </header>
</template>

<script>
export default {
  name: "AppHeader",
};
</script>

<style scoped>
.header {
  background-color: #e98181;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.nav-link {
  text-decoration: none;
  color: black;
  font-size: 1.2em;
  padding: 10px;
}
.nav-link:hover {
  background-color: crimson;
  color: white;
}
</style>
