<template>
  <div class="home">
    <div class="flex flex-center"
      style="min-height: 100vh; min-width: 100vw; padding-bottom: 5rem; background: #aaa;"
    >
      <div class="row q-col-gutter-md" style="max-width: 90rem;">
        <div class="col-12 col-md-4">
          <q-card square>
            <q-card-section class="row">
              <div class="col-12 col-md-6 text-subtitle2">
                Go online
              </div>
              <div class="col-12 col-md-6">
                A small window into the king of 90's
              </div>
            </q-card-section>
            <q-card-section>
              <q-responsive :ratio="1">
                <div
                  class="bg flex flex-center"
                  :style="{ backgroundImage: `url(${bg90Img})` }"
                >
                  <div class="icon-border shadow-2"
                    @click="$router.push('/90')"
                  >
                    <div class="bg-indigo-6 inset-shadow icon-box q-pa-xs">
                      <q-icon size="xl" name="mdi-phone" color="white" />
                    </div>
                  </div>
                </div>
              </q-responsive>
            </q-card-section>
          </q-card>
        </div>
        <div class="col-12 col-md-4">
          <q-card square>
            <q-card-section class="row">
              <div class="col-12 col-md-6 text-subtitle2">
                i
              </div>
              <div class="col-12 col-md-6">
                The clean, bright, glisteningly 2000s.
              </div>
            </q-card-section>
            <q-card-section>
              <q-responsive :ratio="1">
                <div
                  class="bg metal flex flex-center"
                >
                  <q-btn
                    color="grey-3" glossy
                    text-color="grey-10"
                    size="xl"
                    icon="mdi-fruit-pineapple"
                    @click="$router.push('/2000')"
                  />
                </div>
              </q-responsive>
            </q-card-section>
          </q-card>
        </div>
        <div class="col-12 col-md-4">
          <q-card square>
            <q-card-section class="row">
              <div class="col-12 col-md-6 text-subtitle2">
                Royal
              </div>
              <div class="col-12 col-md-6">
                Become the wings of rebellion
              </div>
            </q-card-section>
            <q-card-section>
              <q-responsive :ratio="1">
                <div
                  class="flex flex-center"
                  style="position: relative;"
                >
                  <div class="center-bg" />
                  <div class="right-bg" />
                  <div class="menu-list"
                    @click="$router.push('/royal')"
                  >
                    enter
                  </div>
                </div>
              </q-responsive>
            </q-card-section>
          </q-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import bg90Img from '@/assets/90texture.jpg';

const intro = 'The internet has breeded some meteoric rising stars and catastrophic fall to irrelevance. The spirit of those wild fabs are hard to capture. Their designs, though, are translatable and maybe worth perserving, for the diversities sake. Thanks to the openess of the self proclaim frontpage of the internet, this project aims to show what if the internet went a different direction...';

export default {
  name: 'Home',
  data: () => ({
    intro,
    bg90Img,
  }),
};
</script>

<style lang="scss" scoped>
.bg {
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-size: cover;
}
.icon-box {
  width: 60px;
  height: 60px;
  margin: 0 auto;
  padding-top: 6px;
  cursor: pointer;
}
.icon-border {
  display: inline-block;
  padding: 7px;
}
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
}
.menu-list {
  cursor: pointer;
  display: block;
  position: relative;
  z-index: 1;
  clear: right;
  text-align: right;
  margin: 0 1rem 1.5rem;
  padding: 0.3em 0.75em 0.3em 0.75em;
  background: rgba(0,0,0,0.75);
  text-align: right;
  font-size: 1.4rem;
  line-height: 1.2em;
  font-weight: bold;
  color: #fff;
  transition: width 0.5s, height 0.5s, font-size 0.3s;
  &:hover {
    background: #fff;
    color: black;
    box-shadow: -3px 4px 8px blue,
                  4px 3px 8px blue,
                  4px -3px 8px red,
                  -3px -4px 8px red;
  }
}
</style>
