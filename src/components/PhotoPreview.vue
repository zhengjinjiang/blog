<template>
  <!-- Root element of PhotoSwipe. Must have class pswp. -->
  <div class="pswp" tabindex="-1" role="dialog" aria-hidden="true">
    <!-- Background of PhotoSwipe. 
         It's a separate element as animating opacity is faster than rgba(). -->
    <div class="pswp__bg"></div>

    <!-- Slides wrapper with overflow:hidden. -->
    <div class="pswp__scroll-wrap">
      <!-- Container that holds slides. 
            PhotoSwipe keeps only 3 of them in the DOM to save memory.
            Don't modify these 3 pswp__item elements, data is added later on. -->
      <div class="pswp__container">
        <div class="pswp__item"></div>
        <div class="pswp__item"></div>
        <div class="pswp__item"></div>
      </div>

      <!-- Default (PhotoSwipeUI_Default) interface on top of sliding area. Can be changed. -->
      <div class="pswp__ui pswp__ui--hidden">
        <div class="pswp__top-bar">
          <!--  Controls are self-explanatory. Order can be changed. -->

          <div class="pswp__counter"></div>

          <button
            class="pswp__button pswp__button--close"
            title="Close (Esc)"
          ></button>

          <button
            class="pswp__button pswp__button--share"
            title="Share"
          ></button>

          <button
            class="pswp__button pswp__button--fs"
            title="Toggle fullscreen"
          ></button>

          <button
            class="pswp__button pswp__button--zoom"
            title="Zoom in/out"
          ></button>

          <!-- Preloader demo https://codepen.io/dimsemenov/pen/yyBWoR -->
          <!-- element will get class pswp__preloader--active when preloader is running -->
          <div class="pswp__preloader">
            <div class="pswp__preloader__icn">
              <div class="pswp__preloader__cut">
                <div class="pswp__preloader__donut"></div>
              </div>
            </div>
          </div>
        </div>

        <div
          class="pswp__share-modal pswp__share-modal--hidden pswp__single-tap"
        >
          <div class="pswp__share-tooltip"></div>
        </div>

        <button
          class="pswp__button pswp__button--arrow--left"
          title="Previous (arrow left)"
        ></button>

        <button
          class="pswp__button pswp__button--arrow--right"
          title="Next (arrow right)"
        ></button>

        <div class="pswp__caption">
          <div class="pswp__caption__center"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PhotoSwipe from 'photoswipe';
import PhotoSwipeUIDefault from 'photoswipe/dist/photoswipe-ui-default.js';
import 'photoswipe/dist/photoswipe.css';
import 'photoswipe/dist/default-skin/default-skin.css';

export default {
  name: 'PhotoPreview',
  props: {
    photos: {
      type: Array,
      required: true,
    },
    options: {
      type: Object,
      default: Object.create(null),
    },
  },
  methods: {
    open(index) {
      const pswp = new PhotoSwipe(this.$el, PhotoSwipeUIDefault, this.photos, {
        ...this.options,
        index: index || 0,
      });
      pswp.listen('gettingData', function(index, item) {
        if (item.w < 1 || item.h < 1) {
          var img = new Image();
          img.onload = () => {
            item.w = img.width;
            item.h = img.height;
            pswp.invalidateCurrItems();
            pswp.updateSize(true);
          };
          img.src = item.src;
        }
      });
      pswp.init();
      this.pswp = pswp;
    },
    close() {
      if (this.pswp) {
        this.pswp.close();
      }
    },
    beforeDestroy() {
      this.close();
    },
  },
};
</script>
