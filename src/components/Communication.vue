<template>
    <div>
        <p><font-awesome-icon class="fa-fw" icon="envelope"/><a href="mailto:oscar@tegiffel.com"> oscar[at]tegiffel[dot]com</a>
        <p><font-awesome-icon class="fa-fw" icon="mobile"/><a href="tel:0031652789990"> +31 6 52789990</a></p>
        <p><font-awesome-icon class="fa-fw" :icon="['fab', 'telegram']"/><a href="https://t.me/oscarteg"> @oscarteg</a></p>
        <p><font-awesome-icon class="fa-fw" :icon="['fab', 'whatsapp']"/><a href="https://api.whatsapp.com/send?phone=31652789990"> +31 6 52789990</a></p>
    </div>
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

<style>
</style>
