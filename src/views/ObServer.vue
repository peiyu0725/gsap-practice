<template>
  <div class="observer-page">
    <div
      v-for="(item, index) in titleList"
      :key="index"
      :class="`block-${index + 1}`"
      class="observer-page__block"
    >
      <div class="outer">
        <div class="inner">
          <div class="background">
            <div class="block-title"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { gsap } from "gsap";
import { TextPlugin } from "gsap/TextPlugin";
import { Observer } from "gsap/Observer";

export default {
  name: "ObServer",
  data() {
    return {
      blocks: null,
      outers: null,
      inners: null,
      wrap: null,
      titles: null,
      animating: false,
      currentIndex: -1,
      titleList: ["First", "Second", "Third"],
    };
  },
  methods: {
    gotoSection(index, direction) {
      index = this.wrap(index); // make sure it's valid
      if(isNaN(index)) return
      this.animating = true;
      let dFactor = direction === -1 ? -1 : 1,
        tl = gsap.timeline({
          defaults: { duration: 1.25, ease: "power1.inOut" },
          onComplete: () => (this.animating = false),
        });

      if (this.currentIndex >= 0) {
        // The first time this function runs, current is -1
        gsap.set(this.blocks[this.currentIndex], { zIndex: 0 });
        tl.to(this.images[this.currentIndex], {
          yPercent: -15 * dFactor,
        }).set(this.blocks[this.currentIndex], { autoAlpha: 0 });
      }

      gsap.set(this.blocks[index], { autoAlpha: 1, zIndex: 1 });
      tl.fromTo(
        [this.outers[index], this.inners[index]],
        {
          yPercent: (i) => (i ? -100 * dFactor : 100 * dFactor),
        },
        {
          yPercent: 0,
        },
        0
      )
        .fromTo(
          this.images[index],
          { yPercent: 15 * dFactor },
          { yPercent: 0 },
          0
        )
        .fromTo(
          this.titles[index],
          {
            autoAlpha: 0,
            duration: 1,
            text: {
              value: "",
            },
          },
          {
            autoAlpha: 1,
            duration: 1,
            text: {
              value: this.titleList[index],
            },
          },
          0.2
        );

      this.currentIndex = index;
    },
    init() {
      gsap.registerPlugin(Observer, TextPlugin);

      this.blocks = document.querySelectorAll(".observer-page__block");
      this.images = document.querySelectorAll(".background");
      this.titles = gsap.utils.toArray(".block-title");
      this.outers = gsap.utils.toArray(".outer");
      this.inners = gsap.utils.toArray(".inner");
      this.wrap = gsap.utils.wrap(0, this.blocks.length);

      gsap.set(this.outers, { yPercent: 100 });
      gsap.set(this.inners, { yPercent: -100 });

      Observer.create({
        type: "wheel,touch,pointer",
        wheelSpeed: -1,
        onDown: () =>
          !this.animating && this.gotoSection(this.currentIndex - 1, -1),
        onUp: () =>
          !this.animating && this.gotoSection(this.currentIndex + 1, 1),
        preventDefault: true,
      });
    },
  },
  mounted() {
    this.init();
    this.gotoSection(0, 1);
  },
};
</script>
<style lang="sass">
$bg-gradient: linear-gradient(180deg,rgba(0, 0, 0, 0.6) 0%,rgba(0, 0, 0, 0.3) 100%)
.observer-page
  &__block
    height: 100vh
    width: 100vw
    top: 0
    position: fixed
    visibility: hidden
    .outer, .inner
      width: 100%
      height: 100%
      overflow-y: hidden
    .background
      display: flex
      align-items: center
      justify-content: center
      position: absolute
      height: 100%
      width: 100%
      top: 0
      background-size: cover
      background-position: center
      .block-title
        font-family: "Cormorant Garamond", serif
        text-transform: uppercase
        font-size: 4rem
        letter-spacing: 3rem
        text-align: center
        text-indent: 3rem
        color: hsl(0, 0, 80%)
  .block-1 .background
    background-image: $bg-gradient, url(https://picsum.photos/id/600/1920/1080)
  .block-2 .background
    background-image: $bg-gradient, url(https://picsum.photos/id/625/1920/1080)
  .block-3 .background
    background-image: $bg-gradient, url(https://picsum.photos/id/650/1920/1080)
</style>