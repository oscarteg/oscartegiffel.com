<template>
<footer class="footer">
  <div class="container">
    <div class="content has-text-centered">
        <div class="columns">
            <div class="column contact">
                <p><font-awesome-icon icon="envelope"/><a href="mailto:oscar@tegiffel.com"> oscar[at]tegiffel[dot]com</a>
                <p><font-awesome-icon icon="mobile"/><a href="tel:0031652789990"> +31 6 52789990</a></p>
                <p><font-awesome-icon :icon="['fab', 'telegram']"/><a href="https://t.me/oscarteg"> @oscarteg</a></p>
                <p><font-awesome-icon :icon="['fab', 'whatsapp']"/><a href="https://api.whatsapp.com/send?phone=31652789990"> +31 6 52789990</a></p>
            </div>
        </div>
        <section class="section">
          <div class="columns">
            <div class="column fa-2x fa-fw socials">
                  <a href="https://facebook.com/oscarteg"><font-awesome-icon :icon="['fab', 'facebook-square']"/></a>
                  <a href="https://twitter.com/oscartegiffel"><font-awesome-icon :icon="['fab', 'twitter-square']"/></a>
                  <a href="https://github.com/oscarteg"><font-awesome-icon :icon="['fab', 'github-square']"/></a>
                  <a href="https://gitlab.com/oscarteg">
                      <font-awesome-layers >
                          <font-awesome-icon icon="square" />
                          <font-awesome-icon :icon="['fab', 'gitlab']" transform="shrink-6" style="color: white;" />
                      </font-awesome-layers>
                  </a>
                  <a href="https://www.linkedin.com/in/otegiffel/"><font-awesome-icon :icon="['fab', 'linkedin']"/></a>
              </div>
              <div class="column">
                <button class="button is-primary is-outlined" @click="jobStatus">
                  job status
                </button>                
              </div>
              <div class="column">
                Copyright © 2018 Oscar te Giffel | All Rights Reserved.
              </div>
          </div>
        </section>
    </div>
  </div>
</footer>
</template>

<script>
import {
  FontAwesomeIcon,
  FontAwesomeLayers
} from "@fortawesome/vue-fontawesome";

export default {
  name: "Footer",
  components: {
    FontAwesomeIcon,
    FontAwesomeLayers
  },
  methods: {
    jobStatus() {
      this.$snackbar.open({
        message: "Op dit moment bezet",
        type: "is-danger",
        position: "is-top",
        duration: 5000,
        actionText: "verstuur email",
        onAction: () => {
          window.location.href = "mailto:oscar+werk@tegiffel.com?subject=Werk";
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.socials > a {
  margin: 5px;
}
</style>
