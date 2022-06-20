<template>
<div class="row body"
  :class="{ 'q-pa-md': !isPhone, 'q-pa-sm': isPhone }"
>
  <sub-list />
  <sub-posts />
  <post-comments v-if="mainPost" />
  <back-grounds />
</div>
</template>

<script>
import { mapState } from 'vuex';
import SubList from '../components/royal/SubList.vue';
import SubPosts from '../components/royal/SubPosts.vue';
import PostComments from '../components/royal/PostComments.vue';
import BackGrounds from '../components/royal/BackGrounds.vue';

export default {
  name: 'RoyalView',
  components: {
    SubList,
    SubPosts,
    PostComments,
    BackGrounds,
  },
  data: () => ({
    random: Math.random(),
  }),
  computed: {
    ...mapState(['subs', 'subSelected', 'loading', 'mainPost']),
    isPhone() {
      return this.$q.screen.lt.sm;
    },
    randomSub() {
      return this.subs[Math.floor(this.random)];
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
</style>
