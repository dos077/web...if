<template>
<div class="col-3 row q-gutter-sm q-py-sm q-px-md">
  <q-btn icon="mdi-plus" color="grey-3" glossy
    size="xs" class="q-py-xs q-px-md bg-grey-2 text-grey-8"
    @click="$store.commit('setNewSub', true)"
  />
  <q-btn icon="mdi-minus" color="grey-3" glossy
    size="xs" class="q-py-xs q-px-md bg-grey-2 text-grey-8"
    :disable="!this.canDelete"
    @click="removeSub"
  />
</div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'BottomBar',
  computed: {
    ...mapState(['loading', 'additionalSubs']),
    r() {
      return this.$route.params.r;
    },
    canDelete() {
      return this.additionalSubs.some((s) => s.r === this.r);
    },
  },
  methods: {
    removeSub() {
      if (!this.canDelete) return;
      const { r } = this;
      this.$store.commit('removeSub', r);
    },
  },
};
</script>
