<template>
<div :class="`col-${cols}`"
  style="transform: translate(-3%, -1%)"
>
  <div :style="mainTransform" class="lines"
    :class="{ 'q-ma-md': !isPhone, 'is-phone': isPhone }"
  >
    <q-page-sticky position="top-left" :offset="[15,15]">
      <q-btn flat icon="mdi-arrow-left"
        @click="closePost"
      />
      <q-btn flat icon="mdi-reddit" color="red-5"
        label="page"
        :href="`https://www.reddit.com/r/${mainPost.r}/comments/${mainPost.id}`"
        target="_blank"
      />
    </q-page-sticky>
    <div :style="innerTransform"
      style="width: 100%; height: 100%;"
    >
      <q-scroll-area style="max-width: 100%; height: 95%;">
        <q-chat-message v-if="!loading"
          :name="mainPost.author"
          bg-color="grey-1"
          class="q-mr-lg"
        >
          <template v-slot:name>
            <div
              class="chat-name bg-grey-9 text-grey-1 text-overline"
              style="transform: rotate(-2deg) translate(-5%, 25%);"
            >
              {{ mainPost.author }}
            </div>
          </template>
          <template v-slot:avatar>
            <q-avatar :color="avatarColor(mainPost)"
              class="q-mr-md white-border"
              size="3rem"
            >
              <q-icon name="mdi-reddit" color="white" />
              <q-badge color="orange" floating>
                {{ mainPost.ups }}
              </q-badge>
            </q-avatar>
          </template>
          <div class="text-bold q-px-xs">
            {{ mainPost.title }}
            <q-badge color="red-8" class="q-mx-sm">
              r/{{ mainPost.r }}
            </q-badge>
            <q-badge v-if="mainPost.flair" color="amber-8">
              {{ mainPost.flair }}
            </q-badge>
          </div>
          <div v-if="mainPost.selftext" class="q-px-xs">
            {{ mainPost.selftext }}
          </div>
          <div v-if="mainPost.embed">
            <a :href="mainPost.url" target="_blank">
              <q-img :src="mainPost.embed.thumbnail_url" :ratio="16/9"
                style="max-width: 40rem;"
                :style="isPhone ? 'min-width: 8rem;' : 'min-width: 22rem;'"
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
              style="max-width: 40rem;"
              :ratio="3/2"
              :style="isPhone ? 'min-width: 8rem;' : 'min-width: 22rem;'"
            />
          </div>
          <div v-for="image in mainPost.images || []" :key="image.url">
            <q-img :src="previewUrl(image)" style="max-width: 40rem;"
            :style="isPhone ? 'min-width: 8rem;' : 'min-width: 22rem;'">
            </q-img>
          </div>
          <div class="q-px-xs">
            <a :href="mainPost.url" target="_blank"
              style="color: inherit;"
            >{{ mainPost.url }}</a>
          </div>
        </q-chat-message>
        <q-chat-message v-for="(comment, i) in loading ? [] : comments"
          :key="i"
          :name="comment.author"
          :bg-color="comment.author !== mainPost.author ? 'grey-9' : 'grey-1'"
          :class="comment.author !== mainPost.author ? 'q-ml-lg' : 'q-mr-lg'"
          :sent="comment.author !== mainPost.author"
        >
          <template v-slot:name>
            <div
              class="chat-name bg-grey-1 text-overline"
              :class="comment.author === mainPost.author ? 'bg-grey-9 text-grey-1' : 'text-grey-9'"
              :style="comment.author !== mainPost.author
                ? 'transform: rotate(2deg) translate(5%, 25%);'
                : 'transform: rotate(-2deg) translate(-5%, 25%);'"
            >
              {{ comment.author }}
            </div>
          </template>
          <template v-slot:avatar>
            <q-avatar :color="avatarColor(comment)"
              :class="comment.author !== mainPost.author
                ? 'q-ml-md black-border'
                : 'q-mr-md white-border'"
            >
              <q-icon name="mdi-reddit" color="grey-1" />
              <q-badge color="orange" floating>
                {{ comment.ups }}
              </q-badge>
            </q-avatar>
          </template>
          <div class="q-px-xs"
            :class="comment.author !== mainPost.author ? 'text-white' : 'text-grey-10'"
          >{{ comment.body }}</div>
        </q-chat-message>
      </q-scroll-area>
    </div>
  </div>
</div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'PostComments',
  computed: {
    ...mapState(['loading', 'mainPost', 'comments']),
    isXl() {
      return this.$q.screen.gt.md;
    },
    isPhone() {
      return this.$q.screen.lt.sm;
    },
    rotate() {
      if (this.isPhone) return 0.5;
      if (this.isXl) return 2;
      return 1;
    },
    cols() {
      if (this.isPhone) return 12;
      if (this.isXl) return 7;
      return 8;
    },
    mainTransform() {
      const rotate = `rotate(${this.rotate}deg)`;
      const xSet = Math.round(
        Math.cos(((this.rotate / 180) * Math.PI) / 2) * 1000,
      ) / 500;
      const ySet = Math.round(
        Math.sin(((this.rotate / 180) * Math.PI) / 2) * 1000,
      ) / 5;
      const translate = `translate(${xSet}%, ${ySet}%)`;
      return `transform: ${rotate} ${translate};`;
    },
    innerTransform() {
      const counter = this.rotate;
      const rotate = `rotate(-${counter}deg)`;
      const xSet = Math.round(
        Math.cos(((counter / 180) * Math.PI) / 2) * 1000,
      ) / 400;
      const ySet = Math.round(
        Math.sin(((counter / 180) * Math.PI) / 2) * 1000,
      ) / 7;
      const translate = `translate(${xSet}%, ${ySet}%)`;
      return `transform: ${rotate} ${translate};`;
    },
  },
  methods: {
    printDate(date) {
      if (date.toLocaleTimeString) {
        return `${date.toLocaleTimeString()} ${date.toLocaleDateString()}`;
      }
      return date;
    },
    avatarColor({ ups }) {
      if (ups < 5) return 'blue';
      if (ups < 25) return 'indigo-11';
      if (ups < 250) return 'purple-5';
      if (ups < 1000) return 'pink-12';
      return 'red';
    },
    previewUrl({ url }) {
      return url.replaceAll('&amp;', '&');
    },
    closePost() {
      if (this.loading) return;
      const { params } = this.$route;
      if (params.r && params.r === this.mainPost.r) {
        this.$router.push(`/royal/r/${params.r}`);
      } else {
        this.$store.commit('clearPost');
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.lines {
  position: relative;
  height: 93vh;
  max-width: 60rem;
  background: #ddd;
  border: 4px solid #eee;
  padding: 3rem 2rem 2rem;
  box-shadow: inset 3px 6px black,
              inset -3px 6px black,
              inset 6px -3px black,
              inset -6px -3px black;
  &.is-phone {
    padding: 3rem 1.5rem 1.5rem 0.5rem;
    border: 4px solid #111;
    box-shadow: none;
  }
}
.white-border {
  box-shadow: inset 2px 3px #eee,
              inset 2px -3px #eee,
              inset -3px 2px #eee,
              inset -3px -2px #eee;
}
.black-border {
  box-shadow: inset 2px 3px #333,
              inset 2px -3px #333,
              inset -3px 2px #333,
              inset -3px -2px #333;
}
.chat-name {
  display: inline-block;
  font-size: 0.8rem;
  line-height: 0.8rem;
  padding: 0.1rem 0.75rem;
  margin-bottom: 0.5rem;
}
</style>
