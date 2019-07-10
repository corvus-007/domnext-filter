<template>
  <!-- .checkboxes-select--open -->
  <div
    class="checkboxes-select"
    :class="{'checkboxes-select--open': isSelectOpen}"
    data-target="checkboxes-select"
    v-click-outside="close"
    :data-placeholder="selectParams.placeholder"
  >
    <button class="checkboxes-select__toggle" type="button" @click.prevent="onclickToggleHandler">
      <span class="checkboxes-select__values">
        <span v-for="(checkedValue, index) in checkedValues" :key="index">{{checkedValue}}</span>
      </span>
    </button>
    <div class="checkboxes-select__dropdown">
      <ul class="checkboxes-select__list">
        <li
          v-for="option in selectParams.options"
          :key="option.value"
          class="checkboxes-select__list-item"
        >
          <label class="checkboxes-select__box">
            <input
              class="checkboxes-select__box-input visually-hidden"
              type="checkbox"
              v-model="optionsArr"
              :value="option"
              @change="onchangeDropdownHandler(option)"
            >
            <span class="checkboxes-select__box-indicator"></span>
            <span class="checkboxes-select__box-value">{{option.name}}</span>
          </label>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import ClickOutside from 'vue-click-outside';

export default {
  props: {
    selectParams: {
      type: Object,
      required: true
    },
    value: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      isSelectOpen: false,
      optionsArr: this.value
    };
  },
  computed: {
    checkedValues() {
      let result = this.selectParams.initValue;

      if (this.optionsArr.length > 0) {
        if (!this.isCheckedAllOption) {
          result = this.optionsArr.map(option => option.name);
        }
      }

      return result;
    },
    isCheckAll() {
      const currentOptionsWithoutAllOption = this.optionsArr.filter(option => {
        return option.value !== 'all';
      });

      const initOptionsWithoutAllOption = this.selectParams.options.filter(
        option => {
          return option.value !== 'all';
        }
      );

      return (
        currentOptionsWithoutAllOption.length ===
        initOptionsWithoutAllOption.length
      );
    },
    isCheckedAllOption() {
      return this.optionsArr.some(option => {
        return option.value === 'all';
      });
    }
  },
  methods: {
    close() {
      this.isSelectOpen = false;
    },
    onclickToggleHandler(evt) {
      this.isSelectOpen = !this.isSelectOpen;
    },
    onchangeDropdownHandler(option) {
      const value = option.value;

      if (value === 'all') {
        if (this.isCheckedAllOption) {
          this.checkAll();
        } else {
          this.uncheckAll();
        }
      } else {
        if (this.isCheckAll) {
          this.checkAll();
        } else {
          this.uncheckAllOption();
        }
      }

      this.$emit('input', this.optionsArr);
    },
    checkAll() {
      this.optionsArr = this.selectParams.options.slice();
    },
    uncheckAll() {
      this.optionsArr = [];
    },
    uncheckAllOption() {
      this.optionsArr = this.optionsArr.filter(option => {
        return option.value !== 'all';
      });
    }
  },
  directives: {
    ClickOutside
  }
};
</script>

<style lang="scss" scoped>
.checkboxes-select {
}

.checkboxes-select__toggle {
  position: relative;
  width: 100%;
  max-height: 150px;
  padding: 14px calc(24px - 4px * 2);
  padding-right: 24px;
  font: inherit;
  font-weight: 700;
  font-size: 12px;
  line-height: 24px;
  text-transform: uppercase;
  text-align: left;
  resize: vertical;
  background-color: #ffffff;
  border: 4px solid #f2f2f2;
  border-radius: 100px;
  outline: none;
  box-shadow: none;
  box-sizing: border-box;
  transition: 0.25s;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    right: 16px;
    z-index: 2;
    width: 4px;
    height: 4px;
    margin: auto;
    transform: rotate(45deg);
    border: 2px solid #003d58;
    border-top: none;
    border-left: none;
    transition: 0.25s;
    pointer-events: none;
  }

  &:hover,
  &:focus {
    border-color: #e0e0e0;
  }

  &:focus {
    &::before {
      border-right-color: darken(#bebebe, 10%);
      border-bottom-color: darken(#bebebe, 10%);
    }
  }
}

.checkboxes-select__values {
  display: block;
  display: flex;
  line-height: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  span {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    &:not(:first-child)::before {
      content: ',\00a0';
    }

    &:last-child {
      margin-right: 0;
    }
  }
}

.checkboxes-select__dropdown {
  position: absolute;
  left: 0;
  right: 0;
  z-index: 10;
  transform: translateY(5px);
  opacity: 0;
  background-color: #ffffff;
  border: 1px solid #bebebe;
  border-radius: 4px;
  box-shadow: 0 16px 16px rgba(0, 0, 0, 0.04);
  pointer-events: none;
  overflow: hidden;
  transition: 0.25s;

  .checkboxes-select--open & {
    transition-duration: 0.25s;
    opacity: 1;
    transform: translateY(0);
    pointer-events: auto;
  }
}

.checkboxes-select__list {
  margin: 0;
  padding: 0;
  list-style: none;
  max-height: calc(6 * 40px);
  overflow: hidden;
  overflow-y: scroll;
  overscroll-behavior-y: contain;
}

.checkboxes-select__list-item {
}

.checkboxes-select__box {
  display: flex;
  align-items: center;
  min-height: 40px;
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 16px;
  padding-right: 4px;
  cursor: pointer;
  user-select: none;
  transition: background-color 0.1s;
  box-sizing: border-box;

  &:hover,
  &:focus {
    background-color: #f5f5f5;
  }
}

.checkboxes-select__box-input {
}

.checkboxes-select__box-indicator {
  position: relative;
  flex-shrink: 0;
  width: 16px;
  height: 16px;
  margin-right: 16px;
  border: 1px solid #bebebe;
  border-radius: 4px;
  transition: 0.25s;

  &::before {
    content: '';
    position: absolute;
    top: 3px;
    left: 4px;
    width: 8px;
    height: 4px;
    border-left: 2px solid #ffffff;
    border-bottom: 2px solid #ffffff;
    opacity: 0;
    transform: rotate(-45deg);
  }

  input:focus ~ & {
    background-color: #f5f5f5;
  }

  input:checked ~ & {
    background-color: #003d58;
    border-color: #003d58;

    &::before {
      opacity: 1;
    }
  }
}

.checkboxes-select__box-value {
  line-height: 1.25;
  font-size: 14px;

  span {
    display: block;
    font-size: 12px;
    color: #7a7a7a;
  }
}
</style>
