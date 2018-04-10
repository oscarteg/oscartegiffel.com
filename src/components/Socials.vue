<template>
    <div class="socials fa-2x has-text-centered">
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
</template>

<script>
import {
  FontAwesomeIcon,
  FontAwesomeLayers
} from "@fortawesome/vue-fontawesome";

export default {
  name: "Socials",
  components: {
    FontAwesomeLayers,
    FontAwesomeIcon
  }
};
</script>

<style lang="scss" scoped>
.socials > a {
  margin: 0.1em;
}
</style>
