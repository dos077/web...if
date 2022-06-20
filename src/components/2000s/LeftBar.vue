<template>
  <div class="col-2 flex-grow" style="border-right: 1px solid #999;">
    <q-bar class="bg-grey-4 glossy shadow-1"
      style="height: 1.2rem; z-index: 10; position: relative;"
    >
      <div class="text-center text-grey-9" style="width: 100%;">
        sub reddits
      </div>
    </q-bar>
    <div
      style="border-bottom: 1px solid #999; height: 615px; background: #edf4ff;"
    >
      <q-scroll-area style="width: 100%; height: 100%;">
        <q-list style="max-width: 100%;" class="q-ma-none">
          <q-item dense style="padding: 0.15rem 0.25rem;"
            :active="!subSelected || subSelected.r === 'all'"
            active-class="bg-blue-grey-4 text-white"
            to="/2000/r/all"
          >
            <q-item-section>
              <q-item-label class="ellipsis" style="max-width: 95%;">
                <q-icon name="mdi-fire" color="red-5" />
                Front Page
              </q-item-label>
            </q-item-section>
          </q-item>
          <q-item dense v-for="sub in subs.slice(1)" :key="sub.r" style="padding: 0.15rem 0.35rem;"
            active-class="bg-blue-grey-4 text-white"
            :to="`/2000/r/${sub.r}`"
            :active="subSelected && subSelected.r === sub.r"
          >
            <q-item-section>
              <q-item-label class="ellipsis" style="max-width: 10rem;">
                <q-icon
                  name="mdi-file-tree"
                  color="purple-7"
                />
                {{ sub.name }}
              </q-item-label>
            </q-item-section>
          </q-item>
          <q-item dense v-for="sub in additionalSubs" :key="sub.r" style="padding: 0.15rem 0.35rem;"
            active-class="bg-blue-grey-4 text-white"
            :to="`/2000/r/${sub.r}`"
            :active="subSelected && subSelected.r === sub.r"
          >
            <q-item-section>
              <q-item-label class="ellipsis" style="max-width: 10rem;">
                <q-icon name="mdi-file-tree" color="green-8" />
                {{ sub.name }}
              </q-item-label>
            </q-item-section>
          </q-item>
          <q-item v-if="newSub" style="padding: 0.15rem 0.35rem;">
            <q-item-section>
              <q-item-label style="max-width: 95%;">
                <q-icon name="mdi-plus" color="green-5" />
                <input type="text" placeholder="add subreddit"
                  autofocus
                  style="max-width: 8rem; margin-top: -20px; padding: 0;"
                  v-model="newR"
                  @submit="addSub" @blur="addSub" v-on:keyup.enter="addSub"
                />
              </q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'LeftBar',
  data: () => ({
    newR: null,
  }),
  computed: {
    ...mapState(['subSelected', 'subs', 'additionalSubs', 'newSub']),
  },
  watch: {
    newSub(to) {
      if (to) this.newR = null;
    },
  },
  methods: {
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
