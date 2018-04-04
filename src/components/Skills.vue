<template>
<div>
    <div class="field is-grouped is-grouped-multiline">
        <div class="control" v-for="skill in skills" :key="skill.name">
            <div class="tags has-addons ">
                <span class="tag is-medium is-primary">{{ skill.name }}</span>
                <span class="tag is-medium">
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
          rating: 3
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
