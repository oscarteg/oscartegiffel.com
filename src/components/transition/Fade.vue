<template>
    <transition mode="out-in"
                enter-active-class="router--transition animated fadeIn"
                leave-active-class="router--transition animated fadeOut">
        <slot></slot>
    </transition>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({})
export default class Fade extends Vue {}
</script>

<style lang="scss" scoped>
.router--transition {
  -webkit-animation-duration: 250ms;
  -moz-animation-duration: 250ms;
  animation-duration: 250ms;
}
</style>
