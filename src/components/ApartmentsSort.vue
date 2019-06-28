<template>
  <div class="nav-sort">
    <div class="nav-sort__select-box">
      <select class="nav-sort__select" name="sort-by" @change="changeSortSelectHandler">
        <option value selected>По умолчанию</option>
        <option value="rooms">Кол-во комнат</option>
        <option value="floor">Этаж</option>
        <option value="area">Площадь</option>
        <!-- <option value="price">Стоимость</option> -->
      </select>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  methods: {
    changeSortSelectHandler() {
      this.$emit('input', event.target.value);
    }
  }
};
</script>

<style lang="scss" scoped>
.nav-sort {
}

.nav-sort__select-box {
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 0px;
    bottom: 0;
    right: 8px;
    z-index: 2;
    width: 4px;
    height: 4px;
    margin: auto;
    transform: rotate(45deg);
    border: 2px solid #bebebe;
    border-top: none;
    border-left: none;
    transition: 0.25s;
    pointer-events: none;
  }

  &:focus-within {
    &::before {
      border-right-color: darken(#bebebe, 15%);
      border-bottom-color: darken(#bebebe, 15%);
    }
  }
}

.nav-sort__select {
  display: block;
  appearance: none;
  padding: 0;
  padding-right: 24px;
  font-size: 14px;
  font-family: inherit;
  background-color: transparent;
  border: none;
  outline: none;
  cursor: pointer;
  box-sizing: border-box;
}
</style>
