<template>
  <ul>
      <router-link :to="{ name: 'AboutMe'}" tag="li"><a>over mij</a></router-link>
      <router-link :to="{ name: 'WhatICan'}" tag="li"><a>wat ik kan</a></router-link>
      <router-link :to="{ name: 'WhatIHaveLearned'}" tag="li"><a>wat ik heb geleerd</a></router-link>
      <router-link :to="{ name: 'WhatIHaveDone'}" tag="li"><a>wat ik heb gedaan</a></router-link>
      <router-link :to="{ name: 'Contact'}" tag="li"><a>contact</a></router-link>
  </ul>
</template>

<script>
export default {
  name: "Navigation"
};
</script>
