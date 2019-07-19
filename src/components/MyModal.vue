<template>
  <transition name="modal-fade">
    <div class="modal-backdrop">
      <div class="modal" role="dialog" aria-labelledby="modalTitle">
        <button
          class="modal__close"
          type="button"
          aria-label="Закрыть модальное окно"
          @click="close"
        >✖</button>
        <header class="modal__header" id="modalTitle">
          <slot name="header"></slot>
        </header>
        <section class="modal__body">
          <slot></slot>
        </section>
        <footer class="modal__footer">
          <slot name="footer"></slot>
        </footer>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'my-modal',
  methods: {
    close() {
      this.$emit('close');
    }
  }
};
</script>

<style lang="scss" scoped>
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(#000000, 0.8);
}

.modal {
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 20px;
  overflow-x: hidden;
  background-color: #ffffff;
  border-radius: 4px;
  box-sizing: border-box;
  will-change: tranform, opacity;

  .modal-fade-enter & {
    opacity: 0;
    transform: scale3d(0.6, 0.6, 0.6);
  }

  .modal-fade-leave-to & {
    opacity: 0;
    transform: scale3d(1.4, 1.4, 1.4);
  }

  .modal-fade-enter-active &,
  .modal-fade-leave-active & {
    transition: 0.5s cubic-bezier(0.25, 1.01, 0.52, 1.11);
  }

  @media (min-width: 667px) {
    min-width: 400px;
    max-width: 540px;
  }

  @media (min-width: 1024px) {
    padding: 40px;
  }
}

.modal__header {
  margin: 0;
  margin-bottom: 32px;
  font-weight: 600;
  font-size: 24px;
  line-height: 1.15;
  text-align: center;
  text-transform: none;
  letter-spacing: normal;

  &:empty {
    display: none;
  }

  @media (min-width: 768px) {
    font-size: 28px;
  }
}

.modal__body {
  position: relative;

  &:empty {
    display: none;
  }
}

.modal__footer {
  display: flex;
  justify-content: flex-end;

  &:empty {
    display: none;
  }
}

.modal__close {
  position: absolute;
  top: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  padding: 0;
  font-weight: 400;
  font-size: 16px;
  line-height: 32px;
  font-family: inherit;
  color: #000000;
  background-color: transparent;
  border: none;
  opacity: 0.8;
  transition: 0.2s;
  cursor: pointer;
  user-select: none;
  outline: none;

  &:hover,
  &:focus {
    opacity: 1;
  }

  &:active {
    opacity: 0.7;
  }

  @media (min-width: 768px) {
    width: 40px;
    height: 40px;
    font-size: 16px;
    line-height: 40px;
  }
}

.modal-fade-enter {
  opacity: 0;
}

.modal-fade-leave-to {
  opacity: 0;
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: 0.5s;
  pointer-events: none;
}
</style>
