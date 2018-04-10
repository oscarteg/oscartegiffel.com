<template>
    <div class="title is-2">
        <span>Ik ben <span id="typed-element"></span></span>
    </div>
</template>

<script>
import Typed from "typed.js";

export default {
  name: "Typedjs",
  props: {
    strings: {
      type: Array,
      required: true
    },
    classes: {
      type: String
    }
  },
  mounted() {
    new Typed("#typed-element", {
      strings: this.strings,
      typeSpeed: 100,
      backSpeed: 100,
      loop: true,
      showCursor: true,
      //   loopCount: 5,
      fadeOut: true
    });
  }
};
</script>

<style lang="scss" scoped>
.typed-cursor {
  opacity: 1;
  font-size: 2.5rem;
  animation: typedjsBlink 0.7s infinite;
  -webkit-animation: typedjsBlink 0.7s infinite;
  animation: typedjsBlink 0.7s infinite;
}
@keyframes typedjsBlink {
  50% {
    opacity: 0;
  }
}
@-webkit-keyframes typedjsBlink {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
.typed-fade-out {
  opacity: 0;
  transition: opacity 0.25s;
  -webkit-animation: 0;
  animation: 0;
}
</style>
