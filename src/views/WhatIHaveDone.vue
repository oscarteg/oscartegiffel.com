<template>
<div class="content">
  <h1>mijn Werkervaring</h1>
  <div class="box">
    <div class="timeline">
      <!-- <transition-group mode="out-in" class="transition" enter-active-class="animated fadeIn" leave-active-class="animated fadeOut"> -->
        <header class="timeline-header">
          <span class="tag is-primary">Heden</span>
        </header>

        <div class="timeline-item">
          <div class="timeline-marker is-icon is-primary"></div>
            <div class="timeline-content">
              <p class="heading">MoneyMonk</p>
              <p>Afstudeerstage</p>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi impedit placeat commodi, deserunt rerum doloremque voluptas quasi officiis modi tempora odit porro nemo, veritatis distinctio minima eius veniam assumenda.</p>
          </div>
        </div>

        <div class="timeline-item">
          <div class="timeline-marker is-icon is-primary"></div>
            <div class="timeline-content">
              <p class="heading">MoneyMonk</p>
              <p>Backend Developer</p>
              <p>Na afloop van mijn stage ben ik gebleven bij MoneyMonk. Ik doe dezelfde werkzaamheden die ik tijdens mijn stage ook had uitgevoerd</p>
          </div>
        </div>
        <header class="timeline-header">
          <span class="tag is-primary">2017</span>
        </header>
        <div class="timeline-item">
          <div class="timeline-marker is-icon is-primary"></div>
            <div class="timeline-content">
              <p class="heading">MoneyMonk</p>
              <p>(Stage) Backend Developer</p>
              <p>Tijdens mijn opleiding Software Engineer heb ik een half jaar stage gelopen bij MoneyMonk. MoneyMonk is een oplossing voor ZZP'ers om hun administratie bij te houden waaronder, contacten bijhouden, projecten bijhouden en facturen versturen. Mijn taken waren vooral gericht op de backend. Daarnaast heb ik ook nog mogen proeven om de frontend in React vorm te geven.</p>
          </div>
        </div>
        <div class="timeline-item">
          <div class="timeline-marker is-icon is-primary"></div>
            <div class="timeline-content">
              <p class="heading">Freelance</p>
              <p>Webdeveloper</p>
              <p>In januari 2016 ben ik me eigen bedrijf gestart naast mijn studie. Ik heb verschillende opdrachten gehad waaronder servers instellen, websites maken in Wordpress, webshops in Shopify aanpassen en API koppeling maken tussen ERP systeem en Shopify.</p>
          </div>
        </div>
        <header class="timeline-header">
          <span class="tag is-primary">2016</span>
        </header>
        <div class="timeline-item">
          <div class="timeline-marker is-icon">
            <font-awesome-icon icon='code'/>
          </div>
          <div class="timeline-content">
            <p class="heading">Oktober </p>
            <p>Teleperformance - Technical Support Representative</p>
              <ul>
                <li>Het afhandelen van telefonische klantcontacten.</li>
                <li>Individuele training van collega-medewerkers op vakkennis.</li>
                <li>Begeleiden en inwerken van nieuwe collega’s.</li>
                <li>Netwerk en data storingen analyseren en oplossen.</li>
                <li>TCP/IP-netwerkondersteuning geven aan klanten.</li>
                <li>Adviseren, configureren, storingen analyseren en oplossen van router, modem, computer en iptv.</li>
                <li>Het aansturen van installatie en storingsmonteurs.</li>
                <li>Klantcorrespondentie.</li>
                <li>Het aannemen van wijzigingsaanvragen en deze verwerken in het klantbestand.</li>
                <li>Diverse administratieve werkzaamheden.</li>
            </ul>
          </div>
        </div>
        <div class="timeline-header">
          <span class="tag is-primary">2013</span>
        </div>
      <!-- </transition-group> -->
    </div>
  </div>
</div>
</template>

<script>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

export default {
  name: "WhatIHaveDone",
  components: {
    FontAwesomeIcon
  }
};
</script>
