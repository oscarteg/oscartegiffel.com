<template>
  <div class="skills">
    <div class="field is-grouped is-grouped-multiline" >
      <div class="control" v-for="skill in skills" :key="skill.name">
        <div class="tags has-addons">
            <span class="tag is-primary">{{ skill.name }}</span>
            <span class="tag is-warning" v-if="skill.frameworks">
              {{ skill.frameworks.join('/')}}
            </span>
            <span class="tag">
                <font-awesome-icon icon="star" v-for="(rating, index) in skill.rating" :key="index"/>
                <font-awesome-icon :icon="['far', 'star']" v-for="(rating, index) in calculateEmptyStars(skill.rating)" :key="skill + index"/>
            </span>
        </div>
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
          name: "Html",
          rating: 4
        },
        {
          name: "Css",
          rating: 4
        },
        {
          name: "Javascript",
          frameworks: ["React", "VueJS"],
          rating: 4
        },
        {
          name: "Php",
          frameworks: ["Laravel"],
          rating: 4
        },
        {
          name: "Java",
          rating: 4
        },
        {
          name: "Linux",
          rating: 3
        },
        {
          name: "Docker",
          rating: "3"
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
