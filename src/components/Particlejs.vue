<template>
  <div id='particles' :class="classes"></div>
</template>

<script>
import "particles.js";

export default {
  name: "ParticlesJS",
  props: {
    classes: String
  },
  mounted() {
    this.$nextTick(() => {
      this.initParticlesJS();
    });
  },

  methods: {
    initParticlesJS() {
      /* eslint-disable */
      particlesJS("particles", {
        particles: {
          number: {
            value: 38,
            density: {
              enable: true,
              value_area: 800
            }
          },
          color: {
            value: "#333"
          },
          shape: {
            type: "circle",
            stroke: {
              width: 0,
              color: "#333"
            },
            polygon: {
              nb_sides: 5
            },
            image: {
              src: "img/github.svg",
              width: 100,
              height: 100
            }
          },
          opacity: {
            value: 0.5,
            random: false,
            anim: {
              enable: false,
              speed: 1,
              opacity_min: 0.1,
              sync: false
            }
          },
          size: {
            value: 3,
            random: true,
            anim: {
              enable: false,
              speed: 40,
              size_min: 0.1,
              sync: false
            }
          },
          line_linked: {
            enable: true,
            distance: 150,
            color: "#333",
            opacity: 0.4,
            width: 1
          },
          move: {
            enable: true,
            speed: 6,
            direction: "none",
            random: false,
            straight: false,
            out_mode: "out",
            bounce: false,
            attract: {
              enable: false,
              rotateX: 600,
              rotateY: 1200
            }
          }
        },
        interactivity: {
          detect_on: "canvas",
          events: {
            onhover: {
              enable: false,
              mode: "repulse"
            },
            onclick: {
              enable: false,
              mode: "push"
            },
            resize: true
          },
          modes: {
            grab: {
              distance: 1390.6093906093906,
              line_linked: {
                opacity: 1
              }
            },
            bubble: {
              distance: 1066.933066933067,
              size: 411.5884115884116,
              duration: 0,
              opacity: 8,
              speed: 3
            },
            repulse: {
              distance: 200,
              duration: 0.4
            },
            push: {
              particles_nb: 4
            },
            remove: {
              particles_nb: 2
            }
          }
        },
        retina_detect: true
      });
    }
  }
};
</script>
