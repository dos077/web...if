import { createStore } from 'vuex';
import fetchReddit, { aboutSub, getPost } from '@/data/redditJson';
import subs from '@/data/popularSubs';
import subStore from '@/data/subStore';

export default createStore({
  state: {
    loading: false,
    subs,
    frontPage: null,
    mainPost: null,
    comments: null,
    subSelected: null,
    additionalSubs: subStore.load(),
    hiddenSubs: subStore.loadHides() || [],
    newSub: false,
  },
  mutations: {
    selectR(state, r) {
      state.subSelected = state.subs.find((s) => s.r === r)
        || state.additionalSubs.find((s) => s.r === r);
    },
    setBanner(state, { r, banner, description }) {
      const sub = state.subs.find((s) => s.r === r)
        || state.additionalSubs.find((s) => s.r === r);
      sub.banner = banner;
      sub.description = description;
    },
    setPosts(state, { r, posts }) {
      const sub = state.subs.find((s) => s.r === r)
        || state.additionalSubs.find((s) => s.r === r);
      sub.posts = posts;
    },
    setFrontPage(state, val) {
      state.frontPage = val;
    },
    setPost(state, { mainPost, comments }) {
      state.mainPost = mainPost;
      state.comments = comments;
    },
    clearPost(state) {
      state.mainPost = null;
      state.comments = null;
    },
    setLoading(state, val) { state.loading = val; },
    setNewSub(state, val) { state.newSub = val; },
    addSub(state, { r, name }) {
      if (!state.additionalSubs.map((s) => s.r).includes(r)) {
        state.additionalSubs.push({ r, name });
        subStore.save(state.additionalSubs);
        state.mainPost = null;
        state.subSelected = { r, name };
      }
    },
    removeSub(state, r) {
      state.additionalSubs = state.additionalSubs.filter((s) => s.r !== r);
      state.subSelected = null;
      subStore.save(state.additionalSubs);
    },
    addHide(state, r) {
      if (!state.hiddenSubs.includes(r)) {
        state.hiddenSubs.push(r);
        state.subSelected = null;
        subStore.saveHides(state.hiddenSubs);
      }
    },
    removeHide(state, r) {
      if (state.hiddenSubs.includes(r)) {
        state.hiddenSubs = state.hiddenSubs.filter((s) => s !== r);
        subStore.saveHides(state.hiddenSubs);
        const sub = state.subs.find((s) => s.r === r);
        if (sub) {
          state.mainPost = null;
          state.subSelected = sub;
        }
      }
    },
  },
  actions: {
    async loadBanner({ commit }, r) {
      if (r !== 'all') {
        const { banner, description } = await aboutSub(r);
        commit('setBanner', { r, banner, description });
      } else {
        commit('setBanner', { r, banner: false, description: '' });
      }
    },
    async loadPosts({ commit }, r) {
      const posts = await fetchReddit(r);
      commit('setPosts', { r, posts });
    },
    async loadFrontPage({ commit }) {
      const posts = await fetchReddit();
      commit('setFrontPage', { posts });
    },
    async loadPost({ commit }, { r, id }) {
      commit('setLoading', true);
      try {
        const { mainPost, comments } = await getPost({ r, id });
        commit('setPost', {
          mainPost,
          comments: comments.filter((c) => c.author && c.body),
        });
      } catch (err) {
        console.log(err);
      }
      commit('setLoading', false);
    },
    async nextPost({ commit, state }, { r, id, isBack }) {
      const { posts } = r ? state.subs.find((s) => s.r === r) : state.frontPage;
      let nextIndex = isBack ? posts.length - 1 : 0;
      if (id) {
        nextIndex = posts.findIndex((p) => p.id === id);
        if (isBack) nextIndex -= 1;
        else nextIndex += 1;
      }
      if (nextIndex < 0) nextIndex = posts.length - 1;
      if (nextIndex >= posts.length) nextIndex = 0;
      const post = posts[nextIndex];
      commit('setLoading', true);
      try {
        const { mainPost, comments } = await getPost(post);
        commit('setPost', {
          mainPost,
          comments: comments.filter((c) => c.author && c.body),
        });
      } catch (err) {
        console.log(err);
      }
      commit('setLoading', false);
    },
    async addSub({ commit, state }, r) {
      commit('setLoading', true);
      if (state.hiddenSubs.includes(r)) {
        commit('removeHide', r);
        commit('setNewSub', false);
      } else {
        try {
          const subData = await aboutSub(r);
          if (subData && subData.name) {
            const { name } = subData;
            commit('addSub', { r, name });
          }
        } catch (err) {
          console.log(err);
        }
        commit('setNewSub', false);
        commit('setLoading', false);
      }
    },
  },
  modules: {
  },
});
