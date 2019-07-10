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
        class="field__input"
        :type="type"
        :value="value"
        :placeholder="placeholder"
        @input="inputHandler"
        v-mask="mask"
        :autofocus="autofocus"
      />
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
    },
    autofocus: {
      type: Boolean,
      default: false
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
  width: 100%;
  max-height: 150px;
  padding: 14px calc(24px - 4px);
  font: inherit;
  font-weight: 700;
  font-size: 12px;
  line-height: 24px;
  text-transform: uppercase;
  resize: vertical;
  background-color: #ffffff;
  border: 4px solid $gray-242;
  border-radius: 100px;
  outline: none;
  box-shadow: none;
  box-sizing: border-box;
  transition: $duration * 2;

  &:hover,
  &:focus {
    border-color: #e0e0e0;
  }

  &::placeholder {
    color: $base-color;
    opacity: 0.5;
  }

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    /* display: none; <- Crashes Chrome on hover */
    -webkit-appearance: none;
    margin: 0; /* <-- Apparently some margin are still there even though it's hidden */
  }

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
