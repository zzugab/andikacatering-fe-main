<template>
  <div id="app">
    <!-- Konten utama yang berubah berdasarkan rute -->
    <router-view/>
  </div>
</template>

<script>
// Import komponen Navbar yang akan digunakan di seluruh aplikasi
export default {
  name: 'App'
};
</script>

