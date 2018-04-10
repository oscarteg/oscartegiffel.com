<template>
<div class="content">
  <h1>mijn Educatie</h1>
  <h2 class="subtitle"><font-awesome-icon :icon="['fas', 'graduation-cap']"/>Opleidingen</h2>
  <div class="tile is-ancestor">
    <div class="tile is-vertical">
      <div class="tile">
        <div class="tile is-parent">
          <article class="tile is-child box is-vertical is-info">
            <p class="title">
              Hogeschool Leiden</p>
            <p class="subtitle">Informatica | Software engineering | 2013 - heden</p>
            <div class="content">
              <p>Op deze school heb ik de opleiding Informatica gevolgd met een specialisatie in software engineer. Hier heb ik de beginselen gekregen van software ontwikkeling. Ook heb ik hier veel geleerd over project management in verschillende project methodieken.</p>
              <p>De vakken die ik heb gekregen zijn onder andere:</p>
              <ul>
                <li>Java</li>
                <li>Software Test methodieken</li>
                <li>PHP</li>
                <li>UML</li>
                <li>HTML(5)/CSS(3)</li>
                <li>Databases (Postgres, MySQL)</li>
                <li>Basic design patterns</li>
                <li>Database modeling</li>
                <li>Networking and security</li>
                <li>Project (ontwikkel)methodieken (RUP, SCRUM, Waterfall, PRINCE2)</li>
              </ul>
            </div>
          </article>
        </div>
      </div>
    </div>
  </div>
  <h2 class="subtitle"><font-awesome-icon :icon="['fas', 'certificate']"/>Cursussen/Certificaten</h2>
  <div class="tile is-ancestor">
    <div class="tile is-vertical">
      <div class="tile">
        <div class="tile is-parent">
          <article class="tile is-child box is-vertical is-info">
            <p class="title">
              Hogeschool Leiden</p>
            <p class="subtitle">Informatica | Software engineering | 2013 - heden</p>
            <div class="content">
              <p>Op deze school heb ik de opleiding Informatica gevolgd met een specialisatie in software engineer. Hier heb ik de beginselen gekregen van software ontwikkeling. Ook heb ik hier veel geleerd over project management in verschillende project methodieken.</p>
              <p>De vakken die ik heb gekregen zijn onder andere:</p>
              <ul>
                <li>Java</li>
                <li>Software Test methodieken</li>
                <li>PHP</li>
                <li>UML</li>
                <li>HTML(5)/CSS(3)</li>
                <li>Databases (Postgres, MySQL)</li>
                <li>Basic design patterns</li>
                <li>Database modeling</li>
                <li>Networking and security</li>
                <li>Project (ontwikkel)methodieken (RUP, SCRUM, Waterfall, PRINCE2)</li>
              </ul>
            </div>
          </article>
        </div>

        <div class="tile is-parent">
          <article class="tile is-child box is-vertical is-info">
            <p class="title">
              Hogeschool </p>
            <p class="subtitle">Informatica | Software engineering | 2013 - heden</p>
            <div class="content">
            </div>
          </article>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

export default {
  name: "WhereILearned",
  components: {
    FontAwesomeIcon
  }
};
</script>
