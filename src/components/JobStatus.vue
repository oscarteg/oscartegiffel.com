<template>
  <a class="button is-primary" @click="jobStatus">
    <font-awesome-icon class="is-large" icon="business-time" pull="left" />
    werk status
  </a>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({})
export default class JobStatus extends Vue {
  jobStatus() {
    this.$snackbar.open({
      message: "Op dit moment heb ik al werk, maar neem gerust contact op",
      type: "is-danger",
      position: "is-top",
      duration: 5000,
      actionText: "klik hier om te mailen",
      onAction: () => {
        window.location.href = "mailto:oscar+werk@tegiffel.com?subject=Werk";
      }
    });
  }
}
</script>
