<template>
  <div class="scroll-trigger">
    <div class="item scroll-trigger__left left-1 z-20"></div>
    <div class="item scroll-trigger__right right-1 z-20"></div>
    <div class="item scroll-trigger__left left-2 z-10"></div>
    <div class="item scroll-trigger__right right-2 z-10"></div>
    <div class="item scroll-trigger__left left-3 z-0"></div>
    <div class="item scroll-trigger__right right-3 z-0"></div>
  </div>
</template>

<script>
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default {
  name: "ScrollTrigger",
  methods: {
    init() {
      gsap.registerPlugin(ScrollTrigger);

      const srollTL = gsap.timeline({
        scrollTrigger: {
          trigger: ".scroll-trigger",
          pin: true,
          scrub: true,
        },
      });

      srollTL.to(".left-1", { yPercent: "-100" });
      srollTL.to(".right-1", { yPercent: "100" }, "<");
      srollTL.to(".left-2", { yPercent: "-100" });
      srollTL.to(".right-2", { yPercent: "100" }, "<");
    }
  },
  mounted() {
    this.init();
  },
};
</script>

<style lang="sass" scoped>
.scroll-trigger
  display: flex
  position: relative
  width: 100%
  height: 100vh
  overflow: hidden
  &__left, &__right
    position: absolute
    display: flex
    align-items: center
    justify-content: center
    width: 50%
    height: 100%
    color: #fff
    font-size: 2rem
    font-weight: 600
    background-size: cover
    background-position: center
  &__left
    left: 0
  &__right
    right: 0
  .left
    &-1
      background-image: url(https://picsum.photos/id/230/540/1080)
    &-2
      background-image: url(https://picsum.photos/id/240/540/1080)
    &-3
      background-image: url(https://picsum.photos/id/250/540/1080)
  .right
    &-1
      background-image: url(https://picsum.photos/id/260/540/1080)
    &-2
      background-image: url(https://picsum.photos/id/270/540/1080)
    &-3
      background-image: url(https://picsum.photos/id/280/540/1080)
  .z-0
    z-index: 0
  .z-10
    z-index: 10
  .z-20
    z-index: 20
</style>