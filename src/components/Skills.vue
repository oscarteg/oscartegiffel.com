<template>
<aside class="menu">
  <p class="menu-label">
    Ik heb ervaring met
  </p>
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
    </aside>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Skill } from "@/interfaces/Skill";

@Component({})
export default class Skills extends Vue {
  // TODO: Type check skill
  skills = [
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
    },
    {
      name: "Android"
    },
    {
      name: "React Native"
    }
  ];
}
</script>
