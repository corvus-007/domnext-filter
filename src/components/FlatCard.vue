<template>
  <li class="flats-result__item flats-cards__item flat-card">
    <router-link class="flat-card__wraplink" :to="'apartment/' + apartment.id">
      <div class="flat-card__picture-holder">
        <div class="flat-card__picture">
          <img
            :src="apartment.main_layout"
            loading="lazy"
            :alt="apartment.title | renamePentahauseToStudia"
          >
        </div>
      </div>
      <div class="flat-card__content">
        <div class="flat-card__info-block">
          <span class="flat-card__type-of-building">
            <span class="flat-card__type-of-building-value">{{apartment.houseType}}</span>
          </span>
          <div class="flat-card__title">
            <span class="flat-card__rooms">{{apartment.rooms | renamePentahauseToStudia}}</span>
            <span class="flat-card__area">
              <span class="flat-card__area-value">{{apartment.area}}</span> м²
            </span>
          </div>
          <div class="flat-card__floor">
            <span class="flat-card__floor-value">{{apartment.floor}}</span> этаж
            <button
              class="flat-card__floor-to-look"
              type="button"
              v-if="isHasFloorPlan"
              @click.prevent="showAparmentonFloor(apartment.placingApartmentOnFloorPlanFile)"
            >Смотреть на плане</button>
          </div>
        </div>
        <!--         <div class="flat-card__price-block" style="display: none !important;">
          <b class="flat-card__price-for-flat">
            <span class="flat-card__price-for-flat-value">{{apartment.totalCost}}</span> руб.
          </b>
          <span class="flat-card__price-for-square-meter">
            или
            <span class="flat-card__price-for-square-meter-value">{{apartment.costMeter}}</span> за м²
          </span>
        </div>-->
      </div>
    </router-link>
    <div class="flat-card__stick">
      <span
        class="flat-card__reserved"
        v-if="apartment.status == 3"
        aria-label="Квартира забронирована"
        title="Квартира забронирована"
      >
        <icon-base class="flat-card__reserved-icon flat-card__icon" viewBoxSize="402">
          <icon-padlock/>
        </icon-base>Квартира забронирована
      </span>
    </div>
  </li>
</template>

<script>
import IconBase from './IconBase.vue';
import IconPadlock from './icons/IconPadlock.vue';

export default {
  props: {
    apartment: {
      type: Object,
      required: true
    }
  },
  computed: {
    isHasFloorPlan() {
      return this.apartment.placingApartmentOnFloorPlanFile ? true : false;
    }
  },
  methods: {
    showAparmentonFloor(url) {
      this.$emit('show-floor-plan', url);
    }
  },
  components: {
    IconBase,
    IconPadlock
  }
};
</script>

<style lang="scss" scoped>
@mixin make-fit-object($target-width: 1, $target-height: 1, $fit: cover) {
  position: relative;
  display: block;
  overflow: hidden;

  &::before {
    content: '';
    display: block;
    width: 100%;
    height: 0;
    padding-top: percentage($target-height / $target-width);
  }

  img {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    width: 100%;
    height: auto;
  }

  @supports (object-fit: $fit) {
    img {
      top: 0;
      left: 0;
      transform: none;
      height: 100%;
      object-fit: $fit;
    }
  }
}

.flat-card {
  position: relative;
  display: flex;
  flex-direction: column;
  user-select: none;

  &--is-favorite {
  }
}

.flat-card__wraplink {
  position: relative;
  flex-grow: 1;
  display: flex;
  padding: 32px;
  padding-top: 44px;
  color: #232323;
  text-decoration: none;
  background-color: #ffffff;
  border: 1px solid #efefef;
  border-radius: 4px;
  box-shadow: 0 4px 12px rgba(#000000, 0);
  transition: 0.3s box-shadow;

  &:hover,
  &:focus {
    color: #232323;
    border-color: darken(#efefef, 2%);
    box-shadow: 0 4px 12px rgba(#000000, 0.1);
  }

  .flats-cards--display-card & {
    display: flex;
    flex-direction: column;
  }

  .flats-cards--display-list & {
    align-items: center;
    padding: 16px;
    padding-top: 24px;
    padding-bottom: 12px;
  }
}

.flat-card__content {
  position: relative;
  z-index: 1;
  flex-grow: 1;

  .flats-cards--display-card & {
    display: flex;
    flex-direction: column;
  }

  @media (min-width: 568px) {
    .flats-cards--display-list & {
      display: flex;
      align-items: center;
    }
  }
}

.flat-card__info-block {
  @media (min-width: 568px) {
    .flats-cards--display-list & {
      flex-grow: 1;
      padding-bottom: 0;
      padding-right: 15px;
    }
  }
}

.flat-card__price-block {
  padding-top: 15px;
  border-top: 1px solid;
  border-color: #f2f2f2;
  transition: border-color 0.25s;

  .flat-card__wraplink:hover &,
  .flat-card__wraplink:focus & {
    border-color: #bebebe;
  }

  .flats-cards--display-card & {
    margin-top: auto;
  }

  @media (min-width: 568px) {
    .flats-cards--display-list & {
      min-width: 135px;
      padding-top: 0;
      padding-left: 15px;
      border-top: none;
      border-left-width: 1px;
      border-left-style: solid;
    }
  }

  @media (min-width: 1024px) {
    .flats-cards--display-list & {
      min-width: 154px;
    }
  }
}

.flat-card__picture-holder {
  flex-shrink: 0;
  margin-bottom: 20px;
  box-sizing: border-box;

  .flats-cards--display-list & {
    width: 72px;
    height: 72px;
    margin-right: 16px;
    margin-bottom: 0;
    padding: 8px;
  }

  @media (min-width: 1024px) {
    .flats-cards--display-list & {
      width: 100px;
      height: 100px;
      margin-right: 24px;
      padding: 16px;
    }
  }
}

.flat-card__picture {
  @include make-fit-object(1, 1, contain);
}

.flat-card__type-of-building {
  display: block;
  margin-bottom: 5px;
  font-size: 14px;
  color: #7a7a7a;
}

.flat-card__title {
  display: block;
  margin-bottom: 5px;
  font-weight: 700;
  font-size: 22px;
  line-height: 1.15;

  .flats-cards--display-card & {
    font-size: 16px;
  }

  .flats-cards--display-list & {
    font-size: 18px;
  }

  @media (min-width: 1024px) {
    .flats-cards--display-list & {
      font-size: 24px;
    }
  }
}

.flat-card__rooms {
  margin-right: 0.3em;
}

.flat-card__floor {
  display: block;
  font-size: 14px;
  color: #7a7a7a;
}

.flat-card__floor-to-look {
  position: relative;
  display: block;
  min-width: auto;
  margin: 0;
  margin-top: 4px;
  padding: 0;
  font-size: inherit;
  text-transform: none;
  color: inherit;
  background-color: transparent;
  border: none;
  cursor: pointer;
  box-shadow: none;
  outline: none;

  &::after {
    content: '';
    position: absolute;
    top: -10px;
    left: -10px;
    right: -10px;
    bottom: -10px;
  }

  &:hover,
  &:focus {
    color: #f14c85;
    background-color: transparent;
  }

  .flats-cards--display-card & {
  }

  .flats-cards--display-list & {
    display: inline-block;
    margin-left: 4px;
    vertical-align: baseline;
  }
}

.flat-card__price-for-flat {
  display: block;
  font-weight: 700;
  font-size: 22px;
  line-height: 1.15;

  .flats-cards--display-card & {
    font-size: 18px;
  }

  @media (min-width: 768px) {
    .flats-cards--display-list & {
      font-size: 18px;
    }
  }

  @media (min-width: 1024px) {
    .flats-cards--display-list & {
      font-size: 24px;
    }
  }
}

.flat-card__price-for-square-meter {
  display: block;
  font-size: 14px;
  color: #7a7a7a;
}

.flat-card__features {
  flex-grow: 1;
}

.flat-card__features-item {
  .flats-cards--display-list & {
    margin-right: 10%;

    &:last-child {
      margin-right: 0;
    }
  }
}

.flat-card__stick {
  position: absolute;
  top: 8px;
  left: 8px;
  z-index: 2;
  display: flex;
  pointer-events: none;

  .flats-cards--display-list & {
    top: 8px;
    left: 8px;
  }
}

.flat-card__icon {
  display: block;
  width: 14px;
  height: 14px;
  fill: currentColor;
}

.flat-card__reserved {
  display: flex;
  align-items: center;
  margin-right: 5px;
  padding: 4px;
  font-size: 12px;
  line-height: 1.1;
  white-space: nowrap;
  color: #252525;
  background-color: #fff59d;
}

.flat-card__reserved-icon {
  display: block;
  width: 12px;
  height: 12px;
  margin-right: 4px;
}
</style>
