<template>
    <div>
      <h1>Posti Detail</h1>
      <p>Siin kuvatakse ühe postituse sisu.</p>
      <button @click="updatePost">Uuenda</button>
      <button @click="deletePost">Kustuta</button>
    </div>
  </template>
  
  <script>
  export default {
    name: "Post",
    methods: {
      updatePost() {
        alert("Postituse uuendamine...");
      },
      deletePost() {
        alert("Postitus kustutatud!");
      }
    }
  };
  </script>
  