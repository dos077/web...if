<template>
<div class="row bg-grey-4 q-px-sm q-pb-sm items-start" style="height: 526px;">
  <div class="col-12">
    <q-btn dense flat class="q-py-nones q-mr-md" :to="`/90/r/${r}`">
      {{ r }}
    </q-btn>
    <q-btn dense flat class="q-py-none q-mr-md" to="/90">main menu</q-btn>
    <q-separator class="q-mb-xs" />
  </div>
  <div class="col-12 inset-shadow bg-white q-pa-sm" style="border: 1px solid black; height: 406px">
    <q-scroll-area v-if="mainPost"
      style="width: 100%; height: 100%;"
      class="q-pr-md"
    >
      <div class="text-italic text-bold text-indigo-8">
        post created {{ printDate(mainPost.created) }}
      </div>
      <div class="text-bold q-mr-none">
        <span class="text-indigo-8 text-bold">{{ mainPost.author }}: </span>
        {{ mainPost.title }}
      </div>
      <comment-line v-if="mainPost.selftext"
        color="indigo"
        :author="mainPost.author"
        :text="mainPost.selftext"
      />
      <comment-line v-if="mainPost.embed"
        color="indigo"
        :author="mainPost.author"
        :embed="mainPost.embed"
        :url="mainPost.url"
      />
      <comment-line v-if="mainPost.video"
        color="indigo"
        :author="mainPost.author"
        :video="mainPost.video"
        :thumbnail="mainPost.thumbnail"
        :url="mainPost.url"
      />
      <comment-line v-for="(image, i) in mainPost.images || []" :key="i"
        color="indigo"
        :author="mainPost.author"
        :image="image"
        :url="mainPost.url"
      />
      <comment-line v-for="(comment, i) in comments" :key="i"
        color="red"
        :author="comment.author"
        :text="comment.body"
      />
    </q-scroll-area>
  </div>
  <div class="col-12 flex self-end" style="border: 1px solid #bbb">
    <q-btn v-if="mainPost && mainPost.embed" flat stack :href="mainPost.url">
      <q-icon name="mdi-play" color="green-8" />
      <div class="ellipsis" style="max-width: 4rem;">video</div>
    </q-btn>
    <q-btn v-if="mainPost && mainPost.video" flat stack :href="mainPost.url">
      <q-icon name="mdi-play" color="green-8" />
      <div class="ellipsis" style="max-width: 4rem;">video</div>
    </q-btn>
    <q-btn v-if="mainPost && mainPost.images" flat stack :href="mainPost.url">
      <q-icon name="mdi-image" color="blue-8" />
      <div class="ellipsis" style="max-width: 4rem;">image</div>
    </q-btn>
    <q-btn v-if="externalLink" flat stack :href="mainPost.url">
      <q-icon name="mdi-link" color="yellow-9" />
      <div class="ellipsis" style="max-width: 4rem;">link</div>
    </q-btn>
    <q-separator vertical />
    <q-space />
    <q-separator vertical />
    <q-btn flat stack :href="redditLink">
      <q-icon name="mdi-reddit" color="red-6"></q-icon>
      <div>reddit</div>
    </q-btn>
  </div>
</div>
</template>

<script>
import { getPost } from '@/data/redditJson';
import CommentLine from './comments/CommentLine.vue';

export default {
  name: 'PostComments',
  components: {
    CommentLine,
  },
  data: () => ({
    mainPost: null,
    comments: [],
  }),
  computed: {
    r() {
      return this.$route.params.r;
    },
    pid() {
      return this.$route.params.id;
    },
    redditLink() {
      const { r, pid } = this;
      return `https://www.reddit.com/r/${r}/comments/${pid}/`;
    },
    externalLink() {
      if (!this.mainPost) return false;
      const { url } = this.mainPost;
      return !(url.match('reddit.com') || url.match('redd.it'));
    },
  },
  watch: {
    pid: {
      immediate: true,
      async handler(id) {
        const { r } = this;
        if (r && id) {
          const { mainPost, comments } = await getPost({ r, id });
          console.log(mainPost);
          this.mainPost = mainPost;
          this.comments = comments.filter((c) => c.author && c.body);
        }
      },
    },
  },
  methods: {
    printDate(date) {
      const dateStr = date.toLocaleDateString();
      const timeStr = date.toLocaleTimeString();
      return `${dateStr} ${timeStr}`;
    },
    previewUrl({ url }) {
      return url.replaceAll('&amp;', '&');
    },
  },
};
</script>
