<template>
    <aside class="menu">
        <p class="menu-label">
            Referrals
        </p>
        <ul class="menu-list">
            <!--TODO: Add referral icons-->
            <li v-for="referral in referrals" :key="referral.name">
                <a :href="referral.url">{{referral.name}}</a>
            </li>
        </ul>
    </aside>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({})
export default class Referrals extends Vue {
  referrals = [
    {
      name: "Shopify",
      icon: "../assets/img/referral-icons/shopify.svg",
      url: "https://www.shopify.com/?ref=oscar"
    },
    {
      name: "DigitalOcean",
      icon: "../assets/img/referral-icons/digitalocean.svg",
      url: "https://m.do.co/c/3263e6f7df8f"
    },
    {
      name: "Coinbase",
      url: "https://www.coinbase.com/join/52fa09150ba426d205000065"
    }
  ];
}
</script>

<style lang="scss" scoped>
</style>
