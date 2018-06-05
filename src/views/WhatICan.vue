<template>
    <div class="content">
        <h1 class="has-text-white-bis">Mijn vaardigheden</h1>
        <div class="tile is-ancestor">
            <div class="tile is-vertical">
                <div class="tile">
                    <div class="tile is-parent">
                        <article class="tile is-child box is-vertical is-info">
                            <p class="title has-text-white-bis">
                                <font-awesome-icon :icon="['fas', 'server']"/>
                                Devops
                            </p>
                            <p class="subtitle"></p>
                            <div class="content">
                                <p>In de loop van tijd heb ik ervaring opgebouwd met verschillende onderdelen van
                                    devops. Ik heb geëxperimenteerd met Docker en Ansible voor me eigen projecten.
                                    Daarnaast heb ik zowel LAMP als LEMP servers opgezet. Ik kan me goed een weg vinden
                                    in Linux.</p>
                            </div>
                        </article>
                    </div>
                    <div class="tile is-parent">
                        <article class="tile is-child box">
                            <p class="title has-text-white-bis">
                                <font-awesome-icon :icon="['fas', 'code']"/>
                                Java
                            </p>

                            <div class="content">
                                Op school heb ik ervaring opgedaan met het programmeren in Java. De object georiënteerd
                                manier van programmeren is makkelijk over te zetten in andere programmeer talen.
                            </div>
                        </article>
                    </div>
                </div>
                <div class="tile">
                    <div class="tile is-parent">
                        <article class="tile is-child box">
                            <p class="title has-text-white-bis">
                                <font-awesome-icon :icon="['fas', 'desktop']"/>
                                Webdevelopment
                            </p>
                            <p class="subtitle has-text-white-bis">Php, Javascript</p>
                            <div class="content">
                                Ik heb meerdere webdevelopment projecten gedaan. Backend development in PHP en gebruik
                                gemaakt van framework Laravel. Frontend development in HTML, CSS en Javascript waarbij
                                ik gebruik heb gemaakt van verschillende Javascript frameworks zoals ReactJs, VueJs en
                                jQuery.
                            </div>
                        </article>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({
  components: {
    FontAwesomeIcon
  }
})
export default class WhatICan extends Vue {}
</script>
