<template>
  <ul>
      <router-link :to="{ name: 'home'}" tag="li"><a>home</a></router-link>
      <router-link :to="{ name: 'services'}" tag="li"><a>wat ik kan</a></router-link>
      <router-link :to="{ name: 'work'}" tag="li"><a>wat ik heb gedaan</a></router-link>
      <router-link :to="{ name: 'resume'}" tag="li"><a>cv</a></router-link>
      <router-link :to="{ name: 'about'}" tag="li"><a>over mij</a></router-link>
      <router-link :to="{ name: 'contact'}" tag="li"><a>contact</a></router-link>
  </ul>
</template>

<script>
export default {
  name: "Navigation"
};
</script>
