<template>
  <div id="app">
    <Header />
    <router-view />
    <Footer />
  </div>
</template>



<script>
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";
export default {
  name: 'App',
  components: {
    Header,
    Footer,
  }

};
</script>

<style scoped>
#app {
  display: flex;
  flex-direction: column;   /* Paigutab sisu vertikaalselt */
  min-height: 100vh;         /* Tagab, et kogu leht katab ekraani kõrguse */
  font-family: 'Roboto', sans-serif;
}

router-view {
  flex-grow: 1;              /* Täidab kogu ruumi, et sisu kasvaks */
}
footer {
  margin-top: auto;          /* Paigutab jala lõppu, kui sisu on väike */
}
</style>
