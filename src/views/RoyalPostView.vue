<template>
<div class="row body q-pa-lg q-col-gutter-md">
  <div class="col-1"
    style="transform: scale(0.5, 0.5) translate(-25%, -25%);"
  >
    <sub-list :rotation="20" />
  </div>
  <div class="col-3">
    <sub-posts :rotate="2" />
  </div>
  <div class="left-bg"
    :style="centerStyle"></div>
  <div class="right-bg"></div>
  <div class="center-bg"></div>
</div>
</template>

<script>
import { mapState } from 'vuex';
import SubList from '../components/royal/SubList.vue';
import SubPosts from '../components/royal/SubPosts.vue';

export default {
  name: 'RoyalView',
  components: {
    SubList,
    SubPosts,
  },
  data: () => ({
    random: Math.random(),
  }),
  computed: {
    ...mapState(['subs', 'subSelected', 'loading', 'mainPost']),
    randomSub() {
      return this.subs[Math.floor(this.random)];
    },
    banner() {
      if (this.loading) return null;
      if (this.mainPost) {
        const matchedSub = this.subs.find(({ r }) => r === this.mainPost.r);
        if (matchedSub) return matchedSub.banner;
      }
      if (this.subSelected) {
        return this.subSelected.banner;
      }
      return null;
    },
    centerStyle() {
      if (!this.banner) return '';
      const style = {
        backgroundBlendMode: 'luminosity',
        backgroundPosition: 'center',
        backgroundSize: 'contain',
        backgroundColor: '#bb0001',
        backgroundImage: `linear-gradient(rgba(75,75,75, 0.5), rgba(75,75,75, 0.5)), url(${this.banner})`,
      };
      return style;
    },
  },
};
</script>

<style lang="scss" scoped>
.body {
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  z-index: 1;
  &:before{
    content: " ";
    position: fixed;
    z-index: 0;
    display: block;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: #ddd;
  }
}
div {
  position: relative;
  z-index: 2;
}
.left-bg {
  position: absolute;
  z-index: 0;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: #bb0001;
  clip-path: polygon(0% 0%, 33% 0%, 15% 100%, 0% 100%);
  transition: background 0.6s ease-in-out;
}
.right-bg {
  position: absolute;
  z-index: 0;
  right: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: #333;
  background-image: repeating-linear-gradient(
    45deg, transparent, transparent 15px, rgba(255,255,255,.75) 15px, rgba(255,255,255,.75) 30px);
  clip-path: polygon(33% 0%, 100% 0%, 100% 100%, 15% 100%);
  transition: background 0.6s ease-in-out;
}
.center-bg {
  position: absolute;
  z-index: 0;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background: #111;
  clip-path: polygon(33% 0%, 60% 0%, 50% 100%, 15% 100%);
  transition: background 0.6s ease-in-out;
}
</style>
