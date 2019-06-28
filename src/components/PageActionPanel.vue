<template>
  <div class="common-page__action-panel page-action-panel">
    <div class="page-action-panel__container container">
      <div class="page-action-panel__left-column" :class="extraLeftClass">
        <slot name="left"></slot>
      </div>
      <div class="page-action-panel__right-column" :class="extraRightClass">
        <slot name="right"></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    extraLeftClass: {
      type: String,
      default: ''
    },
    extraRightClass: {
      type: String,
      default: ''
    }
  }
};
</script>

<style lang="scss" scoped>
.page-action-panel {
  display: flex;
  align-items: center;
  min-height: 60px;
  margin-bottom: 40px;
  padding-top: 10px;
  padding-bottom: 10px;
  background-color: #ffffff;
  overflow: hidden;
  box-sizing: border-box;
}

.page-action-panel__container {
  flex-grow: 1;

  @media (min-width: 568px) {
    display: flex;
    justify-content: space-between;
  }
}

.page-action-panel__left-column {
  max-width: 100%;
  margin-bottom: 32px;

  @media (min-width: 568px) {
    margin-right: 24px;
    margin-bottom: 0;
  }

  @media (max-width: 767px) {
    &:empty {
      display: none;
    }
  }

  @media (min-width: 768px) {
    flex-shrink: 0;
    width: 264px;
    margin-right: 32px;
  }
}

.page-action-panel__right-column {
  flex-grow: 1;
  overflow: auto;

  &:empty {
    display: none;
  }
}

.page-action-panel__nav-wrapper {
  display: flex;
  align-items: center;

  @media (min-width: 568px) {
    margin-top: -10px;
    margin-bottom: -10px;
  }
}
</style>
