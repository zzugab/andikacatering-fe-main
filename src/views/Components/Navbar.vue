<template>
  <nav>
    <ul>
      <li><router-link to="/">Home</router-link></li>
      <li><router-link to="/about">About</router-link></li>
      <li><router-link to="/login">Login</router-link></li> <!-- Tautan ke Login -->
      <li><router-link to="/register">Register</router-link></li> <!-- Tautan ke Register -->
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'Navbar'
};
</script>

<style>
/* Local styles for Navbar */
ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline;
  margin-right: 10px;
}

nav a {
  text-decoration: none;
  color: rgb(255, 255, 255);
}

nav a:hover {
  color: #41b883;
}
</style>
