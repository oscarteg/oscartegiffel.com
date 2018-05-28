<template>
    <span class="blinking-cursor"></span>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
/* The typewriter cursor effect */
.bliking-cursor {
  animation: blink-caret 0.5s step-end infinite;
}

@keyframes blink-caret {
  from,
  to {
    border-color: black;
  }
  50% {
    border-color: orange;
  }
}
</style>
