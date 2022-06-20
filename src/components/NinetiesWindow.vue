<template>
<div class="col-auto shadow-3"
  style="width: 800px; height: 560px; border: 1px solid black; margin-bottom: 4rem; z-index: 1"
>
  <q-bar class="bg-indigo-10 q-px-xs" style="border-bottom: 1px solid black;">
    <div class="text-overline text-white">
      <q-icon dense name="mdi-floppy" color="green-7" />
      90s
    </div>
    <q-space />
    <q-btn
      color="grey-4"
      icon="mdi-close"
      size="0.7em"
      padding="none"
      class="text-black shadow-3 inset-shadow-down"
      href="/"
    />
  </q-bar>
  <slot></slot>
</div>
</template>

<script>

export default {
  name: 'NinetiesWindow',
  components: {
  },
};
</script>
