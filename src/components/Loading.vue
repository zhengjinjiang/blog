<template>
  <div class="retinaSpinner loading rotating">
    <div style="position: absolute; top: -2px;">
      <div
        style="-webkit-transform: rotate(0deg) translate(6px, 0px); transform: rotate(0deg) translate(6px, 0px);"
        class="spinner_circle part1"
      ></div>
    </div>
    <div style="position: absolute; top: -2px;">
      <div
        style="-webkit-transform: rotate(45deg) translate(6px, 0px); transform: rotate(45deg) translate(6px, 0px);"
        class="spinner_circle part2"
      ></div>
    </div>
    <div style="position: absolute; top: -2px;">
      <div
        style="-webkit-transform: rotate(90deg) translate(6px, 0px); transform: rotate(90deg) translate(6px, 0px);"
        class="spinner_circle part3"
      ></div>
    </div>
    <div style="position: absolute; top: -2px;">
      <div
        style="-webkit-transform: rotate(135deg) translate(6px, 0px); transform: rotate(135deg) translate(6px, 0px);"
        class="spinner_circle part4"
      ></div>
    </div>
    <div style="position: absolute; top: -2px;">
      <div
        style="-webkit-transform: rotate(180deg) translate(6px, 0px); transform: rotate(180deg) translate(6px, 0px);"
        class="spinner_circle part5"
      ></div>
    </div>
    <div style="position: absolute; top: -2px;">
      <div
        style="-webkit-transform: rotate(225deg) translate(6px, 0px); transform: rotate(225deg) translate(6px, 0px);"
        class="spinner_circle part6"
      ></div>
    </div>
    <div style="position: absolute; top: -2px;">
      <div
        style="-webkit-transform: rotate(270deg) translate(6px, 0px); transform: rotate(270deg) translate(6px, 0px);"
        class="spinner_circle part7"
      ></div>
    </div>
    <div style="position: absolute; top: -2px;">
      <div
        style="-webkit-transform: rotate(315deg) translate(6px, 0px); transform: rotate(315deg) translate(6px, 0px);"
        class="spinner_circle part8"
      ></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Loading',
};
</script>

<style lang="less">
.retinaSpinner {
  z-index: 2000000000;
  position: relative;
  height: 20px;
  width: 20px;
  animation: rotation 10s infinite linear;
}
</style>
