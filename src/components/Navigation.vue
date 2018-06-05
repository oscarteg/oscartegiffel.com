<template>
    <div class="SideScrollArea">
        <div class="SideScrollArea-content--below-medium">
            <ul class="bui-Tabs bui-Tabs--bubble" data-bui-tabs-droplets-manage="" data-pushstate-ignore="">
                <router-link :to="{ name: 'AboutMe'}" class="bui-Tabs--bubble-listItem bui-Tabs--bubble-listItemLink"
                             tag="li">
                    <div class="bui-Tabs-bubble-icon">
                        <svg version="1.1" viewBox="0 0 48 48" xml:space="preserve" width="48" height="48"><g class="nc-icon-wrapper"><rect x="18" y="22" fill="#EAC3A2" width="12" height="15"></rect> <path fill="#EAD8C5" d="M24,28c-6.0654297,0-11-4.9345703-11-11v-4c0-6.0654297,4.9345703-11,11-11s11,4.9345703,11,11v4 C35,23.0654297,30.0654297,28,24,28z"></path> <path fill-rule="evenodd" clip-rule="evenodd" fill="#8680D8" d="M43.2495117,37.7966309L30,32h-0.0181885 C28.3123779,33.2503662,26.2462769,34,24,34s-4.3123169-0.7496338-5.9817505-2H18l-0.124939,0.062439l-13.12146,5.7341919 C3.2328491,38.4612427,2,40.3496704,2,42.0092163v2.987854C2,45.5509644,2.4498291,46,3.001709,46h41.9966431 C45.5515747,46,46,45.5621338,46,44.9970703v-2.987854C46,40.34729,44.7710571,38.4623413,43.2495117,37.7966309z"></path></g></svg>
                    </div>
                    <h2 class="bui-Tabs-bubble-label">Over mij</h2>
                </router-link>
                <router-link :to="{ name: 'WhatICan'}" class="bui-Tabs--bubble-listItem bui-Tabs--bubble-listItemLink"
                             tag="li">
                    <div class="bui-Tabs-bubble-icon">
                        <svg version="1.1" viewBox="0 0 48 48" xml:space="preserve" width="48" height="48"><g class="nc-icon-wrapper"><path fill="#223E49" d="M24,45c-0.17773,0-0.35645-0.04736-0.51465-0.14258l-20-12C3.18457,32.67676,3,32.35107,3,32 s0.18457-0.67676,0.48535-0.85742l20-12c0.31641-0.19043,0.71289-0.19043,1.0293,0l20,12C44.81543,31.32324,45,31.64893,45,32 s-0.18457,0.67676-0.48535,0.85742l-20,12C24.35645,44.95264,24.17773,45,24,45z"></path> <path fill="#335262" d="M24,37c-0.17773,0-0.35645-0.04736-0.51465-0.14258l-20-12C3.18457,24.67676,3,24.35107,3,24 s0.18457-0.67676,0.48535-0.85742l20-12c0.31641-0.19043,0.71289-0.19043,1.0293,0l20,12C44.81543,23.32324,45,23.64893,45,24 s-0.18457,0.67676-0.48535,0.85742l-20,12C24.35645,36.95264,24.17773,37,24,37z"></path> <path fill="#5A7A84" d="M24,29c-0.17773,0-0.35645-0.04736-0.51465-0.14258l-20-12C3.18457,16.67676,3,16.35107,3,16 s0.18457-0.67676,0.48535-0.85742l20-12c0.31641-0.19043,0.71289-0.19043,1.0293,0l20,12C44.81543,15.32324,45,15.64893,45,16 s-0.18457,0.67676-0.48535,0.85742l-20,12C24.35645,28.95264,24.17773,29,24,29z"></path></g></svg>
                    </div>
                    <h2 class="bui-Tabs-bubble-label">Wat ik kan</h2>
                </router-link>
                <router-link :to="{ name: 'WhatIHaveLearned'}"
                             class="bui-Tabs--bubble-listItem bui-Tabs--bubble-listItemLink" tag="li">
                    <div class="bui-Tabs-bubble-icon">
                        <svg version="1.1" viewBox="0 0 48 48" xml:space="preserve" width="48" height="48"><g class="nc-icon-wrapper"><polygon fill="#EFD358" points="14,20 4,41 11.13303,39.94172 14.85337,46.11902 24,27 "></polygon> <polygon fill="#EFD358" points="34,20 44,41 36.86697,39.94172 33.14663,46.11902 24,27 "></polygon> <path fill="#E86C60" d="M39,16c0-1.69408-0.84812-3.17852-2.13975-4.07663c-0.69671-0.48445-1.03413-1.29907-0.88403-2.13427 c0.27827-1.54838-0.17172-3.19785-1.3696-4.39573c-1.19788-1.19789-2.84736-1.64791-4.39574-1.36965 c-0.83519,0.15009-1.64979-0.18732-2.13424-0.88401C27.17852,1.84812,25.69403,1,24,1s-3.17852,0.84812-4.07664,2.13971 c-0.48445,0.69669-1.29905,1.03411-2.13424,0.88401c-1.54838-0.27826-3.19786,0.17176-4.39574,1.36965 c-1.19788,1.19788-1.64787,2.84735-1.3696,4.39573c0.1501,0.8352-0.18731,1.64982-0.88403,2.13427C9.84812,12.82148,9,14.30592,9,16 s0.84812,3.17852,2.13975,4.07663c0.69671,0.48445,1.03413,1.29907,0.88403,2.13428 c-0.27827,1.54836,0.17172,3.19778,1.3696,4.39566c1.19787,1.19787,2.84733,1.64783,4.3957,1.36958 c0.83521-0.15009,1.64983,0.18733,2.13427,0.88405C20.82144,30.15184,22.30592,31,24,31s3.17856-0.84816,4.07666-2.1398 c0.48444-0.69672,1.29906-1.03414,2.13427-0.88405c1.54837,0.27825,3.19782-0.1717,4.3957-1.36958 c1.19788-1.19788,1.64787-2.84731,1.3696-4.39566c-0.1501-0.83521,0.18731-1.64983,0.88403-2.13428 C38.15188,19.17852,39,17.69408,39,16z"></path> <circle fill="#C94949" cx="24" cy="16" r="7"></circle></g></svg>
                    </div>
                    <h2 class="bui-Tabs-bubble-label">Wat ik heb geleerd</h2>
                </router-link>

                <router-link :to="{ name: 'WhatIHaveDone'}"
                             class="bui-Tabs--bubble-listItem bui-Tabs--bubble-listItemLink" tag="li">
                    <div class="bui-Tabs-bubble-icon">
                        <svg version="1.1" viewBox="0 0 48 48" xml:space="preserve" width="48" height="48"><g class="nc-icon-wrapper"><path fill="#444444" d="M43,33H5c-1.10457,0-2,0.89543-2,2v8c0,1.10457,0.89543,2,2,2h38c1.10457,0,2-0.89543,2-2v-8 C45,33.89543,44.10457,33,43,33z"></path> <path fill="#B3B3B3" d="M32,11c-0.55273,0-1-0.44775-1-1V5H17v5c0,0.55225-0.44727,1-1,1s-1-0.44775-1-1V4c0-0.55225,0.44727-1,1-1 h16c0.55273,0,1,0.44775,1,1v6C33,10.55225,32.55273,11,32,11z"></path> <path fill="#636363" d="M45,9H3c-1.10457,0-2,0.89543-2,2v22c0,1.10457,0.89543,2,2,2h42c1.10457,0,2-0.89543,2-2V11 C47,9.89543,46.10457,9,45,9z"></path> <path fill="#EFD358" d="M28,39h-8c-0.55228,0-1-0.44772-1-1v-6c0-0.55228,0.44772-1,1-1h8c0.55228,0,1,0.44772,1,1v6 C29,38.55228,28.55228,39,28,39z"></path></g></svg>
                    </div>
                    <h2 class="bui-Tabs-bubble-label">Wat ik heb gedaan</h2>
                </router-link>
            </ul>
        </div>
    </div>
</template>

<script lang="ts">
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { Component, Vue } from "vue-property-decorator";

@Component({
  components: {
    FontAwesomeIcon
  }
})
export default class Navigation extends Vue {}
</script>

<style lang="scss" scoped>
@import "../assets/sass/_variables";

.bui-Tabs.bui-Tabs--bubble {
  display: -ms-flexbox;
  display: flex;
  list-style: none;
  padding: 0;
  position: relative;

  &:before {
    background-color: rgba(3, 27, 78, 0.1);
    content: "";
    height: 2px;
    left: 50%;
    position: absolute;
    top: 50px;
    transform: translate(-50%, -50%);
    width: 80%;
  }

  .bui-Tabs--bubble-listItemLink {
    display: -ms-flexbox;
    display: flex;
    -ms-flex-direction: column;
    flex-direction: column;
    position: relative;
    text-align: center;
  }

  .bui-Tabs-bubble-label {
    color: rgba(3, 27, 78, 0.5);
    display: block;
    -ms-flex: 0 0 auto;
    flex: 0 0 auto;
    font-size: 18px;
    margin-top: 10px;
    transition: color 0.25s linear;
  }

  .bui-Tabs--bubble-listItem {
    -ms-flex: 1 1 25%;
    flex: 1 1 25%;
    position: relative;

    .bui-Tabs-bubble-icon {
      -ms-flex-align: center;
      align-items: center;
      background-color: $background-light;
      border: 0.3px solid $aquamarine;
      border-radius: 50%;
      box-shadow: 0 2px 4px transparent;
      display: -ms-flexbox;
      display: flex;
      -ms-flex: 0 0 100px;
      flex: 0 0 100px;
      height: 100px;
      -ms-flex-pack: center;
      justify-content: center;
      margin: 0 auto;
      transition: all 0.25s linear;
      width: 100px;
    }

    &.is-active {
      .bui-Tabs-bubble-icon {
        background-color: white;
        border-color: transparent;
        box-shadow: 0 2px 4px rgba(3, 27, 78, 0.2);
      }

      .bui-Tabs-bubble-label {
        color: #fff;
        font-weight: 500;
      }
    }
  }
}

.SideScrollArea {
  overflow-x: auto;
  .SideScrollArea-content--below-medium {
    @media (max-width: 768px) {
      min-width: 736px;
    }
  }
}
</style>
