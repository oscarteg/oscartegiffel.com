<template>
  <nav class="navbar is-dark">
    <div class="container">
        <div class="navbar-brand">
            <router-link :to="{name: 'home'}">
                <img src="../assets/img/logo-white-background.png" alt="Logo" height="100px" width="100px">
            </router-link>
            <span class="navbar-burger burger" data-target="navbarMenu">
                <span></span>
                <span></span>
                <span></span>
            </span>
        </div>
    </div>
</nav>
</template>

<script>
export default {
  name: "NavBar"
};
</script>
