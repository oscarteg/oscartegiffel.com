<template>
    <a class="button is-primary" @click="jobStatus">
        <font-awesome-icon icon="briefcase" pull="left"/> werk status
    </a>    
</template>

<script>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
export default {
  name: "JobStatus",
  components: {
    FontAwesomeIcon
  },
  methods: {
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
};
</script>
