<template>
<div class="col-2 q-px-sm q-pb-sm text-center">
  <q-btn size="sm" flat round
    class="bg-grey-1 glossy inset-shadow"
    icon="mdi-arrow-left"
    @click="nextPost(true)"
  />
  <q-btn round flat
    class="bg-grey-1 glossy inset-shadow q-mx-sm"
    icon="mdi-close"
    :disable="!mainPost"
    :color="mainPost ? '' : 'grey-6'"
    @click="clearPost"
  />
  <q-btn size="sm" flat round
    class="bg-grey-1 glossy inset-shadow"
    icon="mdi-arrow-right"
    @click="nextPost()"
  />
</div>
<div class="col-8 q-px-sm q-pb-sm flex flex-center">
  <q-card flat
    class="bg-grey-1 glossy inset-shadow"
    style="width: 28rem; height: 3.25rem;"
  >
    <q-img v-if="banner" width="100%" height="100%" :src="banner">
      <div
        class="absolute-full flex flex-center inset-shadow glossy"
        style="background: rgba(125,125,125,0.5);
          text-shadow: 1px 1px 5px black; padding: 0;"
      >
        <div class="text-bold text-white ellipsis text-center"
          style="width: 90%;"
        >
          {{ title }}
        </div>
        <div v-if="!loading && mainPost && mainPost.flair"
          class="text-overline text-grey-2 ellipsis text-center"
          style="width: 95%; margin-top: -1.25rem; margin-bottom: -0.66rem;"
        >
          {{ mainPost.flair }}
        </div>
      </div>
    </q-img>
    <div v-else class="flex flex-center"
      style="width: 100%; height: 100%;"
    >
      <div class="text-bold text-grey-9 ellipsis text-center"
        style="width: 90%;"
      >
        {{ title }}
      </div>
      <div v-if="!loading && mainPost && mainPost.flair"
        class="text-overline text-grey-9 ellipsis text-center"
        style="width: 95%; margin-top: -1.25rem; margin-bottom: -0.66rem;"
      >
        {{ mainPost.flair }}
      </div>
      <q-linear-progress v-if="loading" indeterminate
        color="grey-8" size="0.33rem"
        class="q-mx-md"
      />
    </div>
  </q-card>
</div>
<div class="col-2 q-px-sm q-pb-sm text-right">
  <q-btn round flat
    class="bg-grey-1 glossy inset-shadow q-mx-sm"
    icon="mdi-reddit"
    color="red-6"
    :href="redditLink"
    target="_blank"
  />
</div>
</template>

<script>
import { mapState } from 'vuex';

const redditUrl = 'https://www.reddit.com';

export default {
  name: 'TopBar',
  data: () => ({
    post: null,
  }),
  computed: {
    ...mapState(['subSelected', 'mainPost', 'loading', 'subs', 'additionalSubs']),
    allSubs() {
      return [...this.subs, ...this.additionalSubs];
    },
    banner() {
      if (this.loading) return null;
      if (this.mainPost) {
        const matchedSub = this.allSubs.find(({ r }) => r === this.mainPost.r);
        if (matchedSub) return matchedSub.banner;
      }
      if (this.subSelected) {
        return this.subSelected.banner;
      }
      return null;
    },
    title() {
      if (this.loading) return 'Loading...';
      if (this.mainPost) {
        return `r/${this.mainPost.r}`;
      }
      if (this.subSelected) return this.subSelected.name;
      return 'Front Page';
    },
    redditLink() {
      const { r, id } = this.mainPost || this.$route.params;
      if (!r) return redditUrl;
      if (!id) {
        return `${redditUrl}/r/${this.$route.params.r}`;
      }
      return `${redditUrl}/r/${r}/comments/${id}`;
    },
  },
  methods: {
    clearPost() {
      if (this.$route.params.r) {
        const newPath = `/2000/r/${this.$route.params.r}`;
        this.$router.push(newPath);
      } else {
        this.$store.commit('clearPost');
      }
    },
    nextPost(isBack = false) {
      if (this.$route.params.r) {
        const { r, id } = this.$route.params;
        this.$store.dispatch('nextPost', { r, id, isBack });
      } else {
        const id = this.mainPost ? this.mainPost.id : null;
        this.$store.dispatch('nextPost', { id, isBack });
      }
    },
  },
};
</script>
