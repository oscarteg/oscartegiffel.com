<template>
  <div class="skills ha">
    <div class="control field" v-for="skill in skills" :key="skill.name">
      <div class="field">
        <div class="tags has-addons">
            <span class="tag is-primary">{{ skill.name }}</span>
            <span class="tag is-warning" v-if="skill.frameworks">
              {{ skill.frameworks.join('/')}}
            </span>
            <span class="tag ">
                <font-awesome-icon icon="star" v-for="(rating, index) in skill.rating" :key="index"/>
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
          rating: 2
        },
        {
          name: "Css",
          rating: 3
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
        }
      ]
    };
  },
  components: {
    FontAwesomeIcon,
    FontAwesomeLayers
  }
};
</script>
