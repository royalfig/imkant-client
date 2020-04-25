<template>
  <button
    @click="onClick"
    class="whitespace-no-wrap transform ml-2 py-1 px-2 rounded-full font-heavy bg-blue-lightest text-white hover:bg-blue-light transition:colors duration-300 ease-in-out"
  >
    <slot />
  </button>
</template>

<script>
export default {
  props: {
    onClick: {
      type: Function
    }
  }
};
</script>

<style lang="scss" scoped></style>
