<template>
  <div v-html="rawHtml" />
</template>

<script>

export default {
  name: 'MediaEmbed',
  props: ['html', 'id'],
  data: () => ({
    rawHtml: null,
  }),
  mounted() {
    const tempDom = document.createElement('textarea');
    tempDom.innerHTML = this.html;
    const trimedStr = tempDom.value
      .replace(/^"/g, '')
      .replace(/$"/g)
      .replace(/width=.+ /g, 'width="100%" ');
    this.rawHtml = trimedStr;
  },
};
</script>
