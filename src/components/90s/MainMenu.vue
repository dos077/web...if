<template>
<div class="row bg-grey-3" style="height: 526px; overflow: hidden;">
  <div class="col-4 row justify-center q-pa-md bg90"
    :style="{ backgroundImage: `url(${bgImg})` }"
  >
    <q-img :src="iconImg" height="100px" width="100px" />
    <div class="col-12 text-center">
      <div class="icon-border shadow-2"
        @click="$router.push('/90/r/all')"
      >
        <div class="bg-indigo-6 inset-shadow icon-box">
          <q-icon size="xl" name="mdi-spotlight-beam" color="white" />
        </div>
      </div>
      <div class="text-overline text-uppercase"
      >
        front page
      </div>
    </div>
    <div class="col-12 text-center">
      <div class="icon-border shadow-2">
        <div class="bg-indigo-6 inset-shadow icon-box">
          <q-icon size="xl" name="mdi-mailbox" color="white" />
        </div>
      </div>
      <div class="text-overline text-uppercase">github message</div>
    </div>
    <div class="col-12 text-center">
      <div v-if="randomSub"
        class="icon-border shadow-2"
        @click="$router.push(`/90/r/${randomSub.r}`)"
      >
        <div class="bg-indigo-6 inset-shadow icon-box">
          <q-icon size="xl" name="mdi-sync" color="white" />
        </div>
      </div>
      <div class="text-overline text-uppercase">random sub</div>
    </div>
  </div>
  <div class="col-8 shadow-180 bg90 row q-px-md" style="height: 100%;"
    :style="{ backgroundImage: `url(${bgImg})` }"
  >
    <div class="col-12">
      <div class="section-title shadow-1 text-center">
        <span class=" text-overline text-uppercase text-indigo-5 text-bold">
          main menu
        </span>
      </div>
    </div>
    <div v-for="sub in subs.slice(1)" class="col-6 q-px-md q-pb-xs" :key="sub.r">
      <router-link :to="`/90/r/${sub.r}`">
        <q-img :ratio="4" :src="sub.banner || ''" class="shadow-4">
          <div class="absolute-full text-bold text-white flex flex-center"
            style="background-color: rgba(0,0,0,0.25); text-shadow: 0 0 3px #000;"
          >
            {{ sub.name }}
          </div>
          <template v-slot:error>
            <div class="absolute-full text-bold text-white flex flex-center">
              {{ sub.name }}
            </div>
          </template>
        </q-img>
      </router-link>
    </div>
  </div>
</div>
</template>

<script>
import { mapState } from 'vuex';
import bgImg from '@/assets/90texture.jpg';
import iconImg from '@/assets/90icon.png';
import { aboutSub } from '@/data/redditJson';

export default {
  name: 'MainMenu',
  data: () => ({
    bgImg,
    iconImg,
  }),
  computed: {
    ...mapState(['subs']),
    randomSub() {
      if (!this.subs) return false;
      const ranIndex = Math.floor(Math.random() * this.subs.length);
      return this.subs[ranIndex];
    },
  },
  methods: {
    async loadSubBanner(i) {
      const { r } = this.subs[i];
      const { banner } = await aboutSub(r);
      if (banner) {
        this.subs[i].banner = banner;
      }
    },
  },
  mounted() {
    this.subs.forEach((sub) => {
      if (!sub.banner) this.$store.dispatch('loadBanner', sub.r);
    });
  },
};
</script>

<style scoped>
.shadow-180 {
  box-shadow: -4px 0 12px rgba(0, 0, 0, 0.5);
}
.titlebar-icon {
  float: left;
  height: 22px;
  width: 22px;
  margin: 2px 4px;
  box-shadow: 2px 2px 1px rgba(0, 0, 0, 1),
    inset 3px 3px 1px rgba(255,255,255,1);
  cursor: pointer;
}
.bg90 {
  background-repeat: no-repeat;
  background-size: cover;
}
.icon-box {
  width: 60px;
  height: 60px;
  margin: 0 auto;
  padding-top: 6px;
  cursor: pointer;
}
.icon-border {
  display: inline-block;
  padding: 7px;
}
.section-title {
  width: 125px;
  margin: 0 auto;
}
</style>
