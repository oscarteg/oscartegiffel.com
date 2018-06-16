<template>
<aside class="menu">
    <p class="menu-label">
        Neem contact op via
    </p>
    <ul class="menu-list">
        <li><a href="mailto:oscar@tegiffel.com" target="_blank">
            <font-awesome-icon class="fa-fw" icon="envelope"/>
            oscar[at]tegiffel[dot]com</a></li>
        <li><a href="tel:0031652789990" target="_blank">
            <font-awesome-icon class="fa-fw" icon="mobile"/>
            +31 6 52789990</a></li>
        <li><a href="https://t.me/oscarteg" target="_blank">
            <font-awesome-icon class="fa-fw" :icon="['fab', 'telegram']"/>
            @oscarteg</a></li>
        <li><a href="https://api.whatsapp.com/send?phone=31652789990" target="_blank">
            <font-awesome-icon class="fa-fw" :icon="['fab', 'whatsapp']"/>
            +31 6 52789990</a></li>
    </ul>
</aside>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({})
export default class Communication extends Vue {}
</script>

<style lang="scss" scoped>
</style>
