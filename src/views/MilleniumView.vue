<template>
<div class="row justify-center items-center" style="min-height: 100vh; min-width: 100vw;">
  <div class="background" />
  <millenium-window>
    <top-bar />
    <left-bar />
    <sub-reddit />
    <bottom-bar />
  </millenium-window>
</div>
</template>

<script>
import MilleniumWindow from '../components/2000s/MilleniumWindow.vue';
import TopBar from '../components/2000s/TopBar.vue';
import LeftBar from '../components/2000s/LeftBar.vue';
import SubReddit from '../components/2000s/SubReddit.vue';
import BottomBar from '../components/2000s/BottomBar.vue';

export default {
  name: 'MilleniumView',
  components: {
    MilleniumWindow,
    TopBar,
    LeftBar,
    SubReddit,
    BottomBar,
  },
  computed: {
  },
};
</script>

<style lang="scss" scoped>
.background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  background-color: #4f84b8;
}
</style>
