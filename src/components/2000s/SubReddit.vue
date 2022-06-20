<template>
  <div class="col-10" style="border-bottom;: 1px solid #999;" ref="container">
    <div class="bg-white inset-shadow flex"
      style="height: 100%; border-bottom: 1px solid #b4b5b9;"
    >
      <div style="height: 100%; position: relative"
        :style="`width: ${mainPost ? 40 : 100}%`"
      >
        <div class="flex shadow-1 list-header"
          style="height: 1.2rem; overflow: hidden;"
          ref="listHeader"
        >
          <div :style="`width: ${mainPost ? '100' : '54'}%;`"
            style="border-right: 1px solid #b4b5b9;"
            class="ellipsis q-px-sm text-subtitle2 glossy"
            :class="sortBy === 'ups' ? 'bg-grey-6 text-white' : 'bg-grey-1'"
            @click="toggleSort('ups')"
          >
            Title
          </div>
          <div v-if="!mainPost"
            style="width: 15%; border-right: 1px solid #b4b5b9;"
            class="ellipsis q-px-sm text-subtitle2 glossy"
            :class="sortBy === 'flair' ? 'bg-grey-6 text-white' : 'bg-grey-1'"
            @click="toggleSort('flair')"
          >
            Flairs
          </div>
          <div v-if="!mainPost"
            style="width: 18%; border-right: 1px solid #b4b5b9;"
            class="ellipsis q-px-sm text-subtitle2 glossy"
            :class="sortBy === 'created' ? 'bg-grey-6 text-white' : 'bg-grey-1'"
            @click="toggleSort('created')"
          >
            Created
          </div>
          <div v-if="!mainPost"
            style="width: 13%;"
            class="ellipsis q-px-sm text-subtitle2 glossy"
            :class="sortBy === 'author' ? 'bg-grey-6 text-white' : 'bg-grey-1'"
            @click="toggleSort('author')"
          >
            {{ $route.params.r ? 'Author' : 'Subreddit' }}
          </div>
        </div>
        <q-scroll-area v-if="posts" style="height: 614px; padding-top: 2px;">
          <div v-for="post in sortedPosts" :key="post.id"
            class="flex list-row"
            style="padding: 0 1px;"
            :style="`width: ${listWidth}px;`"
            @click="openPost(post)"
            :class="{
              'bg-blue-7 text-white': mainPost && mainPost.id === post.id,
            }"
          >
            <div
              style="padding-top: 0.2rem; padding-bottom: 0.2rem; border-right: 1px solid #b4b5b9;"
              class="ellipsis q-px-sm"
              :style="`width: ${mainPost ? '100' : '54'}%;`"
              :class="{ 'text-grey-6': loading, }"
            >
              <q-badge :color="avatarColor(post)">
                {{ post.ups }}
              </q-badge>
              {{ post.title }}
            </div>
            <div v-if="!mainPost"
              style="width: 15%; border-right: 1px solid #b4b5b9;"
              class="ellipsis q-px-sm"
            >
              {{ post.flair }}
            </div>
            <div v-if="!mainPost"
              style="width: 18%; border-right: 1px solid #b4b5b9;"
              class="ellipsis q-px-sm"
            >
              {{ printDate(post.created) }}
            </div>
            <div v-if="!mainPost"
              style="width: 13%;"
              class="ellipsis q-px-sm"
            >
              {{ $route.params.r ? post.author : post.r }}
            </div>
          </div>
        </q-scroll-area>
      </div>
      <div v-if="mainPost"
        style="width: 60%; height: 100%;"
      >
        <div class="bg-grey-1 glossy shadow-1"
          style="height: 1.2rem; overflow: hidden;"
        >
          <div class="ellipsis q-px-sm text-subtitle2">
            Post
          </div>
        </div>
        <q-scroll-area style="height: 614px; padding-top: 2px;">
          <div :style="`width: ${totalWidth - listWidth}px;`"
            class="q-pa-md"
          >
            <post-comments />
          </div>
        </q-scroll-area>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import PostComments from './PostComments.vue';

export default {
  name: 'SubReddit',
  components: { PostComments },
  data: () => ({
    rSelected: null,
    listWidth: 400,
    totalWidth: null,
    sortBy: null,
  }),
  computed: {
    ...mapState(['frontPage', 'subSelected', 'loading', 'mainPost']),
    posts() {
      if (this.subSelected && this.subSelected.posts) return this.subSelected.posts;
      if (this.frontPage && this.frontPage.posts) return this.frontPage.posts;
      return null;
    },
    postId() {
      return this.$route.params.id;
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
  },
  watch: {
    mainPost: {
      handler(to, from) {
        if (to && !from) {
          this.listWidth = Math.ceil(this.$refs.listHeader.clientWidth * 0.4);
        } else if (!to && from) {
          this.listWidth = Math.ceil(this.$refs.listHeader.clientWidth / 0.4);
        }
      },
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
    openPost({ id, r }) {
      if (this.loading) return;
      const { params } = this.$route;
      if (params.r && params.r === r) {
        this.$router.push(`/2000/r/${r}/post/${id}`);
      } else {
        this.$store.dispatch('loadPost', { r, id });
      }
    },
    toggleSort(by) {
      if (by === this.sortBy) this.sortBy = null;
      else this.sortBy = by;
    },
  },
  mounted() {
    this.listWidth = this.$refs.listHeader.clientWidth;
    this.totalWidth = this.$refs.container.clientWidth;
  },
};
</script>

<style lang="scss" scoped>
.list-row {
  cursor: pointer;
  &:hover {
    background: #eaeaea;
  }
}
.list-row:nth-child(even) {
  background: #edf4ff;
  &:hover {
    background: #eaeaea;
  }
}
.list-header {
  font-size: 0.8rem;
  cursor: pointer;
}
</style>
