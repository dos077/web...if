<template>
  <div class="home">
    <q-btn @click="fetchReddit">test fetch</q-btn>
  </div>
</template>

<script>
import fetchReddit from '@/data/redditRss';

export default {
  name: 'Home',
  components: {
  },
  methods: {
    async fetchReddit() {
      const data = await fetchReddit('nba');
      console.log(data);
    },
  },
};
</script>
