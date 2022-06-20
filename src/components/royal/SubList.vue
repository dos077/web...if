<template>
<div v-if="isShow"
  :class="`col-${cols}`"
  :style="scaling"
  style="height: 100vh;"
>
  <div
    :style="mainTransform"
    style="padding-bottom: 5vh; height: 100%; width: 100%;"
  >
    <q-scroll-area style="max-width: 95%; height: 100%;">
      <div class="flex column items-end" style="padding: 1rem 0;">
        <div class="menu-list" @click="$router.push('/')">
          <q-icon name="mdi-arrow-left"></q-icon>
        </div>
        <div v-if="!isPhone"
          class="menu-list"
          :style="listTransforms[0]"
          :class="{
            active: !subSelected || subSelected.r === 'all',
            'text-grey-7': loading,
          }"
          @click="$router.push('/royal/r/all')"
        >
          Frontpage
        </div>
        <div v-for="(sub, i) in visibleSubs.slice(1)" :key="sub.r"
          class="menu-list"
          :style="listTransforms[i + 1]"
          :class="{
            active: subSelected && subSelected.r === sub.r,
            'text-grey-7': loading,
          }"
          @click="$router.push(`/royal/r/${sub.r}`)"
        >
          {{ filterName(sub) }}
        </div>
        <div v-for="(sub, i) in additionalSubs" :key="sub.r"
          class="menu-list"
          :style="listTransforms[subs.length + i]"
          :class="{
            active: subSelected && subSelected.r === sub.r,
            'text-grey-7': loading,
          }"
          @click="$router.push(`/royal/r/${sub.r}`)"
        >
          {{ filterName(sub) }}
        </div>
        <div  v-if="!mainPost"
          class="menu-list"
          :style="listTransforms[listTransforms.length - 1]"
        >
          <span v-if="!newSub"
            @click="$store.commit('setNewSub', true)"
          >
            <q-icon name="mdi-plus" />add sub
          </span>
          <input v-if="newSub" type="text" placeholder="add subreddit"
            style="width: 12rem;"
            autofocus
            v-model="newR"
            @submit="addSub" @blur="addSub" v-on:keyup.enter="addSub"
          />
        </div>
      </div>
    </q-scroll-area>
  </div>
</div>
</template>

<script>
import { mapState } from 'vuex';

const calCounterRotation = (rotation) => {
  const rotate = ((rotation - 2) + Math.random() * 4) * -1;
  return `transform: rotate(${rotate}deg)`;
};

const calOffset = (total, length, fromMid) => {
  const dist = total * ((length / 2 - Math.abs(fromMid)) / (length / 2));
  const ySet = fromMid >= 0 ? dist * -1 : dist;
  // const ySet = total * ((length / 2 - fromMid) / (length / 2));
  return `translate(0%, ${ySet}%)`;
};

export default {
  name: 'SubList',
  data: () => ({
    newR: null,
  }),
  computed: {
    ...mapState(['loading', 'subs', 'hiddenSubs', 'subSelected', 'mainPost', 'additionalSubs', 'newSub']),
    visibleSubs() {
      if (!this.subs) return [];
      if (!this.hiddenSubs) return this.subs;
      return this.subs.filter(({ r }) => !this.hiddenSubs.includes(r));
    },
    isXl() {
      return this.$q.screen.gt.md;
    },
    isPhone() {
      return this.$q.screen.lt.sm;
    },
    isShow() {
      if (this.isPhone) {
        return !this.subSelected;
      }
      if (this.isXl) {
        return true;
      }
      return !this.mainPost;
    },
    cols() {
      if (this.isPhone) return 12;
      if (this.isXl) {
        if (this.mainPost) return 2;
        return 4;
      }
      return 4;
    },
    rotation() {
      if (this.mainPost) return 12;
      return 6;
    },
    scaling() {
      if (this.isPhone) return 'transform: translate(-5%, 0);';
      if (!this.mainPost) return 'transform: scale(0.8, 0.8) translate(-10%, -10%);';
      return 'transform: scale(0.8, 0.8) translate(-25%, -10%);';
    },
    mainTransform() {
      return `transform: rotate(${this.rotation}deg);`;
    },
    listTransforms() {
      const { rotation, subs, additionalSubs } = this;
      const offSet = Math.sin((rotation / 180) * Math.PI) * 100;
      const length = subs.length + additionalSubs.length + 1;
      const arr = [
        `${calCounterRotation(rotation)} ${calOffset(offSet, length, length / 2)}`,
      ];
      for (let i = 0; i < subs.length + additionalSubs.length; i += 1) {
        const fromMid = length / 2 - (i + 1.5);
        arr.push(
          `${calCounterRotation(rotation)} ${calOffset(offSet, length, fromMid)}`,
        );
      }
      return arr;
    },
  },
  watch: {
    newSub(to) {
      if (to) this.newR = null;
    },
  },
  methods: {
    filterName({ name }) {
      if (name.match(':')) return name.split(':')[0];
      if (name.match('-')) return name.split('-')[0];
      return name;
    },
    addSub() {
      if (this.loading) {
        this.$store.commit('setNewSub', false);
        return;
      }
      if (this.newR) {
        this.$store.dispatch('addSub', this.newR);
      } else {
        this.$store.commit('setNewSub', false);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.menu-list {
  cursor: pointer;
  float: right;
  clear: right;
  text-align: right;
  margin: 0 1rem 1.5rem;
  padding: 0.3em 0.5em 0.3em 1.5em;
  background: rgba(0,0,0,0.75);
  text-align: right;
  font-size: 1.4rem;
  line-height: 1.2em;
  font-weight: bold;
  color: #fff;
  transition: width 0.5s, height 0.5s, font-size 0.3s;
  &:hover {
    background: #fff;
    color: black;
    box-shadow: -3px 4px 8px blue,
                  4px 3px 8px blue,
                  4px -3px 8px red,
                  -3px -4px 8px red;
  }
  &.active {
    background: #eee;
    color: #111;
    box-shadow: -2px 3px #333,
                2px 2px #333,
                2px -3px #333,
                -2px -2px #333;
    &:hover {
      background: #eee;
      color: #111;
    }
  }
}
a {
  color: inherit;
  text-decoration: none;
}
</style>
