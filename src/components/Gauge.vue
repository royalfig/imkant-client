<template>
  <div
    class="gauge flex flex-col flex-grow text-white rounded-lg shadow p-6 mr-4 border border-white"
  >
    <div class="font-thin uppercase leading-tight mb-3">
      <slot name="title"></slot>
    </div>
    <div class="font-bold text-3xl leading-tight mb-3">
      <slot name="data-1"></slot>
    </div>
    <div class="text-lg mb-3">
      <slot name="data-2"></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    dataArray: []
  }
};
</script>

<style lang="scss" scoped>
.gauge {
  background-color: rgba(17, 48, 69, 0.85);
}
</style>
