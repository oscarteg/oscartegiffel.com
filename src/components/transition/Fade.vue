<template>
    <transition mode="out-in" 
        enter-active-class="router--transition animated fadeIn"
        leave-active-class="router--transition animated fadeOut">
        <slot></slot>
    </transition>
</template>

<script>
export default {
  name: "Fade"
};
</script>

<style lang="scss" scoped>
.router--transition {
  -webkit-animation-duration: 250ms;
  -moz-animation-duration: 250ms;
  animation-duration: 250ms;
}
</style>
