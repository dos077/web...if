<template>
  <div class="left-bg"
    :class="{ open: mainPost, xl: isXl, phone: isPhone }"
  ></div>
  <div class="right-bg"
    :class="{ open: mainPost, xl: isXl, phone: isPhone }"
    :style="bannerStyle"></div>
  <div class="center-bg"
    :class="{ open: mainPost, xl: isXl, phone: isPhone }"
  ></div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'BackGrounds',
  computed: {
    ...mapState(['subs', 'subSelected', 'loading', 'mainPost']),
    isXl() {
      return this.$q.screen.gt.md;
    },
    isPhone() {
      return this.$q.screen.lt.sm;
    },
    banner() {
      if (this.loading) return null;
      if (this.mainPost) {
        const matchedSub = this.subs.find(({ r }) => r === this.mainPost.r);
        if (matchedSub) return matchedSub.banner;
      }
      if (this.subSelected) {
        return this.subSelected.banner;
      }
      return null;
    },
    bannerStyle() {
      if (!this.banner) return '';
      const style = {
        backgroundBlendMode: 'luminosity',
        backgroundPosition: 'center',
        backgroundSize: 'contain',
        backgroundColor: '#bb0001',
        backgroundImage: `linear-gradient(rgba(75,75,75, 0.5), rgba(75,75,75, 0.5)), url(${this.banner})`,
      };
      return style;
    },
  },
};
</script>

<style lang="scss" scoped>
.left-bg {
  position: absolute;
  z-index: 0;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: #bb0001;
  transition: all 0.6s ease-in-out;
  clip-path: polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%);
  &.xl {
    clip-path: polygon(0% 0%, 33% 0%, 15% 100%, 0% 100%);
    &.open {
      clip-path: polygon(0% 0%, 20% 0%, 0% 100%, 0% 100%);
    }
  }
}
.right-bg {
  position: absolute;
  z-index: 0;
  right: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: #bb0001;
  transition: all 0.6s ease-in-out;
  clip-path: polygon(55% 0%, 100% 0%, 100% 100%, 35% 100%);
  &.open {
    clip-path: polygon(40% 0%, 100% 0%, 100% 100%, 30% 100%);
  }
  &.xl {
    background-color: #bb0001;
    clip-path: polygon(60% 0%, 100% 0%, 100% 100%, 50% 100%);
    &.open {
      clip-path: polygon(60% 0%, 100% 0%, 100% 100%, 25% 100%);
    }
  }
  &.phone {
    clip-path: polygon(90% 0%, 100% 0%, 100% 100%, 70% 100%);
    &.open {
      clip-path: polygon(40% 0%, 100% 0%, 100% 100%, 30% 100%);
    }
  }
}
.center-bg {
  position: absolute;
  z-index: 0;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  transition: all 0.6s ease-in-out;
  background-color: #333;
  clip-path: polygon(0% 0%, 55% 0%, 35% 100%, 0% 100%);
  &.open {
    clip-path: polygon(0% 0%, 40% 0%, 30% 100%, 0% 100%);
  }
  &.xl {
    background: #333;
    clip-path: polygon(33% 0%, 60% 0%, 50% 100%, 15% 100%);
    &.open {
      clip-path: polygon(20% 0%, 60% 0%, 25% 100%, 0% 100%);
    }
  }
  &.phone {
    clip-path: polygon(0% 0%, 90% 0%, 70% 100%, 0% 100%);
    &.open {
      clip-path: polygon(0% 0%, 40% 0%, 30% 100%, 0% 100%);
    }
  }
}
</style>
