<template>
    <div class="container-fluid footer-cta--container">
        <div class="columns is-centered">
          <div class="column is-two-thirds box">
            <div class="columns" style="padding: 50px">
              <div class="column is-9">
                <h1 class="title">Neem contact op</h1>
              </div>
              <div class="column is-1">
                <div class="job-status">
                  <job-status />
                </div> 
              </div>
            </div>
          </div>
        </div>
    </div>
</template>

<script>
import JobStatus from "@/components/JobStatus";

export default {
  name: "FooterCta",
  components: {
    JobStatus
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/sass/_variables";

.footer-cta--container {
  padding: 50px;
  background-image: linear-gradient(
    180deg,
    #fff,
    #fff 50%,
    $footer-background-color 0,
    $footer-background-color
  );
}
</style>
