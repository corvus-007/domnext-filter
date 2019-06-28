<template>
  <label class="field">
    <span class="field__label">
      <slot></slot>
    </span>
    <div class="field__control">
      <div class="field__prefix">
        <slot name="prefixInput"></slot>
      </div>
      <input
        class="field__input input"
        :type="type"
        :value="value"
        :placeholder="placeholder"
        @input="inputHandler"
        v-mask="mask"
      >
    </div>
  </label>
</template>

<script>
export default {
  props: {
    placeholder: {
      type: String,
      default: 'placeholder_def'
    },
    type: {
      type: String,
      default: 'text'
    },
    value: {
      type: String
    },
    mask: {
      type: String,
      default: ''
    }
  },
  data() {
    return {};
  },
  methods: {
    inputHandler($event) {
      this.$emit('input', $event.target.value);
    }
  }
};
</script>

<style lang="scss" scoped>
.field__control {
  display: flex;
  align-items: center;
}

.field__prefix {
  margin-right: 8px;
  font-size: 12px;
  font-weight: 700;
  color: #757575;

  &:empty {
    display: none;
  }
}
</style>
