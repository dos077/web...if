<template>
  <q-chat-message v-if="!loading"
    :name="mainPost.author"
    bg-color="deep-purple-2"
    class="q-mr-lg"
  >
    <template v-slot:avatar>
      <q-avatar :color="avatarColor(mainPost)"
        class="q-mr-md"
      >
        <q-icon name="mdi-reddit" color="white" />
        <q-badge color="orange" floating>
          {{ mainPost.ups }}
        </q-badge>
      </q-avatar>
    </template>
    <div class="text-bold q-px-xs">
      {{ mainPost.title }}
    </div>
    <div v-if="mainPost.selftext" class="q-px-xs">
      {{ mainPost.selftext }}
    </div>
    <div v-if="mainPost.embed">
      <a :href="mainPost.url" target="_blank">
        <q-img :src="mainPost.embed.thumbnail_url" :ratio="16/9"
          style="min-width: 15rem; max-width: 24rem;"
        >
          <div class="absolute-full flex flex-center"
            style="background: rgba(0,0,0,0.25);"
          >
            <q-icon name="mdi-play" size="xl" />
          </div>
        </q-img>
      </a>
    </div>
    <div v-if="mainPost.video">
      <q-video :src="mainPost.video.fallback_url"
        style="min-width: 15rem; max-width: 24rem;"
      />
    </div>
    <div v-for="image in mainPost.images || []" :key="image.url">
      <q-img :src="previewUrl(image)" style="min-width: 18rem; max-width: 24rem;">
      </q-img>
    </div>
    <div v-if="externalLink" class="q-px-xs">
      <a :href="mainPost.url" target="_blank">{{ mainPost.url }}</a>
    </div>
  </q-chat-message>
  <q-chat-message v-for="(comment, i) in loading ? [] : comments"
    :key="i"
    :name="comment.author"
    bg-color="amber-2"
    class="q-ml-lg"
    sent
  >
    <template v-slot:avatar>
      <q-avatar :color="avatarColor(comment)"
        class="q-ml-md"
      >
        <q-icon name="mdi-reddit" color="white" />
        <q-badge color="orange" floating>
          {{ comment.ups }}
        </q-badge>
      </q-avatar>
    </template>
    <div class="q-px-xs">{{ comment.body }}</div>
  </q-chat-message>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'PostComments',
  computed: {
    ...mapState(['loading', 'mainPost', 'comments']),
    externalLink() {
      if (!this.mainPost) return false;
      const { url } = this.mainPost;
      return !(url.match('reddit.com') || url.match('redd.it'));
    },
  },
  methods: {
    avatarColor({ ups }) {
      if (ups < 5) return 'blue';
      if (ups < 25) return 'indigo-11';
      if (ups < 250) return 'purple-5';
      if (ups < 1000) return 'pink-12';
      return 'red';
    },
    previewUrl({ url }) {
      return url.replace('&amp;', '&');
    },
  },
};
</script>
