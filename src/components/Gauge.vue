<template>
  <div
    class="gauge flex flex-col flex-grow text-white rounded-lg shadow p-6 mr-4 border border-white"
  >
    <p class="font-thin uppercase leading-tight">
      <slot name="title"></slot>
    </p>
    <p class="font-bold text-3xl leading-tight">
      <slot name="data-1"></slot>
    </p>
    <p class="text-lg">
      <slot name="data-2"></slot>
    </p>
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
