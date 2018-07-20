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
                            <p class="subtitle"></p>
                            <div class="content">
                                <p>Op school heb ik ervaring opgedaan met het programmeren in Java. De object georiënteerd
                                manier van programmeren is makkelijk over te zetten in andere programmeer talen.</p>
                            </div>
                        </article>
                    </div>
                    <div class="tile is-parent">
                        <article class="tile is-child box">
                            <p class="title has-text-white-bis">
                                <font-awesome-icon :icon="['fas', 'desktop']"/>
                                Webdevelopment
                            </p>
                            <p class="subtitle has-text-white-bis">Php, Javascriptm, NodeJS</p>
                            <div class="content">
                                <p> Ik heb meerdere webdevelopment projecten gedaan waaronder backend development in PHP en NodeJS. Hierbij heb ik gebruik gemaakt van de frameworks Laravel en Express. Frontend development in HTML, CSS en Javascript waarbij
                                ik gebruik heb gemaakt van verschillende Javascript frameworks zoals ReactJs, VueJs en
                                jQuery.</p>
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
export default class WhatICan extends Vue {}
</script>
