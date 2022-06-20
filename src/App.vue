<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'LayoutDefault',

  components: {
  },

  computed: {
    ...mapState(['frontPage', 'subSelected', 'mainPost']),
    r() {
      return this.$route.params.r;
    },
    postId() {
      return this.$route.params.id;
    },
  },

  watch: {
    r: {
      immediate: true,
      handler(newR) {
        if (newR && (!this.subSelected || newR !== this.subSelected.r)) {
          this.$store.commit('clearPost');
          this.$store.commit('selectR', newR);
        }
        if (!newR && this.subSelected) {
          this.$store.commit('selectR', null);
        }
        if (!newR && !this.frontPage) {
          this.$store.dispatch('loadFrontPage');
        }
      },
    },
    subSelected: {
      immediate: true,
      handler(newSub) {
        if (!newSub && this.r) {
          const basePath = this.$route.matched[0].path;
          this.$router.push(basePath);
        }
        if (newSub) {
          if (!newSub.banner) this.$store.dispatch('loadBanner', newSub.r);
          if (!newSub.posts) this.$store.dispatch('loadPosts', newSub.r);
          if (newSub.r !== this.r) {
            const basePath = this.$route.matched[0].path;
            this.$router.push(`${basePath}/r/${newSub.r}`);
          }
        }
      },
    },
    postId: {
      immediate: true,
      handler(newId) {
        if (!newId && this.mainPost) this.$store.commit('clearPost');
        if (newId && (!this.mainPost || this.mainPost.id !== newId)) {
          if (this.r) {
            this.$store.dispatch('loadPost', { id: newId, r: this.r });
          } else {
            const basePath = this.$route.matched[0].path;
            this.$router.push(basePath);
          }
        }
      },
    },
    mainPost: {
      immediate: true,
      handler(newPost) {
        if (newPost && this.r && newPost.id !== this.postId) {
          const basePath = this.$route.matched[0].path;
          this.$router.push(`${basePath}/r/${this.r}/post/${newPost.id}`);
        } else if (!newPost && this.postId) {
          const basePath = this.$route.matched[0].path;
          if (this.r) {
            this.$router.push(`${basePath}/r/${this.r}`);
          } else {
            this.$router.push(basePath);
          }
        }
      },
    },
  },

};
</script>
