<template>
  <main class="main">
    <article class="common-page">
      <header class="common-page__header container">
        <h1 class="common-page__title common-title">Выбрать квартиру по характеристикам</h1>
      </header>

      <PageActionPanel>
        <template v-slot:left>
          <div class="breadcrumbs">
            <ul class="breadcrumbs__list">
              <li class="breadcrumbs__item">
                <a class="breadcrumbs__link" href="/">
                  <icon-base class="breadcrumbs__link-icon" viewBoxSize="307">
                    <icon-home />
                  </icon-base>
                  <span class="breadcrumbs__link-text visually-hidden">Главная</span>
                </a>
              </li>
            </ul>
          </div>
        </template>
        <template v-slot:right>
          <div class="flats-result-dashboard">
            <div class="flats-result-dashboard__view view-mode">
              <div class="view-mode-buttons">
                <input
                  type="radio"
                  name="view"
                  id="field-view-card"
                  v-model="viewCardsValue"
                  value="card"
                />
                <label for="field-view-card" aria-label="Показать в виде карточек">
                  <icon-base class="view-mode-buttons__icon" viewBoxSize="35">
                    <icon-view-grid />
                  </icon-base>
                </label>
                <input
                  type="radio"
                  name="view"
                  id="field-view-list"
                  v-model="viewCardsValue"
                  value="list"
                />
                <label for="field-view-list" aria-label="Показать в виде списка">
                  <icon-base class="view-mode-buttons__icon" viewBoxSize="35">
                    <icon-view-list />
                  </icon-base>
                </label>
              </div>
            </div>

            <ApartmentsSort
              class="flats-result-dashboard__sort"
              :value="sortByValue"
              @input="chooseSortByValue"
            ></ApartmentsSort>
          </div>
        </template>
      </PageActionPanel>

      <div class="common-page__body common-page__body--has-sidebar container picking">
        <div class="common-page__sidebar">
          <div class="flat-filters">
            <form class="flat-filters__form" action method="get">
              <div class="flat-filters__item flat-filter">
                <div class="flat-filter__label">Тип дома</div>
                <div class="flat-filter__control">
                  <MyCheckboxesSelect
                    :selectParams="selectHousesType"
                    :value="checkedHousesTypeIds.data"
                    @input="oninputHousesTypeIds"
                  ></MyCheckboxesSelect>
                </div>
              </div>
              <div class="flat-filters__item flat-filter">
                <div class="flat-filter__label">Этаж</div>
                <div class="flat-filter__control">
                  <MyCheckboxesSelect
                    :selectParams="selectFloors"
                    v-model="checkedFloors.data"
                    @input="oninputFloors"
                  ></MyCheckboxesSelect>
                </div>
              </div>
              <div class="flat-filters__item flat-filter">
                <div class="flat-filter__label">Количество комнат</div>
                <div class="flat-filter__control">
                  <MyCheckboxesSelect
                    :selectParams="selectRooms"
                    v-model="checkedRooms.data"
                    @input="oninputRooms"
                  ></MyCheckboxesSelect>
                </div>
              </div>
              <div class="flat-filters__item flat-filter">
                <div class="flat-filter__label">Площадь, м²</div>
                <div class="flat-filter__control flat-filter__control--range filter-range">
                  <vue-slider
                    class="filter-range-slider"
                    :min="29"
                    :max="125"
                    :value="checkedAreaRange"
                    :minRange="10"
                    :tooltip="'none'"
                    :process-style="{ backgroundColor: '#003d58' }"
                    @change="onchangeAreaRangeHandler"
                    @drag-end="changeFilterForm"
                  ></vue-slider>

                  <div class="filter-range-values">
                    <div class="filter-range-values__from">
                      от
                      <span>{{ checkedAreaRange[0] }}</span>
                    </div>
                    <div class="filter-range-values__to">
                      до
                      <span>{{ checkedAreaRange[1] }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>

        <div class="common-page__content">
          <div class="flats-result" :class="{ 'flats-result--loading': isLoading }">
            <!--
              flats-cards--display-card
              flats-cards--display-list
            -->
            <ul
              class="flats-result__list flats-cards"
              :class="[
                isViewCardsValue
                  ? 'flats-cards--display-card'
                  : 'flats-cards--display-list'
              ]"
              v-if="hasAnyApartments"
            >
              <li
                is="flat-card"
                v-for="oneApartment in sortedApartments"
                :apartment="oneApartment"
                :key="oneApartment.id"
                @show-floor-plan="showFloorPlan"
              ></li>
            </ul>
            <div class="flats-result__list" v-else-if="!hasAnyApartments && isLoading">
              <h2>Извините, ничего не найдено :(</h2>
            </div>
          </div>
        </div>
      </div>
    </article>

    <div class="pswp" ref="pswp" tabindex="-1" role="dialog" aria-hidden="true">
      <div class="pswp__bg"></div>

      <div class="pswp__scroll-wrap">
        <div class="pswp__container">
          <div class="pswp__item"></div>
          <div class="pswp__item"></div>
          <div class="pswp__item"></div>
        </div>

        <div class="pswp__ui pswp__ui--hidden">
          <div class="pswp__top-bar">
            <div class="pswp__counter"></div>

            <button class="pswp__button pswp__button--close" title="Закрыть (Esc)"></button>

            <div class="pswp__preloader">
              <div class="pswp__preloader__icn">
                <div class="pswp__preloader__cut">
                  <div class="pswp__preloader__donut"></div>
                </div>
              </div>
            </div>
          </div>

          <button class="pswp__button pswp__button--arrow--left" title="Previous (arrow left)"></button>

          <button class="pswp__button pswp__button--arrow--right" title="Next (arrow right)"></button>

          <div class="pswp__caption">
            <div class="pswp__caption__center"></div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import Axios from 'axios';
import VueSlider from 'vue-slider-component';
import PhotoSwipe from 'photoswipe';
import PhotoSwipeUI_Default from 'photoswipe/dist/photoswipe-ui-default.js';

import FlatCard from '@/components/FlatCard.vue';
import PageActionPanel from '@/components/PageActionPanel.vue';
import ApartmentsSort from '@/components/ApartmentsSort.vue';
import MyCheckboxesSelect from '@/components/MyCheckboxesSelect.vue';
import IconBase from '@/components/IconBase.vue';
import IconHome from '@/components/icons/IconHome.vue';
import IconViewGrid from '@/components/icons/IconViewGrid.vue';
import IconViewList from '@/components/icons/IconViewList.vue';

import 'photoswipe/dist/photoswipe.css';
import 'photoswipe/dist/default-skin/default-skin.css';
import 'vue-slider-component/theme/default.css';
import { async } from 'q';

export default {
  name: 'FilterPage',
  data() {
    return {
      isLoading: false,
      viewCardsValue: 'card',
      selectHousesType: {
        placeholder: 'Выберите тип дома',
        initValue: ['Все типы домов'],
        name: 'houses_type_id[]',
        options: [
          {
            name: 'Все типы домов',
            value: 'all'
          },
          {
            name: 'Малая башня',
            value: 2
          },
          {
            name: 'Большая башня',
            value: 3
          }
        ]
      },
      selectFloors: {
        placeholder: 'Выберите этаж',
        initValue: ['Все этажи'],
        options: [
          {
            name: 'Все этажи',
            value: 'all'
          },
          {
            name: '3',
            value: 3
          },
          {
            name: '4',
            value: 4
          },
          {
            name: '5',
            value: 5
          },
          {
            name: '6',
            value: 6
          },
          {
            name: '7',
            value: 7
          },
          {
            name: '8',
            value: 8
          },
          {
            name: '9',
            value: 9
          },
          {
            name: '10',
            value: 10
          },
          {
            name: '11',
            value: 11
          },
          {
            name: '12',
            value: 12
          }
        ]
      },
      selectRooms: {
        placeholder: 'Выберите кол-во комнат',
        initValue: ['Все'],
        options: [
          {
            name: 'Все',
            value: 'all'
          },
          {
            name: 'Студия',
            value: 0
          },
          {
            name: 'Однокомнатная',
            value: 1
          },
          {
            name: 'Двухкомнатная',
            value: 2
          },
          {
            name: 'Трехкомнатная',
            value: 3
          },
          {
            name: 'Четырехкомнатная',
            value: 4
          }
        ]
      }
    };
  },
  computed: {
    sortByValue() {
      return this.$store.getters.sortByValue;
    },
    checkedHousesTypeIds() {
      return this.$store.getters.checkedHousesTypeIds;
    },
    checkedFloors() {
      return this.$store.getters.checkedFloors;
    },
    checkedRooms() {
      return this.$store.getters.checkedRooms;
    },
    checkedAreaRange() {
      return this.$store.getters.checkedAreaRange;
    },
    composeQueryParamsString() {
      const params = new URLSearchParams();

      // Типы домов
      if (
        this.checkedHousesTypeIds.data &&
        this.checkedHousesTypeIds.data.length
      ) {
        this.checkedHousesTypeIds.data.forEach(option => {
          params.append(this.checkedHousesTypeIds.name, option.value);
        });
      }

      // Этажи
      if (this.checkedFloors.data && this.checkedFloors.data.length) {
        this.checkedFloors.data.forEach(option => {
          params.append(this.checkedFloors.name, option.value);
        });
      }

      // Комнаты
      if (this.checkedRooms.data && this.checkedRooms.data.length) {
        this.checkedRooms.data.forEach(option => {
          params.append(this.checkedRooms.name, option.value);
        });
      }

      // Диапазон площади
      if (this.checkedAreaRange && this.checkedAreaRange.length) {
        params.append('area_from', this.checkedAreaRange[0]);
        params.append('area_to', this.checkedAreaRange[1]);
      }

      return params.toString();
    },
    hasAnyApartments() {
      return this.$store.getters.sortedApartments.length;
    },
    sortedApartments() {
      return this.$store.getters.sortedApartments;
    },
    isViewCardsValue() {
      switch (this.viewCardsValue) {
        case 'card':
          return true;
          break;
        case 'list':
        default:
          return false;
      }
    }
  },
  methods: {
    chooseSortByValue(event) {
      this.$store.commit('SORT_BY_VALUE', event);
    },
    changeFilterForm() {
      this.isLoading = true;

      this.$store
        .dispatch('GetApartmentsAPI', this.composeQueryParamsString)
        .then(response => {
          this.isLoading = false;
        });
    },
    oninputHousesTypeIds(data) {
      this.$store.commit('SET_CHECKED_HOUSES_TYPE_IDS', data);
      this.changeFilterForm();
    },
    oninputFloors(data) {
      this.$store.commit('SET_CHECKED_FLOORS', data);
      this.changeFilterForm();
    },
    oninputRooms(data) {
      this.$store.commit('SET_CHECKED_ROOMS', data);
      this.changeFilterForm();
    },
    onchangeAreaRangeHandler(rangeData) {
      this.$store.commit('SET_CHECKED_AREA_RANGE', rangeData);
    },
    showFloorPlan(event) {
      const url = event;

      if (!url && typeof url != 'string') {
        return;
      }

      const image = new Image();
      image.src = url;
      image.onload = () => {
        const item = {
          src: image.src,
          w: image.naturalWidth,
          h: image.naturalHeight
        };

        const items = [item];

        const options = {
          closeOnScroll: false,
          showHideOpacity: false,
          hideAnimationDuration: 0,
          showAnimationDuration: 0,
          bgOpacity: 0.8,
          history: false
        };

        var gallery = new PhotoSwipe(
          this.$refs.pswp,
          PhotoSwipeUI_Default,
          items,
          options
        );
        gallery.init();
      };
    }
  },
  watch: {
    viewCardsValue(value) {
      localStorage.setItem('currentFlatsView', value);
    }
  },
  created() {
    let currentFlatsView = localStorage.getItem('currentFlatsView');

    if (!currentFlatsView || currentFlatsView === 'list') {
      currentFlatsView = 'list';
    } else {
      currentFlatsView = 'card';
    }

    this.viewCardsValue = currentFlatsView;

    this.isLoading = true;

    this.$store
      .dispatch('GetApartmentsAPI', this.composeQueryParamsString)
      .then(response => {
        this.isLoading = false;
      });
  },
  components: {
    PageActionPanel,
    ApartmentsSort,
    MyCheckboxesSelect,
    FlatCard,
    VueSlider,
    IconBase,
    IconHome,
    IconViewGrid,
    IconViewList
  }
};
</script>

<style lang="scss" scoped>
.main {
  background-color: #f7f7f7;
}

.vue-slider-process {
  background-color: #003d58;
}
</style>
