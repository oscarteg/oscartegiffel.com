<template>
  <ul>
      <router-link :to="{ name: 'home'}">home</router-link>
      <router-link :to="{ name: 'services'}">wat ik doe</router-link>
      <router-link :to="{ name: 'work'}">wat ik kan</router-link>
      <router-link :to="{ name: 'resume'}">cv</router-link>
      <router-link :to="{ name: 'about'}">over mij</router-link>
      <router-link :to="{ name: 'contact'}">contact</router-link>
  </ul>
</template>

<script>
export default {
  name: "Navigation"
};
</script>
