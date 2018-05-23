<template>
<footer class="footer">
  <div class="container">
    <section class="section">
      <div class="level">
        <!-- Left side -->
          <div class="level-item">
            <socials />
          </div>
          <div class="level-item">
            <communication />
        </div>
      </div>
      <div class="level has-text-centered">
          <skills />
        </div>
      <div class="level has-text-centered">
        <div class="level-item">
          <copyright />
        </div>
      </div>
      <div class="level">
        <div class="level-item">
          <job-status />
        </div>
      </div>
    </section>
  </div>
</footer>
</template>

<script>
import Skills from "@/components/Skills";
import JobStatus from "@/components/JobStatus";
import Copyright from "@/components/Copyright";
import Communication from "@/components/Communication";
import Socials from "@/components/Socials";

export default {
  name: "Footer",
  components: {
    Skills,
    Copyright,
    JobStatus,
    Communication,
    Socials
  }
};
</script>
