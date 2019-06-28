<template>
  <svg
    :width="width"
    :height="height"
    :viewBox="`0 0 ${viewBoxSize} ${viewBoxSize}`"
    role="presentation"
  >
    <slot></slot>
  </svg>
</template>

<script>
export default {
  props: {
    iconName: {
      type: String,
      default: 'box'
    },
    width: {
      type: [Number, String],
      default: 16
    },
    height: {
      type: [Number, String],
      default: 16
    },
    viewBoxSize: {
      type: [Number, String],
      default: 16
    },
    iconColor: {
      type: String,
      default: 'currentColor'
    }
  }
};
</script>

<style scoped>
svg {
  display: block;
  fill: currentColor;
}
</style>
