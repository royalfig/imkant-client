<template>
  <div
    class="bg-blue-dark flex flex-col flex-grow text-white rounded-lg shadow p-6 mr-4 border border-white"
  >
    <div class="font-heavy uppercase text-blue-lightest leading-tight mb-3">
      <slot name="title"></slot>
    </div>
    <div class="font-bold text-3xl mb-3">
      <slot name="data-1"></slot>
    </div>
    <div class="mb-3">
      <slot name="data-2"></slot>
    </div>
    <div class>
      <slot name="footer"></slot>
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
