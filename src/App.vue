<template>
<div> 
  <div class="spinner" v-if="loading">
  <div class="double-bounce1"></div>
  <div class="double-bounce2"></div>
</div>
  <div v-cloak v-if="!loading">
    
    <transition mode="out-in" 
      enter-active-class="animated fadeInLeft"
      leave-active-class="animated fadeOutRight"
      >
      <Hero />
      <router-view class="section container"  />
    </transition>
    <Footer />
  </div> 
  </div>
</template>
<script>
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";

export default {
  name: "App",
  data() {
    return {
      loading: true
    };
  },
  components: {
    Hero,
    Footer
  },
  created() {
    setTimeout(() => {
      console.log(this);
      this.loading = false;
    }, 1000);
  }
};
</script>

<style lang="scss" scoped>
import [v-cloak] {
  display: none;
}

.spinner {
  width: 40px;
  height: 40px;

  position: relative;
  margin: 100px auto;
}

.double-bounce1,
.double-bounce2 {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-color: #333;
  opacity: 0.6;
  position: absolute;
  top: 0;
  left: 0;

  -webkit-animation: sk-bounce 2s infinite ease-in-out;
  animation: sk-bounce 2s infinite ease-in-out;
}

.double-bounce2 {
  -webkit-animation-delay: -1s;
  animation-delay: -1s;
}

@-webkit-keyframes sk-bounce {
  0%,
  100% {
    -webkit-transform: scale(0);
  }
  50% {
    -webkit-transform: scale(1);
  }
}

@keyframes sk-bounce {
  0%,
  100% {
    transform: scale(0);
    -webkit-transform: scale(0);
  }
  50% {
    transform: scale(1);
    -webkit-transform: scale(1);
  }
}
</style>
