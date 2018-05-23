<template>
  <ul>
    <!-- TODO: Add icons for every route -->
      <router-link :to="{ name: 'AboutMe'}" tag="li">
        <a>over mij</a>
        </router-link>
      <router-link :to="{ name: 'WhatICan'}" tag="li">
        <a>wat ik kan</a>
        </router-link>
      <router-link :to="{ name: 'WhatIHaveLearned'}" tag="li"><a>wat ik heb geleerd</a></router-link>
      <router-link :to="{ name: 'WhatIHaveDone'}" tag="li"><a>wat ik heb gedaan</a></router-link>
      <!-- TODO: Fix contactform -->
      <!-- <router-link :to="{ name: 'Contact'}" tag="li"><a>contact</a></router-link> -->
  </ul>
</template>

<script>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

export default {
  name: "Navigation",
  components: {
    FontAwesomeIcon
  }
};
</script>
