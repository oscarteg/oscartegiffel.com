<template>
    <ul class="communication">
      <li><a href="mailto:oscar@tegiffel.com" target="_blank"><font-awesome-icon class="fa-fw" icon="envelope"/> oscar[at]tegiffel[dot]com</a></li>
      <li><a href="tel:0031652789990" target="_blank"><font-awesome-icon class="fa-fw" icon="mobile"/> +31 6 52789990</a></li>
      <li><a href="https://t.me/oscarteg" target="_blank"><font-awesome-icon class="fa-fw" :icon="['fab', 'telegram']"/> @oscarteg</a></li>
      <li><a href="https://api.whatsapp.com/send?phone=31652789990" target="_blank"> <font-awesome-icon class="fa-fw" :icon="['fab', 'whatsapp']"/> +31 6 52789990</a></li>
    </ul>
</template>

<script>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
export default {
  name: "Communication",
  components: {
    FontAwesomeIcon
  }
};
</script>

<style lang="scss" scoped>
.communication > a {
  margin-right: 0.5em;
}
</style>
