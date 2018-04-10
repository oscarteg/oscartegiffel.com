<template>
    <div class="title">
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
      loopCount: 5
    });
  }
};
</script>

<style lang="scss" scoped>
.typed-cursor {
  opacity: 1;
  -webkit-animation: blink 0.7s infinite;
  -moz-animation: blink 0.7s infinite;
  animation: blink 0.7s infinite;
}
@keyframes blink {
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
@-webkit-keyframes blink {
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
@-moz-keyframes blink {
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
</style>
