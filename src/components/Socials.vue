<template>
    <div class="socials">
        <a href="https://twitter.com/oscartegiffel"><font-awesome-icon :icon="['fab', 'twitter-square']"/> Twitter</a>
        <a href="https://github.com/oscarteg"><font-awesome-icon :icon="['fab', 'github-square']"/> Github</a>
        <a href="https://gitlab.com/oscarteg">
            <font-awesome-layers >
                <font-awesome-icon icon="square" />
                <font-awesome-icon :icon="['fab', 'gitlab']" transform="shrink-6" style="color: black;" />
            </font-awesome-layers>
        Gitlab</a>
        <a href="https://www.linkedin.com/in/otegiffel/"><font-awesome-icon :icon="['fab', 'linkedin']"/> Linkedin</a>
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
  margin-right: 1em;
}
</style>
