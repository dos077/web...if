<template>
<div
  class="row"
  style="height: 526px; overflow: hidden; background-size: cover;
    background-blend-mode: lighten, saturation; background-position: center;"
  :style="{
    backgroundImage: bgImg
      ? `linear-gradient(#ddd, #ddd), linear-gradient(#ccc, #ccc), url(${bgImg})`
      : 'linear-gradient(#ddd, #ccc)'
  }"
>
  <div class="col-12 shadow-4 self-start"
    style="border-bottom: 1px solid black; height: 56px;"
  >
    <q-img :ratio="798/55" width="100%" height="55px" :src="bgImg">
      <div class="absolute-full text-h4 text-uppercase text-white flex flex-center"
        style="background-color: rgba(0,0,0,0.15); text-shadow: 0 0 6px #000; padding: 4px 8px;"
      >
        {{ sub.name }}
      </div>
    </q-img>
  </div>
  <div class="col-5">
    <div class="row q-pa-md q-pt-lg items-center">
      <div class="col-4">
        <a :href="`https://www.reddit.com/r/${sub.r}`">
          <div class="shadow-4 icon-box">
            <q-img v-if="bgImg" :ratio="1" :src="bgImg" />
            <q-avatar v-else
              icon="mdi-reddit"
              color="red" text-color="white"
              square
              style="width: 100%;"
            />
          </div>
        </a>
        <div class="text-center q-pa-sm ellipsis" style="width: 100%;">
          r/{{ sub.r }}
        </div>
      </div>
      <div class="col-8" style="max-height: 230px; overflow-y: hidden;">
        {{ sub.description || 'link to sub reddit' }}
      </div>
    </div>
  </div>
  <div class="col-7 q-pa-md">
    <div style="border: 1px solid black">
      <q-bar class="bg-black text-white flex-center"
        style="border-bottom: 1px solid white;"
      >
       <div class="text-uppercase">posts</div>
      </q-bar>
      <q-scroll-area v-if="sub.posts" style="width: 100%; height: 230px;">
        <q-list style="max-width: 100%;" class="bg-white">
          <q-item dense v-for="post in sub.posts" :key="post.id"
            :to="`${sub.r}/post/${post.id}`"
          >
            <q-item-section>
              <q-item-label class="ellipsis" style="max-width: 400px;">
                <q-icon name="mdi-note" color="yellow-7" class="q-ma-none q-pa-none" />
                {{ post.title }}
              </q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>
    </div>
  </div>
  <div v-for="sub in popularSubs" class="col-2" :key="sub.r">
    <router-link :to="`/90/r/${sub.r}`">
      <div class="shadow-4 icon-box">
        <q-img :ratio="1" :src="sub.banner || ''" />
      </div>
    </router-link>
    <div class="text-center q-pa-sm ellipsis" style="width: 100%;">{{ sub.name }}</div>
  </div>
  <div class="col-12 bg-red-8 self-end" style="height: 32px;">
    <router-link to="/90">
      <div class="bottom-link text-white shadow-4" style="margin-left: 4rem;">
        MAIN MENU
      </div>
    </router-link>
  </div>
</div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'ChannelMain',
  data: () => ({
  }),
  computed: {
    ...mapState(['subs']),
    r() {
      return this.$route.params.r;
    },
    sub() {
      const { r, subs } = this;
      return subs.find((s) => s.r === r);
    },
    popularSubs() {
      const { r, subs } = this;
      const arr = [];
      const subIndex = subs.findIndex((s) => s.r === r);
      while (arr.length < 6 && arr.length < subs.length - 1) {
        const index = Math.floor(Math.random() * subs.length);
        if (!arr.includes(index) && index !== subIndex) {
          arr.push(index);
        }
      }
      return arr.map((i) => subs[i]);
    },
    bgImg() {
      return this.sub.banner || '';
    },
  },
  watch: {
    sub: {
      immediate: true,
      handler(to) {
        if (to) {
          if (!to.posts) this.$store.dispatch('loadPosts', to.r);
        }
      },
    },
    popularSubs: {
      immediate: true,
      handler(to) {
        to.forEach((sub) => {
          if (!sub.banner) this.$store.dispatch('loadBanner', sub.r);
        });
      },
    },
  },
};
</script>

<style scoped>
.icon-box {
  width: 80px;
  height: 80px;
  margin: 0 auto;
  border: 1px #bbb solid;
  padding: 12px;
  background-color: #efefef;
}
.bottom-link {
  display: inline-block;
  height: 28px;
  margin-top: 4px;
  padding: 0.2rem 1rem;
  border-top: 1px solid #eee;
  border-left: 1px solid #eee;
}
</style>
