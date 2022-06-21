<template>
  <q-card class="col-auto metal shadow-4"
    style="width: 1024px; height: 768px; border: 1px"
  >
    <q-bar style="background: rgba(0,0,0,0);" class="q-px-sm">
      <div class="absolute-top-left q-px-sm">
        <q-btn round size="0.33rem" glossy color="red" class="inset-shadow"
          @click="$router.push('/')"
        />
      </div>
      <div class="col-12 text-center text-grey-6">
        2000s
      </div>
    </q-bar>
    <div class="row">
      <slot></slot>
    </div>
  </q-card>
</template>

<script>
export default {
  name: 'MilleniumWindow',
};
</script>

<style lang="scss" scoped>
.metal {
  position: relative;
  outline: none;
  background-color: #efefef;
  background-image: -webkit-repeating-linear-gradient(
    90deg, hsla(0,0%,100%,0) 0px, hsla(0,0%,100%,0)   5px, hsla(0,0%,100%, .1) 7px
  ),
    -webkit-repeating-linear-gradient(
      90deg, hsla(0,0%,  0%,0) 0px, hsla(0,0%,  0%,0)   3px, hsla(0,0%,  0%,.03) 4px
    ),
    -webkit-repeating-linear-gradient(
      90deg, hsla(0,0%,100%,0) 0px, hsla(0,0%,100%,0) 1px, hsla(0,0%,100%,.15) 2px
    ),

    linear-gradient(90deg, hsl(0,0%,70%)  0%,
    hsl(0,0%,90%) 40%,
    hsl(0,0%,90%) 60%,
    hsl(0,0%,70%)100%);
}
</style>
