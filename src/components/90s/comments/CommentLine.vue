<template>
<div :class="!text ? 'flex flex-start' : ''" style="word-break: break-all;">
  <span :class="`text-${color}-8 text-bold`">
    {{ author }}:
  </span>
  {{ text }}
  <a v-if="embed" :href="url" class="q-mx-sm q-my-xs">
    <q-img :src="embed.thumbnail_url" width="22rem">
      <div class="absolute-full flex flex-center"
        style="background-color: rgba(0,0,0,0);"
      >
        <q-icon name="mdi-play-circle-outline" size="3rem" />
      </div>
    </q-img>
  </a>
  <q-video v-else-if="video" class="q-mx-sm q-my-xs"
    :src="video.fallback_url"
    style="max-width: 28rem;"
  />
  <a v-if="image" :href="url" class="q-mx-sm q-my-xs">
    <q-img :src="previewUrl(image.url)" width="22rem">
    </q-img>
  </a>
</div>
</template>

<script>
export default {
  name: 'CommentLine',
  props: ['author', 'text', 'embed', 'image', 'color', 'url', 'video', 'thumbnail'],
  methods: {
    previewUrl(rawUrl) {
      return rawUrl.replace('&amp;', '&');
    },
  },
};
</script>
