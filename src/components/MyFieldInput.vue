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
@import 'src/assets/scss/variables';

.field {
  display: block;
}

.field__label {
  margin-bottom: 6px;
  margin-right: auto;
  font-weight: 600;
  font-size: 16px;

  .field--required &::after {
    content: '*';
    font-size: 14px;
    vertical-align: super;
    color: $danger-color;
  }
}

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

.field__input {
  .field--error & {
    border-color: #fd0d4d;
  }
}

.field__text {
  display: block;
  margin-top: 5px;
  font-size: 14px;
  line-height: 1.25;
  color: $muted-color;

  .checkbox &,
  .radiobox & {
    margin-top: 0;
  }
}
</style>
