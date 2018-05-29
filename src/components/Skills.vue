<template>
  <div class="field is-grouped is-grouped-multiline">
    <div class="control" v-for="skill in skills" :key="skill.name">
      <div class="tags has-addons">
        <span class="tag is-info">{{ skill.name }}</span>
        <span class="tag is-warning" v-if="skill.frameworks">
          {{ skill.frameworks.join('/')}}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import {
  FontAwesomeIcon,
  FontAwesomeLayers
} from "@fortawesome/vue-fontawesome";

export default {
  name: "Skills",
  data() {
    return {
      maxRating: 5,
      skills: [
        {
          name: "Html"
        },
        {
          name: "Css"
        },
        {
          name: "Javascript",
          frameworks: ["React", "VueJS"]
        },
        {
          name: "Php",
          frameworks: ["Laravel"]
        },
        {
          name: "Java"
        },
        {
          name: "Linux"
        },
        {
          name: "Docker"
        }
      ]
    };
  },
  methods: {
    calculateEmptyStars(rating) {
      return this.maxRating - rating;
    },
    key() {
      return this.$_.uniqueId();
    }
  },
  components: {
    FontAwesomeIcon,
    FontAwesomeLayers
  }
};
</script>
