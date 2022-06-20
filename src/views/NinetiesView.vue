<template>
<div class="row justify-center items-center"
  style="position: relative; min-height: 100vh; min-width: 100vw;"
>
  <div class="background" />
  <nineties-window>
    <main-menu v-if="slide === 0" />
    <channel-main v-if="slide === 1" />
    <post-comments v-if="slide === 2" />
  </nineties-window>
</div>
</template>

<script>
import NinetiesWindow from '../components/NinetiesWindow.vue';
import MainMenu from '../components/90s/MainMenu.vue';
import ChannelMain from '../components/90s/ChannelMain.vue';
import PostComments from '../components/90s/PostComments.vue';

export default {
  name: 'NinetiesView',
  components: {
    NinetiesWindow,
    MainMenu,
    ChannelMain,
    PostComments,
  },
  data: () => ({
    slide: 0,
  }),
  watch: {
    $route: {
      immediate: true,
      handler(to) {
        const { params } = to;
        if (params.r) {
          if (params.id) this.slide = 2;
          else this.slide = 1;
        } else {
          this.slide = 0;
        }
      },
    },
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
  background-color: #008080;
}
</style>
