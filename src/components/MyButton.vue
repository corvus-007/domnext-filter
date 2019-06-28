<template>
  <button class="my-button">
    <span class="my-button__text">
      <slot>Отправить</slot>
    </span>
  </button>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
@import 'src/assets/scss/variables';

.my-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 180px;
  padding: 12px 20px;
  font-weight: 700;
  font-size: 12px;
  line-height: 16px;
  font-family: inherit;
  text-align: center;
  text-decoration: none;
  text-transform: uppercase;
  color: #ffffff;
  background-color: $accent-color;
  border: 4px solid transparent;
  letter-spacing: 0.05em;
  box-sizing: border-box;
  box-shadow: 0 18px 25px rgba($accent-color, 0.4);
  border-radius: 100px;
  appearance: none;
  border-radius: 100px;
  outline: none;
  user-select: none;
  transition: $duration * 2;
  cursor: pointer;

  &:hover,
  &:focus {
    color: #ffffff;
    background-color: darken($accent-color, 4%);
    box-shadow: 0 12px 25px rgba($accent-color, 0.4);
  }

  &:active {
    color: #ffffff;
    box-shadow: 0 5px 20px rgba($accent-color, 0.4);
    opacity: 0.8;
  }

  &[disabled] {
    cursor: not-allowed;
    filter: grayscale(1);
    opacity: 0.6;

    &:hover,
    &:focus,
    &:active {
      color: #ffffff;
      background-color: $accent-color;
      box-shadow: 0 18px 25px rgba($accent-color, 0.4);
    }
  }
}

.my-button__text {
}
</style>
