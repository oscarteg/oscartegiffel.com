<template>
    <div class="SideScrollArea">
        <div class="SideScrollArea-content--below-medium">
            <ul class="bui-Tabs bui-Tabs--bubble">
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
                        <svg viewBox="0 0 48 48" width="48" height="48"><title>code editor</title><g><path fill="#444444" d="M47,11V6c0-1.105-0.895-2-2-2H3C1.895,4,1,4.895,1,6v5H47z"></path> <path fill="#606060" d="M45,43H15V11h32v30C47,42.105,46.105,43,45,43z"></path> <circle fill="#E86C60" cx="4.5" cy="7.5" r="1.5"></circle> <circle fill="#EFD358" cx="9.5" cy="7.5" r="1.5"></circle> <circle fill="#72C472" cx="14.5" cy="7.5" r="1.5"></circle> <path fill="#4F4F4F" d="M16,43H3c-1.105,0-2-0.895-2-2V11h15V43z"></path> <rect x="5" y="14" fill="#B3B3B3" width="7" height="2"></rect> <rect x="5" y="20" fill="#B3B3B3" width="5" height="2"></rect> <rect x="5" y="26" fill="#B3B3B3" width="7" height="2"></rect> <rect x="5" y="32" fill="#B3B3B3" width="5" height="2"></rect> <rect x="5" y="38" fill="#B3B3B3" width="7" height="2"></rect> <rect x="20" y="14" fill="#E86C60" width="5" height="2"></rect> <rect x="24" y="20" fill="#EFD358" width="7" height="2"></rect> <rect x="27" y="26" fill="#FFFFFF" width="10" height="2"></rect> <rect x="24" y="32" fill="#EFD358" width="7" height="2"></rect> <rect x="20" y="38" fill="#E86C60" width="5" height="2"></rect></g></svg>
                    </div>
                    <h2 class="bui-Tabs-bubble-label">Wat ik kan</h2>
                </router-link>
                <router-link :to="{ name: 'WhatIHaveLearned'}"
                             class="bui-Tabs--bubble-listItem bui-Tabs--bubble-listItemLink" tag="li">
                    <div class="bui-Tabs-bubble-icon">
                        <svg viewBox="0 0 48 48" width="48" height="48"><title>certificate</title><g><path fill="#B3B3B3" d="M8.00098,13c-0.34131,0-0.67432-0.1748-0.86133-0.49023c-0.28125-0.47461-0.12451-1.08789,0.3501-1.37012 l12.16162-7.21191c0.4751-0.28125,1.08838-0.125,1.37061,0.35059c0.28125,0.47461,0.12451,1.08789-0.3501,1.37012L8.51025,12.86035 C8.3501,12.95508,8.17432,13,8.00098,13z"></path> <path fill="#B3B3B3" d="M35.99902,13c-0.17334,0-0.34912-0.04492-0.50928-0.13965L23.32812,5.64844 c-0.47461-0.28223-0.63135-0.89551-0.3501-1.37012c0.28223-0.47559,0.896-0.63184,1.37061-0.35059l12.16162,7.21191 c0.47461,0.28223,0.63135,0.89551,0.3501,1.37012C36.67334,12.8252,36.34033,13,35.99902,13z"></path> <path fill="#A67C52" d="M42,41H2c-0.55225,0-1-0.44727-1-1V12c0-0.55273,0.44775-1,1-1h40c0.55225,0,1,0.44727,1,1v28 C43,40.55273,42.55225,41,42,41z"></path> <circle fill="#A67C52" cx="22" cy="4" r="3"></circle> <rect x="4" y="14" fill="#E6E6E6" width="36" height="24"></rect> <path fill="#B3B3B3" d="M26,23H10c-0.55225,0-1-0.44727-1-1s0.44775-1,1-1h16c0.55225,0,1,0.44727,1,1S26.55225,23,26,23z"></path> <path fill="#B3B3B3" d="M22,31H10c-0.55225,0-1-0.44727-1-1s0.44775-1,1-1h12c0.55225,0,1,0.44727,1,1S22.55225,31,22,31z"></path> <polygon fill="#EFD358" points="44,30.2501 44,47 38,44 32,47 32,30.2501 "></polygon> <path fill="#E86C60" d="M38,16c-4.96289,0-9,4.0376-9,9s4.03711,9,9,9s9-4.0376,9-9S42.96289,16,38,16z"></path> <circle fill="#C94949" cx="38" cy="25" r="4"></circle></g></svg>
                    </div>
                    <h2 class="bui-Tabs-bubble-label">Wat ik heb geleerd</h2>
                </router-link>

                <router-link :to="{ name: 'WhatIHaveDone'}"
                             class="bui-Tabs--bubble-listItem bui-Tabs--bubble-listItemLink" tag="li">
                    <div class="bui-Tabs-bubble-icon">
                        <svg viewBox="0 0 48 48" width="48" height="48"><title>briefcase 25</title><g><path fill="#444444" d="M43,32H5c-1.10457,0-2,0.89543-2,2v9c0,1.10457,0.89543,2,2,2h38c1.10457,0,2-0.89543,2-2v-9 C45,32.89543,44.10457,32,43,32z"></path> <path fill="#444444" d="M32,11c-0.55273,0-1-0.44775-1-1V5H17v5c0,0.55225-0.44727,1-1,1s-1-0.44775-1-1V4c0-0.55225,0.44727-1,1-1 h16c0.55273,0,1,0.44775,1,1v6C33,10.55225,32.55273,11,32,11z"></path> <path fill="#636363" d="M45,9H3c-1.10457,0-2,0.89543-2,2v21c0,1.10457,0.89543,2,2,2h42c1.10457,0,2-0.89543,2-2V11 C47,9.89543,46.10457,9,45,9z"></path> <rect x="10" y="9" fill="#A67C52" width="4" height="23"></rect> <rect x="34" y="9" fill="#A67C52" width="4" height="23"></rect> <rect x="34" y="36" fill="#A67C52" width="4" height="9"></rect> <rect x="10" y="36" fill="#A67C52" width="4" height="9"></rect> <path fill="#E6E6E6" d="M15,37H9c-0.55229,0-1-0.44772-1-1v-4c0-0.55228,0.44771-1,1-1h6c0.55229,0,1,0.44772,1,1v4 C16,36.55228,15.55229,37,15,37z"></path> <path fill="#E6E6E6" d="M39,37h-6c-0.55228,0-1-0.44772-1-1v-4c0-0.55228,0.44772-1,1-1h6c0.55228,0,1,0.44772,1,1v4 C40,36.55228,39.55228,37,39,37z"></path> <rect x="10" y="37" fill="#916640" width="4" height="2"></rect> <rect x="34" y="37" fill="#916640" width="4" height="2"></rect></g></svg>
                    </div>
                    <h2 class="bui-Tabs-bubble-label">Wat ik heb gedaan</h2>
                </router-link>
                <router-link :to="{ name: 'ThingsICreated'}"
                             class="bui-Tabs--bubble-listItem bui-Tabs--bubble-listItemLink" tag="li">
                    <div class="bui-Tabs-bubble-icon">
                        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 48 48" xml:space="preserve" width="48" height="48"><title>notes</title><g class="nc-icon-wrapper"><path fill="#A67C52" d="M41,3H7C5.895,3,5,3.895,5,5v40c0,1.105,0.895,2,2,2h34c1.105,0,2-0.895,2-2V5C43,3.895,42.105,3,41,3z"/> <path fill="#E6E6E6" d="M37,42H11c-0.552,0-1-0.448-1-1V9c0-0.552,0.448-1,1-1h26c0.552,0,1,0.448,1,1v32C38,41.552,37.552,42,37,42 z"/> <path fill="#B3B3B3" d="M31,24H17c-0.553,0-1-0.447-1-1s0.447-1,1-1h14c0.553,0,1,0.447,1,1S31.553,24,31,24z"/> <path fill="#B3B3B3" d="M31,18H17c-0.553,0-1-0.447-1-1s0.447-1,1-1h14c0.553,0,1,0.447,1,1S31.553,18,31,18z"/> <path fill="#B3B3B3" d="M31,30H17c-0.553,0-1-0.447-1-1s0.447-1,1-1h14c0.553,0,1,0.447,1,1S31.553,30,31,30z"/> <path fill="#B3B3B3" d="M22,36h-5c-0.553,0-1-0.447-1-1s0.447-1,1-1h5c0.553,0,1,0.447,1,1S22.553,36,22,36z"/> <path fill="#EFD358" d="M28,5c0-2.209-1.791-4-4-4s-4,1.791-4,4h-3c-0.552,0-1,0.448-1,1v4c0,0.552,0.448,1,1,1h14 c0.552,0,1-0.448,1-1V6c0-0.552-0.448-1-1-1H28z"/> <circle fill="#B29930" cx="24" cy="5" r="1"/></g></svg>
                    </div>
                    <h2 class="bui-Tabs-bubble-label">Projecten</h2>
                </router-link>
            </ul>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({})
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
    background-color: $independence;
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
    color: $independence;
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
      border: 1px solid;
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
        background-color: $independence;
        box-shadow: 0 2px 4px rgba(3, 27, 78, 0.2);
      }

      .bui-Tabs-bubble-label {
        color: $sea-serpant;
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
