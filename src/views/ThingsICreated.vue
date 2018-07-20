<template>
    <div class="container content">
        <div class="tile is-ancestor">
            <div class="tile is-vertical">
                <div class="tile">
                    <div class="tile is-parent">
                        <article class="tile is-child box">
                            <figure class="image chewpy-logo">
                                <img src="https://www.chewpy.com/images/chewpy_logo_white.svg"/>
                            </figure>
                            <p class="subtitle has-text-white-bis">Rest API en CMS</p>
                            <div class="content">
                                <p>Chewpy is een mobile only applicatie die gebruikers antwoord geeft op de vraag; "Wat ga ik of wat gaan we vanavond eten. Het idee is dat de app een weekoverzicht van recepten genereert op basis van de behoeften van de gebruiker. Dit doen we met behulp van ons speciaal ontwikkelde algoritme. Op de website <a href="https://www.chewpy.com">https://www.chewpy.com</a> is de link te vinden naar de verschillend applicaties.
                                
                                Ik heb meegewerkt aan de backend REST API. Deze heb ik samen met de oprichter ontworpen en gerealiseerd in het Laravel framework. Daarnaast heb ik een CMS systeem gemaakt in het framework VueJS.
                                </p>
                            </div>
                        </article>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({})
export default class ThingsICreated extends Vue {}
</script>

<style lang="scss" scoped>
.chewpy-logo {
  width: 200px;
  margin-left: 0%;
}
</style>
