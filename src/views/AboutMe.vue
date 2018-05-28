<template>
  <div class="content">
    <h1>over Mij</h1>
    <div class="tile is-ancestor">
      <div class="tile is-parent is-4">
        <article class="tile is-child box ">
          <figure class="image">
            <img class="profile-picture" src="../assets/img/profile-image-small.jpg">
          </figure>
        </article>
      </div>
      <div class="tile is-parent">
        <article class="tile is-child box">
          <div class="content">
            <div class="columns">
              <div class="column">
                <p><span>Geboortedatum - </span> Juli 21, 1992</p>
                <p><span>Woonplaats - </span> Amersfoort</p>
                <p><span>Telefoon - </span><a href="tel:0031652789990"> +31 6 52 78 99 90</a></p>
                <p><span>Email - </span> <a href="mailto:oscar+website@tegiffel.com">oscar[at]tegiffel[dot]com</a></p>
              </div>
              <div class="column">
                <p>Ik ben Oscar. 25 jaar en student aan de Hogeschool Leiden. Momenteel zit ik in me afstudeerjaar voor de opleiding Informatica en specialisatie in software engineer. De afgelopen 6 jaar ben ik bezig met software ontwikkelen. </p>
                <p>Elke dag leer ik wat nieuws en elke dag wil ik wat nieuws leren.</p>
                <p>Als u meer wilt weten of vragen heeft, stel ze gerust. </p>
              </div>
            </div>
          </div>
        </article>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AboutMe"
};
</script>

<style lang="scss" scoped>
.profile-picture {
  max-width: 50%;
  max-height: 50%;
}
</style>
