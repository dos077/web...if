<template>
<div :class="`col-${cols}`"
  :style="scaling"
  v-if="!mainPost || !isPhone"
>
  <div v-if="!mainPost && !isPhone" :style="mainTransform" class="posts q-ma-md">
    <div v-if="loading" class="loading-screen flex flex-center">
      <q-circular-progress indeterminate color="white" size="xl" />
    </div>
    <q-page-sticky position="top-left" :offset="[20,20]">
      <q-btn flat label="top"
        :color="sortBy === 'ups' ?  'red-5' : ''"
        @click="toggleSort('ups')"
      />
      <q-btn flat label="new"
        :color="sortBy === 'created' ?  'red-5' : ''"
        @click="toggleSort('created')"
      />
      <q-btn v-if="subSelected"
        flat icon="mdi-refresh"
        color="blue-7"
        @click="$store.dispatch('loadPosts', subSelected.r)"
      />
    </q-page-sticky>
    <q-page-sticky position="top-right" :offset="[20, 20]">
      <q-btn v-if="canDelete"
        flat label="unsub" icon="mdi-delete" color="red-9"
        @click="removeSub"
      />
      <q-btn v-if="canHide"
      flat label="hide" icon="mdi-delete" color="red-9"
        @click="$store.commit('addHide', subSelected.r)"
      />
    </q-page-sticky>
    <div :style="innerTransform"
      style="width: 100%; height: 100%;"
    >
      <q-scroll-area style="max-width: 90%; height: 95%;">
        <q-list v-if="!loading">
          <q-item v-for="post in sortedPosts" :key="post.id"
            clickable v-ripple
            @click="openPost(post)"
          >
            <q-item-section>
              <q-item-label>
                <span class="text-subtitle2">
                  {{ post.title }}
                </span>
              </q-item-label>
              <q-item-label caption>
                <q-badge :color="avatarColor(post)" class="q-mr-sm">
                  {{ post.ups }}
                </q-badge>
                <span class="text-blue q-mr-sm">{{ printDate(post.created) }}</span>
                <span class="text-red q-mr-sm">
                  {{ subSelected ? post.author : `r/${post.r}` }}
                </span>
              </q-item-label>
              <q-item-label v-if="post.flair" class="text-overline">
                {{ post.flair }}
              </q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>
    </div>
  </div>
  <div v-if="(!isPhone && mainPost) || (isPhone && !mainPost)"
    :style="mainTransform" class="posts-min q-ma-sm">
    <div :style="innerTransform"
      style="width: 100%; height: 100%;"
    >
      <q-scroll-area style="max-width: 95%; height: 95%;">
        <div v-if="isPhone && subSelected"
          class="item text-subtitle2 bg-grey-10 text-white"
        >
          r/{{subSelected.r }}
          <q-btn v-if="canDelete"
            flat icon="mdi-delete" color="red-9"
            @click="removeSub"
          />
          <q-btn v-if="canHide"
          flat icon="mdi-delete" color="red-9"
            @click="$store.commit('addHide', subSelected.r)"
          />
        </div>
        <div v-if="isPhone" class="item is-phone">
          <q-btn v-if="subSelected"
            flat icon="mdi-arrow-left"
            @click="$store.commit('selectR', null)"
          />
          <q-btn flat label="top"
            :color="sortBy === 'ups' ?  'red-5' : ''"
            @click="toggleSort('ups')"
          />
          <q-btn flat label="new"
            :color="sortBy === 'created' ?  'red-5' : ''"
            @click="toggleSort('created')"
          />
          <q-btn v-if="subSelected"
            flat icon="mdi-refresh"
            color="blue-7"
            @click="$store.dispatch('loadPosts', subSelected.r)"
          />
        </div>
        <div v-for="post in sortedPosts"
          :key="post.id"
          class="text-subtitle2 item"
          :class="{
            active: mainPost && mainPost.id === post.id,
            loading,
          }"
          @click="openPost(post)"
        >
          <q-badge v-if="!(mainPost && mainPost.id === post.id)"
            :color="avatarColor(post)"
          >
            {{ post.ups }}
          </q-badge>
          {{post.title }}
        </div>
      </q-scroll-area>
    </div>
  </div>
</div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'SubPosts',
  data: () => ({
    sortBy: null,
  }),
  computed: {
    ...mapState(['loading', 'frontPage', 'subSelected', 'mainPost', 'additionalSubs']),
    isXl() {
      return this.$q.screen.gt.md;
    },
    isPhone() {
      return this.$q.screen.lt.sm;
    },
    cols() {
      if (this.isPhone) return 12;
      if (this.mainPost) {
        if (this.isXl) return 3;
        if (!this.isXl) return 4;
      }
      return 8;
    },
    rotate() {
      if (this.isPhone) return 3;
      if (this.isXl) {
        if (this.mainPost) return 5;
      }
      if (this.mainPost) return 2;
      return 2;
    },
    scaling() {
      if (!this.mainPost) return 'transform:  translate(-4%, -1%);';
      if (this.isXl) {
        if (this.mainPost) return 'transform: translate(-14%, -5%);';
      }
      return 'transform: translate(-5%, -2%); padding-right: 1rem;';
    },
    canDelete() {
      return this.subSelected
        && this.additionalSubs
        && this.additionalSubs.find(({ r }) => r === this.subSelected.r);
    },
    canHide() {
      return this.subSelected
        && !this.canDelete
        && this.subSelected.r !== 'all';
    },
    posts() {
      if (this.subSelected && this.subSelected.posts) return this.subSelected.posts;
      if (this.frontPage && this.frontPage.posts) return this.frontPage.posts;
      return null;
    },
    sortedPosts() {
      if (!this.posts) return [];
      if (!this.sortBy) return this.posts;
      const { sortBy } = this;
      const posts = [...this.posts];
      if (sortBy === 'flair') {
        return posts.sort((a, b) => (a.flair < b.flair ? -1 : 1));
      }
      if (sortBy === 'created') {
        return posts.sort((a, b) => b.created - a.created);
      }
      if (sortBy === 'author') {
        return posts.sort((a, b) => (a.author < b.author ? -1 : 1));
      }
      return posts.sort((a, b) => b.ups - a.ups);
    },
    mainTransform() {
      const rotate = `rotate(${this.rotate}deg)`;
      const xSet = Math.round(
        Math.cos(((this.rotate / 180) * Math.PI) / 2) * 1000,
      ) / 1000;
      const ySet = Math.round(
        Math.sin(((this.rotate / 180) * Math.PI) / 2) * 1000,
      ) / 10;
      const translate = `translate(${xSet}%, ${ySet}%)`;
      return `transform: ${rotate} ${translate};`;
    },
    innerTransform() {
      const counter = this.mainPost ? this.rotate * 0.5 : this.rotate;
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
    toggleSort(by) {
      if (by === this.sortBy) this.sortBy = null;
      else this.sortBy = by;
    },
    openPost({ id, r }) {
      if (this.loading) return;
      const { params } = this.$route;
      if (params.r && params.r === r) {
        this.$router.push(`/royal/r/${r}/post/${id}`);
      } else {
        this.$store.dispatch('loadPost', { r, id });
      }
    },
    removeSub() {
      if (!this.canDelete) return;
      const { r } = this.subSelected;
      this.$store.commit('removeSub', r);
    },
  },
};
</script>

<style lang="scss" scoped>
.posts {
  position: relative;
  height: 90vh;
  max-width: 60rem;
  background: #eee;
  padding: 3rem 2rem 2rem;
  &:before {
    content: "";
    display: block;
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    border: 3px solid #333;
    transform: scale(97%, 97%);
  }
  .loading-screen {
    position: absolute;
    z-index: 10;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(200,200,200,0.5);
  }
  animation: all 0.5s ease-in-out;
}
.posts-min {
  position: relative;
  height: 90vh;
  width: 100%;
  .item {
    position: relative;
    cursor: pointer;
    float: right;
    clear: right;
    text-align: right;
    margin: 0.5rem 0.5rem 1rem 1rem;
    padding: 0.5em 0.5em 0.5em 1em;
    background: #ddd;
    text-align: right;
    line-height: 1em;
    color: black;
    transition: width 0.5s, height 0.5s, font-size 0.3s;
    &:hover {
      background: #bb0001;
      color: white;
      box-shadow: -3px 4px 8px blue,
                    4px 3px 8px blue,
                    4px -3px 8px red,
                    -3px -4px 8px red;
    }
    &.is-phone {
      float: left;
      padding: 0;
      &:hover {
        background: #ddd;
        color: black;
        box-shadow: none;
      }
    }
    &.active {
      background: #bb0001;
      color: #eee;
      box-shadow: -2px 3px #eee,
                  2px 2px #eee,
                  2px -3px #eee,
                  -2px -2px #eee;
      &:hover {
        background: #bb0001;
        color: #eee;
      }
    }
    &.loading {
      color: #999;
    }
  }
  animation: all 0.5s ease-in-out;
}
</style>
